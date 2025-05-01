
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft } from "lucide-react";
import { useState } from "react";
import SettingsMenu from "./SettingsMenu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Show back button on all pages except Home '/'
  const shouldShowBack = location.pathname !== "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {shouldShowBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="fixed top--1 left-0 z-20 flex items-center gap-2">
          <img 
            src="http://127.0.0.1:8000/lovable-uploads/nel.png" 
            alt="GoRoute Logo" 
            className="fixed top--1 left-1 w-40 z-50 block dark:hidden w-32 h-auto" 
          />
          <img 
            src="http://127.0.0.1:8000/lovable-uploads/neww.png" 
            alt="GoRoute Logo" 
            className="fixed top--1 left-1 w-40 z-50 hidden dark:block w-32 h-auto" 
          />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            aria-label="Open settings"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Settings Menu */}
      <SettingsMenu open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
};

export default Navbar;
