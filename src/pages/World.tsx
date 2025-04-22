
import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { GAME_PHASES } from "@/data/gameData";
import { MapPin, Info } from "lucide-react";

const World = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gold mb-4">Мир Эльбруса</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Исследуйте таинственные земли волшебного мира, от безопасных учебных полигонов до опасных зловещих замков
            </p>
          </div>
          
          <div className="bg-card border border-border/30 rounded-lg p-6 mb-12">
            <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
              {/* World Map */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/world-map.jpg)" }}
              >
                {/* Phase Markers */}
                {GAME_PHASES.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    className="absolute cursor-pointer"
                    style={{
                      top: `${20 + index * 20}%`,
                      left: `${15 + index * 20}%`,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                        <span className="font-bold">{phase.id}</span>
                      </div>
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -inset-2 rounded-full border-2 border-primary opacity-50"
                      />
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-semibold text-white bg-primary/70 px-2 py-1 rounded text-sm">
                        {phase.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/40">
                <h4 className="font-bold mb-2">Легенда</h4>
                <div className="space-y-2">
                  {GAME_PHASES.map((phase) => (
                    <div key={phase.id} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-white">{phase.id}</span>
                      </div>
                      <span className="text-sm">{phase.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Lore Sections */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">История мира</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border/30 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gold">Происхождение Эльбруса</h3>
                <p className="text-muted-foreground mb-4">
                  Мир Эльбрус был создан древними богами как место для обучения будущих героев. 
                  Название "Эльбрус" произошло от имени главного бога мудрости и знаний - Эльбруса Великого.
                </p>
                <p className="text-muted-foreground">
                  Веками мир служил тренировочным полигоном для героев из разных реальностей, 
                  готовя их к великим подвигам и тяжелым испытаниям, с которыми они столкнутся 
                  в будущем. Только лучшие смогут пройти все испытания и достигнуть "выпускного".
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border/30 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gold">Расы и народы</h3>
                <p className="text-muted-foreground mb-4">
                  В Эльбрусе проживают несколько разумных рас: люди, населяющие долины и города; 
                  эльфы, обитающие в лесах; гномы, поселившиеся в горных регионах; и орки, 
                  контролирующие северные равнины.
                </p>
                <p className="text-muted-foreground">
                  Каждая раса имеет свою уникальную культуру, верования и отношения с другими. 
                  Мирное сосуществование поддерживается благодаря древним договорам и общей 
                  цели - подготовке героев к выпускному испытанию.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border/30 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gold">Магия Эльбруса</h3>
                <p className="text-muted-foreground mb-4">
                  Магия в мире Эльбрус имеет четыре основных школы: Огненная, Водная, Земляная и Воздушная. 
                  Каждая школа соответствует одной из фаз обучения героев, и мастерство в каждой из них 
                  необходимо для полного понимания магических искусств.
                </p>
                <p className="text-muted-foreground">
                  Существуют также редкие случаи проявления пятой школы - Эфирной магии, которая доступна 
                  только тем, кто прошел выпускное испытание и доказал свою исключительность.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-card border border-border/30 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gold">Тайна выпускного</h3>
                <p className="text-muted-foreground mb-4">
                  Мало кто знает, что ждет героев на выпускном испытании. Согласно легендам, 
                  только один из сотни доходит до этого этапа, и только половина из достигших 
                  выживает в финальном испытании.
                </p>
                <p className="text-muted-foreground">
                  Те, кто успешно проходит выпускной, становятся хранителями мира Эльбрус, 
                  получают доступ к древним знаниям и артефактам, а также возможность вернуться 
                  в свои миры настоящими героями, готовыми к любым испытаниям.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default World;
