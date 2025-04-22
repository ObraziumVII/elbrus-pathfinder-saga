
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Character, GameState, User } from "../types/game";
import { ACHIEVEMENTS } from "../data/gameData";

interface GameStore {
  user: User | null;
  gameState: GameState;
  isAuthenticated: boolean;
  registerUser: (username: string, password: string, email?: string) => void;
  loginUser: (username: string, password: string) => boolean;
  logoutUser: () => void;
  createCharacter: (character: Partial<Character>) => void;
  selectCharacter: (characterId: string) => void;
  getCurrentCharacter: () => Character | undefined;
  unlockPhase: (phaseId: number) => void;
  completeQuest: (questId: string) => void;
  unlockAchievement: (achievementId: string) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      user: null,
      gameState: {
        characters: [],
        achievements: ACHIEVEMENTS,
        gameProgress: {
          highestPhaseUnlocked: 0,
          completedQuests: [],
          totalPlayTime: 0,
        },
      },
      isAuthenticated: false,
      
      registerUser: (username, password, email) => {
        // In a real app, this would call an API endpoint
        set({
          user: {
            id: Date.now().toString(),
            username,
            email,
            avatarUrl: `/avatars/default.png`,
          },
          isAuthenticated: true,
        });
      },
      
      loginUser: (username, password) => {
        // Mock login - in a real app, this would validate against a backend
        if (get().user?.username === username) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logoutUser: () => {
        set({ isAuthenticated: false });
      },
      
      createCharacter: (characterData) => {
        const newCharacter: Character = {
          id: Date.now().toString(),
          name: characterData.name || "Hero",
          class: characterData.class || "warrior",
          level: 1,
          experience: 0,
          health: 100,
          maxHealth: 100,
          avatarUrl: `/avatars/${characterData.class}.png`,
          currentPhase: 0,
          completedQuests: [],
          inventory: [],
          skills: [],
          achievements: [],
          stats: characterData.stats || {
            strength: 5,
            dexterity: 5,
            intelligence: 5,
            wisdom: 5,
            defense: 5,
          },
        };
        
        set((state) => ({
          gameState: {
            ...state.gameState,
            characters: [...state.gameState.characters, newCharacter],
            currentCharacter: newCharacter,
          },
        }));
      },
      
      selectCharacter: (characterId) => {
        const character = get().gameState.characters.find((c) => c.id === characterId);
        if (character) {
          set((state) => ({
            gameState: {
              ...state.gameState,
              currentCharacter: character,
            },
          }));
        }
      },
      
      getCurrentCharacter: () => {
        return get().gameState.currentCharacter;
      },
      
      unlockPhase: (phaseId) => {
        set((state) => {
          if (state.gameState.gameProgress.highestPhaseUnlocked < phaseId) {
            return {
              gameState: {
                ...state.gameState,
                gameProgress: {
                  ...state.gameState.gameProgress,
                  highestPhaseUnlocked: phaseId,
                }
              }
            };
          }
          return state;
        });
      },
      
      completeQuest: (questId) => {
        set((state) => ({
          gameState: {
            ...state.gameState,
            gameProgress: {
              ...state.gameState.gameProgress,
              completedQuests: [
                ...state.gameState.gameProgress.completedQuests,
                questId,
              ],
            },
          },
        }));
      },
      
      unlockAchievement: (achievementId) => {
        set((state) => {
          const updatedAchievements = state.gameState.achievements.map(
            (achievement) =>
              achievement.id === achievementId
                ? { ...achievement, unlocked: true }
                : achievement
          );
          
          return {
            gameState: {
              ...state.gameState,
              achievements: updatedAchievements,
            },
          };
        });
      },
    }),
    {
      name: "world-of-elbrus-storage",
    }
  )
);
