
export type CharacterClass = 'warrior' | 'archer' | 'mage' | 'healer';

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  avatarUrl: string;
  currentPhase: number;
  completedQuests: string[];
  inventory: InventoryItem[];
  skills: Skill[];
  achievements: string[];
  stats: {
    strength: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    defense: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'artifact';
  description: string;
  value: number;
  effect?: string;
  equipped?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  type: 'active' | 'passive';
  description: string;
  cooldown?: number;
  damage?: number;
  healing?: number;
}

export interface GamePhase {
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  enemies: string[];
  quests: Quest[];
  reward: string;
  unlocks: string;
  minimumLevel: number;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  reward: {
    experience: number;
    gold: number;
    items?: string[];
  };
  completed: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rewardDescription: string;
  unlocked: boolean;
}

export interface GameState {
  characters: Character[];
  currentCharacter?: Character;
  achievements: Achievement[];
  gameProgress: {
    highestPhaseUnlocked: number;
    completedQuests: string[];
    totalPlayTime: number;
  };
}

export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  gameState?: GameState;
}
