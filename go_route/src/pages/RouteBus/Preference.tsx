import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function Preference() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from") || "";
  const to = queryParams.get("to") || "";
  const date = queryParams.get("date") || "";

  const [selected, setSelected] = useState<"women" | "general" | null>(null);

  useEffect(() => {
    if (!from || !to || !date) {
      navigate("/route-bus");
    }
  }, [from, to, date, navigate]);

  const handleContinue = () => {
    if (!selected) return;
    const params = new URLSearchParams({
      from,
      to,
      date,
      preference: selected,
    }).toString();
    navigate(`/route-bus/type?${params}`);
  };

  return (
    <div className="go-container max-w-3xl mx-auto pt-10 pb-16 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Choose Your Preference</h1>
        <p className="text-muted-foreground">
          We prioritize your safety and comfort.
        </p>
      </div>

      {/* Safety Info */}
      <div className="bg-green-50 text-green-900 border border-green-200 p-4 rounded-md text-sm">
        <ShieldCheck className="inline-block mr-2 h-4 w-4" />
        Women's safety enabled buses will be listed first when available.
      </div>

      {/* Preference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          onClick={() => setSelected("women")}
          className={`cursor-pointer transition ${
            selected === "women" ? "border-blue-500 ring-2 ring-blue-400" : ""
          }`}
        >
          <CardContent className="p-6 flex flex-col items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-500" />
            <h3 className="text-lg font-semibold">Women's Safety Section</h3>
            <p className="text-sm text-muted-foreground text-center">
              View buses with dedicated women's sections
            </p>
          </CardContent>
        </Card>

        <Card
          onClick={() => setSelected("general")}
          className={`cursor-pointer transition ${
            selected === "general" ? "border-blue-500 ring-2 ring-blue-400" : ""
          }`}
        >
          <CardContent className="p-6 flex flex-col items-center gap-2">
            <Users className="h-8 w-8 text-gray-600" />
            <h3 className="text-lg font-semibold">General Seating</h3>
            <p className="text-sm text-muted-foreground text-center">
              View all available buses without gender filters
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Preference;
