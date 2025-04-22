
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { useGameStore } from "@/store/gameStore";
import { FantasyButton } from "@/components/ui/fantasy-button";
import { Shield, User, ArrowRight } from "lucide-react";
import { CharacterClass } from "@/types/game";
import { toast } from "@/components/ui/use-toast";
import { CHARACTER_CLASSES } from "@/data/gameData";

const Profile = () => {
  const { user, gameState, isAuthenticated, logoutUser, selectCharacter } = useGameStore();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"info" | "characters" | "stats">("info");
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) {
    return (
      <Layout requireAuth>
        <div className="min-h-[80vh] flex items-center justify-center">
          <p>Загрузка профиля...</p>
        </div>
      </Layout>
    );
  }
  
  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из игры",
    });
    navigate("/");
  };
  
  const handleSelectCharacter = (characterId: string) => {
    selectCharacter(characterId);
    toast({
      title: "Персонаж выбран",
      description: "Вы можете продолжить игру выбранным персонажем",
    });
    navigate("/game");
  };
  
  const getClassIcon = (characterClass: CharacterClass) => {
    const IconComponent = require("lucide-react")[CHARACTER_CLASSES[characterClass].icon];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <Shield className="h-5 w-5" />;
  };
  
  const tabContent = {
    info: (
      <div>
        <h2 className="text-2xl font-bold mb-6">Информация о профиле</h2>
        <div className="bg-card border border-border/30 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="bg-primary/20 rounded-full h-24 w-24 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{user.username}</h3>
              {user.email && (
                <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
              )}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Персонажей: {gameState.characters.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Время в игре: {Math.round(gameState.gameProgress.totalPlayTime / 60)} минут
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Разблокировано достижений: {gameState.achievements.filter(a => a.unlocked).length}/{gameState.achievements.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    characters: (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Ваши персонажи</h2>
          <FantasyButton 
            variant="secondary" 
            size="sm"
            onClick={() => navigate("/character-creation")}
          >
            Создать нового
          </FantasyButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameState.characters.length > 0 ? (
            gameState.characters.map((character) => (
              <div
                key={character.id}
                className="bg-card border border-border/30 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    {getClassIcon(character.class)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{character.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{CHARACTER_CLASSES[character.class].name}</span>
                      <span className="mx-2">•</span>
                      <span>Уровень {character.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Здоровье</div>
                    <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-destructive"
                        style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Текущая фаза: {character.currentPhase}</span>
                    <span>XP: {character.experience}</span>
                  </div>
                </div>
                
                <FantasyButton
                  onClick={() => handleSelectCharacter(character.id)}
                  className="w-full"
                >
                  Выбрать персонажа <ArrowRight className="ml-2 h-4 w-4" />
                </FantasyButton>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-card border border-border/30 rounded-lg">
              <p className="text-muted-foreground mb-4">У вас еще нет ни одного персонажа.</p>
              <FantasyButton onClick={() => navigate("/character-creation")}>
                Создать персонажа
              </FantasyButton>
            </div>
          )}
        </div>
      </div>
    ),
    stats: (
      <div>
        <h2 className="text-2xl font-bold mb-6">Игровая статистика</h2>
        <div className="bg-card border border-border/30 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-border/20 rounded-lg">
              <h3 className="font-semibold text-muted-foreground mb-1">Пройденные квесты</h3>
              <p className="text-2xl font-bold">{gameState.gameProgress.completedQuests.length}</p>
            </div>
            
            <div className="p-4 border border-border/20 rounded-lg">
              <h3 className="font-semibold text-muted-foreground mb-1">Высшая фаза</h3>
              <p className="text-2xl font-bold">{gameState.gameProgress.highestPhaseUnlocked}</p>
            </div>
            
            <div className="p-4 border border-border/20 rounded-lg">
              <h3 className="font-semibold text-muted-foreground mb-1">Общее время</h3>
              <p className="text-2xl font-bold">{Math.round(gameState.gameProgress.totalPlayTime / 60)} мин.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  };
  
  return (
    <Layout requireAuth>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64">
              <div className="bg-card border border-border/30 rounded-lg p-4 sticky top-28">
                <h2 className="font-bold mb-6">Профиль</h2>
                <nav className="space-y-1 mb-8">
                  <button
                    onClick={() => setSelectedTab("info")}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedTab === "info"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    Информация
                  </button>
                  <button
                    onClick={() => setSelectedTab("characters")}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedTab === "characters"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    Персонажи
                  </button>
                  <button
                    onClick={() => setSelectedTab("stats")}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedTab === "stats"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    Статистика
                  </button>
                </nav>
                
                <FantasyButton 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="w-full"
                  size="sm"
                >
                  Выйти
                </FantasyButton>
              </div>
            </div>
            
            <div className="flex-1">
              {tabContent[selectedTab]}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
