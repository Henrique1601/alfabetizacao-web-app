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
  streak: number;
  bestStreak: number;
  completedCategories: Record<string, number>;
  difficultyCount: {
    FACIL: number;
    MEDIO: number;
    DIFICIL: number;
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
    id: 'streak_3',
    title: 'Super Foco!',
    description: 'Acertou 3 palavras seguidas sem errar.',
    icon: '🔥',
    condition: (stats) => stats.bestStreak >= 3
  },
  {
    id: 'streak_5',
    title: 'Inabalável!',
    description: 'Acertou 5 palavras seguidas sem errar!',
    icon: '⚡',
    condition: (stats) => stats.bestStreak >= 5
  },
  {
    id: 'emerald_collector',
    title: 'Caçador de Esmeraldas',
    description: 'Acumulou 10 esmeraldas brilhantes.',
    icon: '💎',
    condition: (stats) => stats.emeralds >= 10
  },
  {
    id: 'hard_master',
    title: 'Desafio Noturno',
    description: 'Completou 3 palavras no modo Difícil.',
    icon: '⚔️',
    condition: (stats) => (stats.difficultyCount?.DIFICIL || 0) >= 3
  },
  {
    id: 'animal_master',
    title: 'Amigo dos Animais',
    description: 'Completou 5 palavras na categoria de Animais.',
    icon: '🐾',
    condition: (stats) => (stats.completedCategories?.ANIMAIS || 0) >= 5
  },
  {
    id: 'food_explorer',
    title: 'Banquete de Letras',
    description: 'Completou 5 palavras na categoria de Alimentos.',
    icon: '🍎',
    condition: (stats) => (stats.completedCategories?.ALIMENTOS || 0) >= 5
  },
  {
    id: 'colors_expert',
    title: 'Arco-Íris de Letras',
    description: 'Completou 3 palavras na categoria de Cores.',
    icon: '🎨',
    condition: (stats) => (stats.completedCategories?.CORES || 0) >= 3
  },
  {
    id: 'level_3',
    title: 'Aventureiro Experiente',
    description: 'Alcançou o Nível 3 de XP!',
    icon: '🛡️',
    condition: (stats) => stats.level >= 3
  },
  {
    id: 'level_5',
    title: 'Lenda do Alfabeto',
    description: 'Alcançou o Nível 5 de XP!',
    icon: '🌟',
    condition: (stats) => stats.level >= 5
  },
  {
    id: 'word_master_15',
    title: 'Mestre da Leitura',
    description: 'Formou 15 palavras diferentes!',
    icon: '👑',
    condition: (stats) => stats.wordsCompleted >= 15
  }
];
