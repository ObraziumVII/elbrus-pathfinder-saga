
import { Achievement, CharacterClass, GamePhase } from "../types/game";

export const CHARACTER_CLASSES: Record<CharacterClass, {
  name: string;
  description: string;
  icon: string;
  baseStats: {
    strength: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    defense: number;
  };
}> = {
  warrior: {
    name: "Воин",
    description: "Мастер ближнего боя с высокой защитой и мощными атаками.",
    icon: "sword",
    baseStats: {
      strength: 8,
      dexterity: 5,
      intelligence: 3,
      wisdom: 2,
      defense: 7
    }
  },
  archer: {
    name: "Лучник",
    description: "Эксперт дальних атак с высокой подвижностью и точностью.",
    icon: "arrow-right",
    baseStats: {
      strength: 4,
      dexterity: 9,
      intelligence: 4,
      wisdom: 3,
      defense: 5
    }
  },
  mage: {
    name: "Маг",
    description: "Мастер мощных заклинаний, но имеет слабую защиту.",
    icon: "book",
    baseStats: {
      strength: 2,
      dexterity: 4,
      intelligence: 9,
      wisdom: 6,
      defense: 3
    }
  },
  healer: {
    name: "Лекарь",
    description: "Специалист по лечению и поддержке, но слаб в атаке.",
    icon: "heart",
    baseStats: {
      strength: 2,
      dexterity: 4,
      intelligence: 5,
      wisdom: 9,
      defense: 5
    }
  }
};

export const GAME_PHASES: GamePhase[] = [
  {
    id: 0,
    name: "Начало пути",
    description: "Первая локация, где вы узнаете основы боевой системы и механик игры.",
    backgroundImage: "forest-training.jpg",
    enemies: ["Тренировочный манекен", "Деревянный голем", "Новичок-бандит"],
    quests: [
      {
        id: "talk-to-mentor",
        name: "Встреча с наставником",
        description: "Найдите и поговорите с вашим наставником в деревне.",
        objectives: ["Поговорить с наставником"],
        reward: {
          experience: 50,
          gold: 10
        },
        completed: false
      },
      {
        id: "training-combat",
        name: "Боевая тренировка",
        description: "Научитесь основам боевой системы на тренировочных манекенах.",
        objectives: ["Победить 3 тренировочных манекена"],
        reward: {
          experience: 100,
          gold: 25,
          items: ["Учебный меч"]
        },
        completed: false
      },
      {
        id: "collect-resources",
        name: "Сбор ресурсов",
        description: "Соберите ресурсы для деревни, чтобы доказать свою полезность.",
        objectives: ["Собрать 5 лечебных трав", "Добыть 3 куска железной руды"],
        reward: {
          experience: 150,
          gold: 50
        },
        completed: false
      }
    ],
    reward: "Базовое снаряжение в соответствии с классом",
    unlocks: "Фаза 1: Первые испытания",
    minimumLevel: 1
  },
  {
    id: 1,
    name: "Первые испытания",
    description: "Лесная зона с более серьёзными врагами и сложными заданиями.",
    backgroundImage: "dark-forest.jpg",
    enemies: ["Лесной волк", "Гоблин-разведчик", "Гоблин-воин"],
    quests: [
      {
        id: "wolf-hunt",
        name: "Охота на волков",
        description: "Лесные волки угрожают жителям деревни. Уничтожьте нескольких из них.",
        objectives: ["Убить 5 лесных волков"],
        reward: {
          experience: 200,
          gold: 100,
          items: ["Волчья шкура"]
        },
        completed: false
      },
      {
        id: "lost-artifact",
        name: "Потерянный артефакт",
        description: "Найдите древний артефакт, утерянный в лесу много лет назад.",
        objectives: ["Исследовать древние руины", "Найти артефакт силы"],
        reward: {
          experience: 300,
          gold: 150,
          items: ["Древний амулет"]
        },
        completed: false
      },
      {
        id: "help-blacksmith",
        name: "Помощь кузнецу",
        description: "Местный кузнец нуждается в редких материалах для создания оружия.",
        objectives: ["Собрать 5 частей метеоритной руды", "Доставить материалы кузнецу"],
        reward: {
          experience: 250,
          gold: 200,
          items: ["Улучшенное оружие"]
        },
        completed: false
      }
    ],
    reward: "Новое умение в соответствии с классом персонажа",
    unlocks: "Фаза 2: Испытание умений",
    minimumLevel: 3
  },
  {
    id: 2,
    name: "Испытание умений",
    description: "Горная местность с сильными противниками и сложными испытаниями.",
    backgroundImage: "mountains.jpg",
    enemies: ["Горный троль", "Бандит-разбойник", "Горный элементаль"],
    quests: [
      {
        id: "defeat-troll",
        name: "Победа над троллем",
        description: "Горный троль терроризирует торговые караваны. Победите его.",
        objectives: ["Выследить горного троля", "Победить горного троля"],
        reward: {
          experience: 500,
          gold: 300,
          items: ["Сердце троля"]
        },
        completed: false
      },
      {
        id: "puzzle-riddle",
        name: "Загадка мудреца",
        description: "Найдите отшельника-мудреца и решите его загадку, чтобы получить древние знания.",
        objectives: ["Найти пещеру мудреца", "Решить три загадки"],
        reward: {
          experience: 400,
          gold: 200,
          items: ["Свиток мудрости"]
        },
        completed: false
      },
      {
        id: "ancient-scroll",
        name: "Древний свиток",
        description: "В горных пещерах спрятан древний свиток с мощным заклинанием.",
        objectives: ["Найти вход в древний храм", "Преодолеть ловушки", "Найти свиток"],
        reward: {
          experience: 600,
          gold: 350,
          items: ["Древний свиток силы"]
        },
        completed: false
      }
    ],
    reward: "Улучшенное снаряжение для всех слотов",
    unlocks: "Фаза 3: Последний рубеж",
    minimumLevel: 6
  },
  {
    id: 3,
    name: "Последний рубеж",
    description: "Зловещий замок тьмы с сильнейшими врагами и финальным испытанием.",
    backgroundImage: "dark-castle.jpg",
    enemies: ["Рыцарь тьмы", "Скелет-воин", "Призрачный маг"],
    quests: [
      {
        id: "defeat-guards",
        name: "Стражи замка",
        description: "Прежде чем проникнуть в замок, нужно справиться с его стражами.",
        objectives: ["Победить капитана стражи", "Получить ключ от замка"],
        reward: {
          experience: 800,
          gold: 500,
          items: ["Ключ от тронного зала"]
        },
        completed: false
      },
      {
        id: "artifact-mystery",
        name: "Тайна артефакта",
        description: "Разгадайте тайну древнего артефакта, хранящегося в замке.",
        objectives: ["Найти древнюю библиотеку", "Изучить забытые свитки", "Активировать артефакт"],
        reward: {
          experience: 1000,
          gold: 600,
          items: ["Активированный артефакт"]
        },
        completed: false
      },
      {
        id: "final-boss",
        name: "Финальное сражение",
        description: "Сразитесь с повелителем замка тьмы.",
        objectives: ["Проникнуть в тронный зал", "Победить Тёмного мага"],
        reward: {
          experience: 1500,
          gold: 1000,
          items: ["Корона тьмы"]
        },
        completed: false
      }
    ],
    reward: "Доступ к выпускному и эпическое снаряжение",
    unlocks: "Выпускной: Финальное испытание",
    minimumLevel: 10
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    name: "Первый шаг",
    description: "Завершить обучение и перейти в фазу 1.",
    icon: "book-open",
    rewardDescription: "Титул: Подмастерье",
    unlocked: false
  },
  {
    id: "monster-hunter",
    name: "Охотник на монстров",
    description: "Уничтожить 50 врагов.",
    icon: "sword",
    rewardDescription: "200 золота и Титул: Истребитель",
    unlocked: false
  },
  {
    id: "treasure-hunter",
    name: "Сокровище Эльбруса",
    description: "Найти все скрытые артефакты.",
    icon: "baggage-claim",
    rewardDescription: "Титул: Кладоискатель и редкий предмет",
    unlocked: false
  },
  {
    id: "class-master",
    name: "Мастер класса",
    description: "Изучить все умения своего класса.",
    icon: "award",
    rewardDescription: "Титул: Мастер и специальная способность",
    unlocked: false
  },
  {
    id: "savior",
    name: "Спаситель Эльбруса",
    description: "Завершить все фазы и победить финального босса.",
    icon: "shield",
    rewardDescription: "Титул: Герой Эльбруса и уникальное оружие",
    unlocked: false
  }
];
