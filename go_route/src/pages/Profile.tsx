import React, { useEffect, useState } from "react";
import axios from '@/lib/axios';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, ShieldAlert, Sun, Moon, Edit, LogOut } from "lucide-react"; 
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  guardianName: string;
  guardianRelation: string;
  emergencyContact: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [userData, setUserData] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    guardianName: "",
    guardianRelation: "",
    emergencyContact: ""
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const userId = "USR123456"; 

  useEffect(() => {
    axios.get<UserProfile>("http://127.0.0.1:8000/api/profile/")
      .then((res) => {
        setUserData(res.data);
        toast.success("Profile loaded");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile");
      });
  }, []);

  const handleUpdateProfile = () => {
    axios.put("http://127.0.0.1:8000/api/profile/update/", userData)
      .then(() => {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update profile");
      });
  };

  const handleLogout = () => {
    toast.success("You have been logged out");
    setShowLogoutDialog(false);
    navigate("/login");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("profile.title")}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="text-accent">
            <Edit className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative group mb-2">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage || "/default-profile.png"} alt={userData.name} />
            <AvatarFallback>{userData.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <label htmlFor="profile-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer">
              Change
              <input id="profile-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>
        <div className="text-sm text-muted-foreground">User ID: <span className="font-mono">{userId}</span></div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing && <Badge variant="outline" className="bg-accent/10 text-accent">Verified</Badge>}
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["name", "email", "phone", "guardianName", "guardianRelation", "emergencyContact"].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>{t(`profile.${field}`)}</Label>
                  <Input
                    id={field}
                    value={(userData as any)[field]}
                    onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                    readOnly={!isEditing}
                  />
                </div>
              ))}
            </CardContent>
            {isEditing && (
              <CardFooter>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">Cancel</Button>
                <Button onClick={handleUpdateProfile}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout Confirmation</DialogTitle>
            <DialogDescription>Are you sure you want to log out?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FloatingChatButton />
    </div>
  );
};

export default Profile;
