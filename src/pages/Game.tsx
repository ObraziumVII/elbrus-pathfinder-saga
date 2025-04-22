import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { useGameStore } from "@/store/gameStore";
import { GAME_PHASES } from "@/data/gameData";
import { FantasyButton } from "@/components/ui/fantasy-button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sword, MapPin, Book } from "lucide-react";

const Game = () => {
  const { isAuthenticated, gameState, getCurrentCharacter } = useGameStore();
  const navigate = useNavigate();
  const character = getCurrentCharacter();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (!character) {
      navigate("/character-creation");
    }
  }, [isAuthenticated, character, navigate]);
  
  if (!character) {
    return (
      <Layout requireAuth>
        <div className="min-h-[80vh] flex items-center justify-center">
          <p>Загрузка персонажа...</p>
        </div>
      </Layout>
    );
  }
  
  const currentPhase = GAME_PHASES.find((phase) => phase.id === character.currentPhase) || GAME_PHASES[0];
  
  const phaseVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };
  
  return (
    <Layout requireAuth>
      <div className="min-h-screen py-8">
        {/* Character Status Bar */}
        <div className="bg-card border-b border-border/30 py-4 mb-8 sticky top-16 z-10 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold">{character.name}</h2>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-2">{character.class}</span>
                    <span>Уровень {character.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-8">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Фаза</div>
                  <div className="font-bold text-gold">{character.currentPhase}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Здоровье</div>
                  <div className="flex items-center">
                    <div className="h-2 w-24 bg-background rounded-full overflow-hidden mr-2">
                      <div
                        className="h-full bg-destructive"
                        style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs">{character.health}/{character.maxHealth}</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Опыт</div>
                  <div className="font-bold">{character.experience} XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Current Phase */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                <span className="text-gold-foreground">Фаза {currentPhase.id}:</span> {currentPhase.name}
              </h1>
              <div className="hidden md:block">
                <FantasyButton variant="accent" size="sm">
                  Показать на карте <MapPin className="ml-2 h-4 w-4" />
                </FantasyButton>
              </div>
            </div>
            
            <div className="bg-card border border-border/40 rounded-lg overflow-hidden mb-8">
              <div
                className="h-64 bg-cover bg-center relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(/phases/${currentPhase.backgroundImage})`,
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h2 className="text-2xl font-bold mb-4">{currentPhase.name}</h2>
                  <p className="max-w-2xl text-foreground/90">{currentPhase.description}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold mb-4 text-xl">Доступные задания</h3>
                <div className="space-y-6">
                  {currentPhase.quests.map((quest) => (
                    <div
                      key={quest.id}
                      className="border border-border/40 rounded-lg p-4 hover:bg-card/80 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold">{quest.name}</h4>
                        <span className={`text-xs py-1 px-2 rounded-full ${quest.completed ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}`}>
                          {quest.completed ? "Выполнено" : "Активно"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {quest.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {quest.objectives.map((objective, i) => (
                          <div key={i} className="flex items-center text-xs">
                            <div
                              className={`w-4 h-4 rounded-full mr-2 border flex items-center justify-center ${quest.completed ? "border-accent bg-accent/20" : "border-muted-foreground"}`}
                            >
                              {quest.completed && (
                                <div className="w-2 h-2 rounded-full bg-accent"></div>
                              )}
                            </div>
                            <span>{objective}</span>
                          </div>
                        ))}
                      </div>
                      <FantasyButton
                        variant={quest.completed ? "secondary" : "primary"}
                        size="sm"
                        disabled={quest.completed}
                      >
                        {quest.completed ? "Завершено" : "Начать задание"}
                      </FantasyButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Other Phases */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Все фазы приключения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {GAME_PHASES.map((phase, i) => (
                <motion.div
                  key={phase.id}
                  custom={i}
                  variants={phaseVariants}
                  initial="hidden"
                  animate="visible"
                  className={`phase-card ${
                    phase.id > gameState.gameProgress.highestPhaseUnlocked
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">{phase.id}</span>
                    </div>
                    <h3 className="font-bold">{phase.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex items-center space-x-2">
                      <Sword className="h-4 w-4 text-destructive" />
                      <span>Враги: {phase.enemies.join(", ")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Book className="h-4 w-4 text-primary" />
                      <span>Заданий: {phase.quests.length}</span>
                    </div>
                  </div>
                  <FantasyButton
                    variant={character.currentPhase === phase.id ? "accent" : "secondary"}
                    size="sm"
                    disabled={phase.id > gameState.gameProgress.highestPhaseUnlocked}
                    className="w-full"
                  >
                    {character.currentPhase === phase.id
                      ? "Текущая фаза"
                      : phase.id < character.currentPhase
                      ? "Вернуться"
                      : phase.id > gameState.gameProgress.highestPhaseUnlocked
                      ? "Заблокировано"
                      : "Перейти к фазе"}
                  </FantasyButton>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Game;
