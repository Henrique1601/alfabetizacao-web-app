export type WordCategory = 'TODOS' | 'ALIMENTOS' | 'ANIMAIS' | 'OBJETOS' | 'NATUREZA';

export interface WordItem {
  id: string;
  word: string;
  icon: string;
  category: WordCategory;
  syllables: string[];
  options: string[]; // opções para baralhar no ecrã
}

export const WORDS_DATA: WordItem[] = [
  // --- ALIMENTOS ---
  { id: '1', word: 'CAFÉ', icon: '☕', category: 'ALIMENTOS', syllables: ['CA', 'FÉ'], options: ['CA', 'FÉ', 'BA', 'LÓ'] },
  { id: '2', word: 'PÃO', icon: '🍞', category: 'ALIMENTOS', syllables: ['PÃO'], options: ['PÃO', 'MÃO', 'CÃO', 'NÃO'] },
  { id: '3', word: 'MAMÃO', icon: '🥭', category: 'ALIMENTOS', syllables: ['MA', 'MÃO'], options: ['MA', 'MÃO', 'PA', 'PÃO'] },
  { id: '4', word: 'AÇÚCAR', icon: '🍬', category: 'ALIMENTOS', syllables: ['A', 'ÇÚ', 'CAR'], options: ['A', 'ÇÚ', 'CAR', 'BA', 'RA'] },
  { id: '5', word: 'COMIDA', icon: '🍲', category: 'ALIMENTOS', syllables: ['CO', 'MI', 'DA'], options: ['CO', 'MI', 'DA', 'DE', 'LO'] },
  { id: '6', word: 'ARROZ', icon: '🍚', category: 'ALIMENTOS', syllables: ['AR', 'ROZ'], options: ['AR', 'ROZ', 'AL', 'LUZ'] },
  { id: '7', word: 'BANANA', icon: '🍌', category: 'ALIMENTOS', syllables: ['BA', 'NA', 'NA'], options: ['BA', 'NA', 'NA', 'MA', 'LA'] },
  { id: '8', word: 'MAÇÃ', icon: '🍎', category: 'ALIMENTOS', syllables: ['MA', 'ÇÃ'], options: ['MA', 'ÇÃ', 'PA', 'SÃ'] },
  { id: '9', word: 'LEITE', icon: '🥛', category: 'ALIMENTOS', syllables: ['LEI', 'TE'], options: ['LEI', 'TE', 'BOI', 'PE'] },
  { id: '10', word: 'BOLO', icon: '🎂', category: 'ALIMENTOS', syllables: ['BO', 'LO'], options: ['BO', 'LO', 'TO', 'PO'] },

  // --- ANIMAIS ---
  { id: '11', word: 'PITOCO', icon: '🐶', category: 'ANIMAIS', syllables: ['PI', 'TO', 'CO'], options: ['PI', 'TO', 'CO', 'BA', 'LA'] },
  { id: '12', word: 'NINA', icon: '🐱', category: 'ANIMAIS', syllables: ['NI', 'NA'], options: ['NI', 'NA', 'MI', 'MA'] },
  { id: '13', word: 'GATO', icon: '🐈', category: 'ANIMAIS', syllables: ['GA', 'TO'], options: ['GA', 'TO', 'PA', 'RO'] },
  { id: '14', word: 'SAPO', icon: '🐸', category: 'ANIMAIS', syllables: ['SA', 'PO'], options: ['SA', 'PO', 'LA', 'CO'] },
  { id: '15', word: 'PEIXE', icon: '🐟', category: 'ANIMAIS', syllables: ['PEI', 'XE'], options: ['PEI', 'XE', 'TEI', 'ZE'] },
  { id: '16', word: 'PATO', icon: '🦆', category: 'ANIMAIS', syllables: ['PA', 'TO'], options: ['PA', 'TO', 'MA', 'SO'] },
  { id: '17', word: 'LEÃO', icon: '🦁', category: 'ANIMAIS', syllables: ['LE', 'ÃO'], options: ['LE', 'ÃO', 'ME', 'CÃO'] },
  { id: '18', word: 'VACA', icon: '🐮', category: 'ANIMAIS', syllables: ['VA', 'CA'], options: ['VA', 'CA', 'MA', 'FA'] },

  // --- OBJETOS ---
  { id: '19', word: 'TELEVISÃO', icon: '📺', category: 'OBJETOS', syllables: ['TE', 'LE', 'VI', 'SÃO'], options: ['TE', 'LE', 'VI', 'SÃO', 'SO', 'CA'] },
  { id: '20', word: 'CELULAR', icon: '📱', category: 'OBJETOS', syllables: ['CE', 'LU', 'LAR'], options: ['CE', 'LU', 'LAR', 'RA', 'BO'] },
  { id: '21', word: 'BOLA', icon: '⚽', category: 'OBJETOS', syllables: ['BO', 'LA'], options: ['BO', 'LA', 'CO', 'SA'] },
  { id: '22', word: 'CASA', icon: '🏠', category: 'OBJETOS', syllables: ['CA', 'SA'], options: ['CA', 'SA', 'MA', 'PA'] },
  { id: '23', word: 'LIVRO', icon: '📖', category: 'OBJETOS', syllables: ['LI', 'VRO'], options: ['LI', 'VRO', 'VI', 'BRO'] },
  { id: '24', word: 'CARRO', icon: '🚗', category: 'OBJETOS', syllables: ['CAR', 'RO'], options: ['CAR', 'RO', 'BAR', 'TO'] },

  // --- NATUREZA ---
  { id: '25', word: 'SOL', icon: '☀️', category: 'NATUREZA', syllables: ['SOL'], options: ['SOL', 'SAL', 'GOL', 'LUA'] },
  { id: '26', word: 'LUA', icon: '🌙', category: 'NATUREZA', syllables: ['LU', 'A'], options: ['LU', 'A', 'RU', 'O'] },
  { id: '27', word: 'FLOR', icon: '🌸', category: 'NATUREZA', syllables: ['FLOR'], options: ['FLOR', 'DOR', 'COR', 'MAR'] }
];
