import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Profile button bottom right
const FloatingProfileButton = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Button
      onClick={handleProfileClick}
      className="fixed bottom-20 right-4 z-50 rounded-full w-12 h-12 shadow-lg bg-accent hover:bg-accent/90"
      size="icon"
      aria-label="Profile"
    >
      <User className="h-5 w-5" />
    </Button>
  );
};

export default FloatingProfileButton;
