
import React from "react";
import { Navbar } from "./navigation/navbar";
import { useGameStore } from "@/store/gameStore";

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  requireAuth = false 
}) => {
  const { isAuthenticated } = useGameStore();
  
  // If the page requires authentication and user is not authenticated
  // we could redirect here or show a message
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-black/40 backdrop-blur-sm py-6 border-t border-primary/20">
        <div className="container mx-auto text-center">
          <p className="text-sm text-foreground/70">
            &copy; {new Date().getFullYear()} World of Elbrus | Погрузись в приключение
          </p>
        </div>
      </footer>
    </div>
  );
};
