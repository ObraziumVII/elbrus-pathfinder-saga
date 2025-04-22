
import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { useGameStore } from "@/store/gameStore";
import { Lock } from "lucide-react";

const Achievements = () => {
  const { gameState } = useGameStore();
  const { achievements } = gameState;

  // Group achievements by unlocked status
  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);
  
  const renderAchievement = (achievement: typeof achievements[0], index: number) => {
    const IconComponent = require("lucide-react")[achievement.icon] || Lock;
    
    return (
      <motion.div
        key={achievement.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-card border rounded-lg p-6 hover:bg-card/80 transition-all ${
          achievement.unlocked
            ? "border-gold/40 shadow-md shadow-gold/5"
            : "border-border/30 opacity-75"
        }`}
      >
        <div className="flex items-start">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${
              achievement.unlocked ? "bg-gold/20" : "bg-muted/20"
            }`}
          >
            <IconComponent
              className={`h-6 w-6 ${
                achievement.unlocked ? "text-gold" : "text-muted-foreground"
              }`}
            />
          </div>
          <div>
            <h3 className="font-bold mb-1">{achievement.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {achievement.description}
            </p>
            <div
              className={`text-xs px-2 py-1 rounded-full inline-block ${
                achievement.unlocked
                  ? "bg-gold/20 text-gold"
                  : "bg-muted/20 text-muted-foreground"
              }`}
            >
              {achievement.unlocked ? "Разблокировано" : "Заблокировано"}
            </div>
            <p className="mt-2 text-xs border-t border-border pt-2">
              <span className="font-semibold">Награда:</span> {achievement.rewardDescription}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gold mb-4">Достижения</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ваш путь к славе отмечен особыми достижениями, которые вы открываете в процессе игры
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Прогресс
              </h2>
              <div className="text-sm text-muted-foreground">
                Разблокировано {unlockedAchievements.length} из {achievements.length}
              </div>
            </div>
            
            <div className="bg-card border border-border/30 rounded-lg p-6 mb-8">
              <div className="h-4 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(unlockedAchievements.length / achievements.length) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-2 text-sm text-center">
                {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
              </div>
            </div>
          </div>
          
          {unlockedAchievements.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Разблокированные достижения</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {unlockedAchievements.map((achievement, index) =>
                  renderAchievement(achievement, index)
                )}
              </div>
            </div>
          )}
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              {unlockedAchievements.length > 0 ? "Заблокированные достижения" : "Все достижения"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lockedAchievements.map((achievement, index) =>
                renderAchievement(achievement, index)
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;
