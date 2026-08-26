export interface WordItem {
  id: string;
  word: string;
  icon: string;
  syllables: string[];
  options: string[]; // opções para baralhar no ecrã
}

export const WORDS_DATA: WordItem[] = [
  { id: '1', word: 'CAFÉ', icon: '☕', syllables: ['CA', 'FÉ'], options: ['CA', 'FÉ', 'BA', 'LÓ'] },
  { id: '2', word: 'PÃO', icon: '🍞', syllables: ['PÃO'], options: ['PÃO', 'MÃO', 'CÃO', 'NÃO'] },
  { id: '3', word: 'PITOCO', icon: '🐶', syllables: ['PI', 'TO', 'CO'], options: ['PI', 'TO', 'CO', 'BA', 'LA'] },
  { id: '4', word: 'NINA', icon: '🐱', syllables: ['NI', 'NA'], options: ['NI', 'NA', 'MI', 'MA'] },
  { id: '5', word: 'TELEVISÃO', icon: '📺', syllables: ['TE', 'LE', 'VI', 'SÃO'], options: ['TE', 'LE', 'VI', 'SÃO', 'SO', 'CA'] },
  { id: '6', word: 'CELULAR', icon: '📱', syllables: ['CE', 'LU', 'LAR'], options: ['CE', 'LU', 'LAR', 'RA', 'BO'] },
  { id: '7', word: 'MAMÃO', icon: '🥭', syllables: ['MA', 'MÃO'], options: ['MA', 'MÃO', 'PA', 'PÃO'] },
  { id: '8', word: 'AÇÚCAR', icon: '🍬', syllables: ['A', 'ÇÚ', 'CAR'], options: ['A', 'ÇÚ', 'CAR', 'BA', 'RA'] },
  { id: '9', word: 'COMIDA', icon: '🍲', syllables: ['CO', 'MI', 'DA'], options: ['CO', 'MI', 'DA', 'DE', 'LO'] },
  { id: '10', word: 'ARROZ', icon: '🍚', syllables: ['AR', 'ROZ'], options: ['AR', 'ROZ', 'AL', 'LUZ'] }
];