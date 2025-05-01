
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, ChevronRight } from "lucide-react";

interface GenderPreferenceStepProps {
  genderPreference: string | null;
  onGenderPreferenceChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const GenderPreferenceStep = ({
  genderPreference,
  onGenderPreferenceChange,
  onSubmit,
  onBack
}: GenderPreferenceStepProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Seating Preference</h2>

        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-md flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-label="Warning" />
            <div>
              <p className="font-medium mb-1">Women's Safety Feature</p>
              <p className="text-sm">
                We offer women's only sections and buses for enhanced safety. 
                Select your preference below.
              </p>
            </div>
          </div>

          <RadioGroup 
            value={genderPreference || ""} 
            onValueChange={onGenderPreferenceChange}
            className="gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent/5">
              <RadioGroupItem value="womens_only" id="womens_only" />
              <Label htmlFor="womens_only" className="flex-1 cursor-pointer">
                <div className="font-medium">Women's Only Section/Bus</div>
                <div className="text-sm text-muted-foreground">
                  Exclusively for women travelers for enhanced safety
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent/5">
              <RadioGroupItem value="general" id="general" />
              <Label htmlFor="general" className="flex-1 cursor-pointer">
                <div className="font-medium">General Seating</div>
                <div className="text-sm text-muted-foreground">
                  Standard seating arrangement for all travelers
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onSubmit}>
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
