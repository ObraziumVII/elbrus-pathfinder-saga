
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, User, Award, Book } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { FantasyButton } from "@/components/ui/fantasy-button";

export const Navbar: React.FC = () => {
  const { isAuthenticated, logoutUser } = useGameStore();
  const location = useLocation();

  const navLinks = [
    { name: "Главная", path: "/", icon: Shield },
    { name: "Игра", path: "/game", icon: Book },
    { name: "Достижения", path: "/achievements", icon: Award },
    { name: "Профиль", path: "/profile", icon: User }
  ];

  return (
    <nav className="bg-black/40 backdrop-blur-md border-b border-primary/20 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary animate-pulse-slow" />
          <h1 className="text-2xl font-bold gold-text">World of Elbrus</h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-1 py-1 px-2 rounded-md transition-colors ${
                location.pathname === link.path
                  ? "text-gold-foreground bg-primary/30 border-b border-primary"
                  : "text-foreground/80 hover:text-foreground hover:bg-primary/10"
              }`}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <FantasyButton
              variant="secondary"
              size="sm"
              onClick={() => logoutUser()}
            >
              Выход
            </FantasyButton>
          ) : (
            <Link to="/login">
              <FantasyButton variant="primary" size="sm">
                Войти
              </FantasyButton>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
