
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  Sword, 
  ArrowRight, 
  Book,
  Award,
  Heart 
} from "lucide-react";
import { Layout } from "@/components/layout";
import { FantasyButton } from "@/components/ui/fantasy-button";
import { GAME_PHASES } from "@/data/gameData";

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto p-4"
          >
            <div className="mb-8 flex justify-center">
              <Shield className="h-20 w-20 text-primary animate-glow" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white">
              <span className="text-gold">World of</span> Elbrus
            </h1>
            <p className="text-xl mb-8 text-foreground/80">
              Погрузись в эпическое приключение, исследуй мистические земли и стань легендой в захватывающей фэнтези RPG игре.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <FantasyButton variant="primary" size="lg">
                  Начать приключение <ArrowRight className="ml-2 h-5 w-5" />
                </FantasyButton>
              </Link>
              <Link to="/world">
                <FantasyButton variant="secondary" size="lg">
                  Исследовать мир
                </FantasyButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#1A1F2C] to-background">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gold">Особенности игры</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="game-card p-6"
            >
              <div className="mb-4 rounded-full bg-primary/20 w-16 h-16 flex items-center justify-center mx-auto">
                <Sword className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Создай героя</h3>
              <p className="text-muted-foreground text-center">
                Выбери один из 4 уникальных классов, каждый со своими способностями и стилем игры.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="game-card p-6"
            >
              <div className="mb-4 rounded-full bg-primary/20 w-16 h-16 flex items-center justify-center mx-auto">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Исследуй мир</h3>
              <p className="text-muted-foreground text-center">
                Путешествуй через 4 уникальные зоны, каждая с собственными заданиями, врагами и тайнами.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="game-card p-6"
            >
              <div className="mb-4 rounded-full bg-primary/20 w-16 h-16 flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Стань легендой</h3>
              <p className="text-muted-foreground text-center">
                Разблокируй достижения, соберите редкие предметы и достигнете финального выпускного испытания.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phases Preview */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gold">Путь героя</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Ваше приключение в мире Эльбруса состоит из 4 уникальных фаз, каждая сложнее предыдущей.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {GAME_PHASES.map((phase, index) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="phase-card"
              >
                <div className="h-40 rounded-lg bg-cover bg-center mb-4 relative overflow-hidden" 
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(/phases/${phase.backgroundImage})` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white text-center drop-shadow-lg">{phase.name}</h3>
                  </div>
                  <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {phase.id}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-destructive" />
                    <span className="text-xs">Враги: {phase.enemies.join(", ")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-gold" />
                    <span className="text-xs">Награда: {phase.reward}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-t from-background to-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Готов начать своё приключение?</h2>
          <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
            Мир Эльбруса ждёт своих героев. Зарегистрируйтесь, создайте персонажа и отправляйтесь в незабываемое путешествие!
          </p>
          <Link to="/login">
            <FantasyButton variant="gold" size="lg">
              Присоединиться к приключению
            </FantasyButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
