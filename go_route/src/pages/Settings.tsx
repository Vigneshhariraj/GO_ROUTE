
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, Languages, UserCircle } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const { t, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <UserCircle className="h-6 w-6" />
            <span className="font-medium">Profile</span>
          </div>
          <Button variant="outline" onClick={() => navigate('/profile')}>
            View Profile
          </Button>
        </div>

        <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <Languages className="h-6 w-6" />
            <span className="font-medium">Language</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {t('language.current')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('hi')}>
                Hindi
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ta')}>
                Tamil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            {theme === 'dark' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            <span className="font-medium">Theme</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <LogOut className="h-6 w-6 text-destructive" />
            <span className="font-medium text-destructive">Logout</span>
          </div>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
