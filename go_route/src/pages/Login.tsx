import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/components/theme-provider";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleContinueAsGuest = () => {
    toast({
      title: "Welcome, Guest!",
      description: "You've logged in as a guest user.",
    });
    navigate("/");
  };

  const handleSendOtp = () => {
    if (loginMethod === "phone" && phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    if (loginMethod === "email" && !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setShowOtpInput(true);
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to your ${loginMethod}`,
    });
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome to GoRoute!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <span>☀️</span> : <span>🌙</span>}
        </Button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <img 
            src="http://127.0.0.1:8000/media/images/logii.png"  
            alt="GoRoute Logo" 
            className="mx-auto block dark:hidden w-32 h-auto" 
          />
          <img 
            src="http://127.0.0.1:8000/media/images/log.png"  
            alt="GoRoute Logo" 
            className="mx-auto hidden dark:block w-32 h-auto" 
          />
          <h1 className="text-3xl font-bold mt-4">
            
          </h1>
          <p className="text-muted-foreground">
            Your Travel Companion Across India
          </p>
        </div>

        <Card className="shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>Login to GoRoute</CardTitle>
            <CardDescription>
              Get started with your public transport journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showOtpInput ? (
              <Tabs defaultValue="phone" value={loginMethod} onValueChange={(v) => setLoginMethod(v as "phone" | "email")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                <TabsContent value="phone" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted">
                        <span className="text-sm text-muted-foreground">+91</span>
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="rounded-l-none"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleSendOtp}>
                    Get OTP <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleSendOtp}>
                    Get OTP <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium">
                    Verification Code
                  </label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 4-digit OTP"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center text-xl tracking-widest"
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    OTP sent to {loginMethod === "phone" ? phoneNumber : email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-1/2" onClick={() => setShowOtpInput(false)}>
                    Back
                  </Button>
                  <Button className="w-1/2" onClick={handleVerifyOtp}>
                    Verify & Login
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleContinueAsGuest}>
              Continue as Guest
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;