export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  condition: (stats: GameStats) => boolean;
}

export interface GameStats {
  wordsCompleted: number;
  emeralds: number;
  level: number;
  completedCategories: {
    ALIMENTOS?: number;
    ANIMAIS?: number;
    OBJETOS?: number;
    NATUREZA?: number;
  };
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_word',
    title: 'Primeiro Bloco!',
    description: 'Completou a sua primeira palavra com sucesso.',
    icon: '🪵',
    condition: (stats) => stats.wordsCompleted >= 1
  },
  {
    id: 'emerald_collector',
    title: 'Caçador de Esmeraldas',
    description: 'Acumulou 5 esmeraldas brilhantes.',
    icon: '💎',
    condition: (stats) => stats.emeralds >= 5
  },
  {
    id: 'animal_master',
    title: 'Amigo dos Animais',
    description: 'Completou 5 palavras na categoria de Animais.',
    icon: '🐾',
    condition: (stats) => (stats.completedCategories.ANIMAIS || 0) >= 5
  },
  {
    id: 'food_explorer',
    title: 'Banquete de Letras',
    description: 'Completou 5 palavras na categoria de Alimentos.',
    icon: '🍎',
    condition: (stats) => (stats.completedCategories.ALIMENTOS || 0) >= 5
  },
  {
    id: 'level_3',
    title: 'Aventureiro Experiente',
    description: 'Alcançou o Nível 3 de XP!',
    icon: '🛡️',
    condition: (stats) => stats.level >= 3
  },
  {
    id: 'word_master_10',
    title: 'Mestre da Leitura',
    description: 'Formou 10 palavras diferentes!',
    icon: '👑',
    condition: (stats) => stats.wordsCompleted >= 10
  }
];
