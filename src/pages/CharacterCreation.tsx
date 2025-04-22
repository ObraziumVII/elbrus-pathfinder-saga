
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { FantasyButton } from "@/components/ui/fantasy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CHARACTER_CLASSES } from "@/data/gameData";
import { CharacterClass } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { Shield, Sword, ArrowRight, Book, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const CharacterCreation = () => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  
  const { createCharacter, isAuthenticated } = useGameStore();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  const handleCreateCharacter = () => {
    if (!name.trim()) {
      toast({
        title: "Имя персонажа обязательно",
        description: "Пожалуйста, введите имя для своего героя",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedClass) {
      toast({
        title: "Выберите класс",
        description: "Пожалуйста, выберите класс для своего героя",
        variant: "destructive",
      });
      return;
    }
    
    // Create character and navigate to game screen
    createCharacter({
      name,
      class: selectedClass,
      stats: CHARACTER_CLASSES[selectedClass].baseStats,
    });
    
    toast({
      title: "Персонаж создан",
      description: `${name}, ваше приключение начинается!`,
    });
    
    navigate("/game");
  };
  
  const getClassIcon = (characterClass: CharacterClass) => {
    switch (characterClass) {
      case "warrior":
        return <Sword className="h-8 w-8" />;
      case "archer":
        return <ArrowRight className="h-8 w-8" />;
      case "mage":
        return <Book className="h-8 w-8" />;
      case "healer":
        return <Heart className="h-8 w-8" />;
      default:
        return <Shield className="h-8 w-8" />;
    }
  };
  
  return (
    <Layout requireAuth>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gold mb-4">Создание персонажа</h1>
            <p className="text-muted-foreground">
              Выберите имя и класс для своего героя, чтобы начать приключение
            </p>
          </div>
          
          <div className="bg-card border border-border/30 rounded-lg p-6 mb-8">
            <Label htmlFor="character-name" className="text-lg mb-2 block">
              Имя персонажа
            </Label>
            <Input
              id="character-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя вашего героя"
              className="fantasy-input mb-4"
              maxLength={20}
            />
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Выберите класс</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(Object.keys(CHARACTER_CLASSES) as CharacterClass[]).map((characterClass) => (
                <motion.div
                  key={characterClass}
                  whileHover={{ scale: 1.03 }}
                  className={`character-card ${
                    selectedClass === characterClass
                      ? "border-primary border-2"
                      : "border-border/40"
                  }`}
                  onClick={() => setSelectedClass(characterClass)}
                >
                  <div className="h-36 bg-gradient-to-b from-primary/20 to-transparent flex items-center justify-center">
                    <div className="bg-card/80 rounded-full p-4">
                      {getClassIcon(characterClass)}
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {CHARACTER_CLASSES[characterClass].name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {CHARACTER_CLASSES[characterClass].description}
                    </p>
                    
                    <div className="grid grid-cols-5 gap-1 text-xs">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">СИЛ</span>
                        <span>{CHARACTER_CLASSES[characterClass].baseStats.strength}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold">ЛОВ</span>
                        <span>{CHARACTER_CLASSES[characterClass].baseStats.dexterity}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold">ИНТ</span>
                        <span>{CHARACTER_CLASSES[characterClass].baseStats.intelligence}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold">МДР</span>
                        <span>{CHARACTER_CLASSES[characterClass].baseStats.wisdom}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold">ЗАЩ</span>
                        <span>{CHARACTER_CLASSES[characterClass].baseStats.defense}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <FantasyButton onClick={handleCreateCharacter} size="lg">
              Создать персонажа
            </FantasyButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CharacterCreation;
