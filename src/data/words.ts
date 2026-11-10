export type WordCategory = 
  | 'TODOS' 
  | 'ALIMENTOS' 
  | 'ANIMAIS' 
  | 'OBJETOS' 
  | 'NATUREZA' 
  | 'CORES' 
  | 'BRINQUEDOS' 
  | 'CORPO' 
  | 'PROFISSÕES';

export type DifficultyLevel = 'FACIL' | 'MEDIO' | 'DIFICIL';

export interface WordItem {
  id: string;
  word: string;
  icon: string;
  category: WordCategory;
  difficulty: DifficultyLevel;
  syllables: string[];
  options: {
    FACIL: string[];    // Sílabas corretas + 1 ou 2 distratores
    MEDIO: string[];    // Sílabas corretas + 3 distratores
    DIFICIL: string[];  // Sílabas corretas + 4 ou 5 distratores desafiadores
  };
}

export const WORDS_DATA: WordItem[] = [
  // ==================== ALIMENTOS ====================
  { 
    id: '1', word: 'CAFÉ', icon: '☕', category: 'ALIMENTOS', difficulty: 'FACIL',
    syllables: ['CA', 'FÉ'],
    options: {
      FACIL: ['CA', 'FÉ', 'BA'],
      MEDIO: ['CA', 'FÉ', 'BA', 'LÓ'],
      DIFICIL: ['CA', 'FÉ', 'BA', 'LÓ', 'PE', 'RA']
    }
  },
  { 
    id: '2', word: 'PÃO', icon: '🍞', category: 'ALIMENTOS', difficulty: 'FACIL',
    syllables: ['PÃO'],
    options: {
      FACIL: ['PÃO', 'MÃO'],
      MEDIO: ['PÃO', 'MÃO', 'CÃO', 'NÃO'],
      DIFICIL: ['PÃO', 'MÃO', 'CÃO', 'NÃO', 'VÃO', 'SÃO']
    }
  },
  { 
    id: '3', word: 'MAMÃO', icon: '🥭', category: 'ALIMENTOS', difficulty: 'FACIL',
    syllables: ['MA', 'MÃO'],
    options: {
      FACIL: ['MA', 'MÃO', 'PA'],
      MEDIO: ['MA', 'MÃO', 'PA', 'PÃO'],
      DIFICIL: ['MA', 'MÃO', 'PA', 'PÃO', 'LA', 'LÃO']
    }
  },
  { 
    id: '4', word: 'AÇÚCAR', icon: '🍬', category: 'ALIMENTOS', difficulty: 'MEDIO',
    syllables: ['A', 'ÇÚ', 'CAR'],
    options: {
      FACIL: ['A', 'ÇÚ', 'CAR', 'BA'],
      MEDIO: ['A', 'ÇÚ', 'CAR', 'BA', 'RA'],
      DIFICIL: ['A', 'ÇÚ', 'CAR', 'BA', 'RA', 'MA', 'LÁ']
    }
  },
  { 
    id: '5', word: 'COMIDA', icon: '🍲', category: 'ALIMENTOS', difficulty: 'MEDIO',
    syllables: ['CO', 'MI', 'DA'],
    options: {
      FACIL: ['CO', 'MI', 'DA', 'DE'],
      MEDIO: ['CO', 'MI', 'DA', 'DE', 'LO'],
      DIFICIL: ['CO', 'MI', 'DA', 'DE', 'LO', 'BA', 'RU']
    }
  },
  { 
    id: '6', word: 'ARROZ', icon: '🍚', category: 'ALIMENTOS', difficulty: 'MEDIO',
    syllables: ['AR', 'ROZ'],
    options: {
      FACIL: ['AR', 'ROZ', 'AL'],
      MEDIO: ['AR', 'ROZ', 'AL', 'LUZ'],
      DIFICIL: ['AR', 'ROZ', 'AL', 'LUZ', 'PAZ', 'VOZ']
    }
  },
  { 
    id: '7', word: 'BANANA', icon: '🍌', category: 'ALIMENTOS', difficulty: 'MEDIO',
    syllables: ['BA', 'NA', 'NA'],
    options: {
      FACIL: ['BA', 'NA', 'MA'],
      MEDIO: ['BA', 'NA', 'MA', 'LA', 'PA'],
      DIFICIL: ['BA', 'NA', 'MA', 'LA', 'PA', 'TA', 'DA']
    }
  },
  { 
    id: '8', word: 'MAÇÃ', icon: '🍎', category: 'ALIMENTOS', difficulty: 'FACIL',
    syllables: ['MA', 'ÇÃ'],
    options: {
      FACIL: ['MA', 'ÇÃ', 'PA'],
      MEDIO: ['MA', 'ÇÃ', 'PA', 'SÃ'],
      DIFICIL: ['MA', 'ÇÃ', 'PA', 'SÃ', 'LA', 'RÃ']
    }
  },
  { 
    id: '9', word: 'LEITE', icon: '🥛', category: 'ALIMENTOS', difficulty: 'FACIL',
    syllables: ['LEI', 'TE'],
    options: {
      FACIL: ['LEI', 'TE', 'PE'],
      MEDIO: ['LEI', 'TE', 'BOI', 'PE'],
      DIFICIL: ['LEI', 'TE', 'BOI', 'PE', 'SEI', 'RE']
    }
  },
  { 
    id: '10', word: 'BOLO', icon: '🎂', category: 'ALIMENTOS', difficulty: 'FACIL',
    syllables: ['BO', 'LO'],
    options: {
      FACIL: ['BO', 'LO', 'TO'],
      MEDIO: ['BO', 'LO', 'TO', 'PO'],
      DIFICIL: ['BO', 'LO', 'TO', 'PO', 'CO', 'DO']
    }
  },

  // ==================== ANIMAIS ====================
  { 
    id: '11', word: 'PITOCO', icon: '🐶', category: 'ANIMAIS', difficulty: 'MEDIO',
    syllables: ['PI', 'TO', 'CO'],
    options: {
      FACIL: ['PI', 'TO', 'CO', 'BA'],
      MEDIO: ['PI', 'TO', 'CO', 'BA', 'LA'],
      DIFICIL: ['PI', 'TO', 'CO', 'BA', 'LA', 'ME', 'RO']
    }
  },
  { 
    id: '12', word: 'NINA', icon: '🐱', category: 'ANIMAIS', difficulty: 'FACIL',
    syllables: ['NI', 'NA'],
    options: {
      FACIL: ['NI', 'NA', 'MI'],
      MEDIO: ['NI', 'NA', 'MI', 'MA'],
      DIFICIL: ['NI', 'NA', 'MI', 'MA', 'LI', 'LA']
    }
  },
  { 
    id: '13', word: 'GATO', icon: '🐈', category: 'ANIMAIS', difficulty: 'FACIL',
    syllables: ['GA', 'TO'],
    options: {
      FACIL: ['GA', 'TO', 'PA'],
      MEDIO: ['GA', 'TO', 'PA', 'RO'],
      DIFICIL: ['GA', 'TO', 'PA', 'RO', 'MA', 'LO']
    }
  },
  { 
    id: '14', word: 'SAPO', icon: '🐸', category: 'ANIMAIS', difficulty: 'FACIL',
    syllables: ['SA', 'PO'],
    options: {
      FACIL: ['SA', 'PO', 'LA'],
      MEDIO: ['SA', 'PO', 'LA', 'CO'],
      DIFICIL: ['SA', 'PO', 'LA', 'CO', 'MA', 'TO']
    }
  },
  { 
    id: '15', word: 'PEIXE', icon: '🐟', category: 'ANIMAIS', difficulty: 'MEDIO',
    syllables: ['PEI', 'XE'],
    options: {
      FACIL: ['PEI', 'XE', 'TEI'],
      MEDIO: ['PEI', 'XE', 'TEI', 'ZE'],
      DIFICIL: ['PEI', 'XE', 'TEI', 'ZE', 'LEI', 'FE']
    }
  },
  { 
    id: '16', word: 'PATO', icon: '🦆', category: 'ANIMAIS', difficulty: 'FACIL',
    syllables: ['PA', 'TO'],
    options: {
      FACIL: ['PA', 'TO', 'MA'],
      MEDIO: ['PA', 'TO', 'MA', 'SO'],
      DIFICIL: ['PA', 'TO', 'MA', 'SO', 'BA', 'CO']
    }
  },
  { 
    id: '17', word: 'LEÃO', icon: '🦁', category: 'ANIMAIS', difficulty: 'FACIL',
    syllables: ['LE', 'ÃO'],
    options: {
      FACIL: ['LE', 'ÃO', 'ME'],
      MEDIO: ['LE', 'ÃO', 'ME', 'CÃO'],
      DIFICIL: ['LE', 'ÃO', 'ME', 'CÃO', 'PÃO', 'TE']
    }
  },
  { 
    id: '18', word: 'VACA', icon: '🐮', category: 'ANIMAIS', difficulty: 'FACIL',
    syllables: ['VA', 'CA'],
    options: {
      FACIL: ['VA', 'CA', 'MA'],
      MEDIO: ['VA', 'CA', 'MA', 'FA'],
      DIFICIL: ['VA', 'CA', 'MA', 'FA', 'LA', 'DA']
    }
  },
  { 
    id: '19', word: 'BORBOLETA', icon: '🦋', category: 'ANIMAIS', difficulty: 'DIFICIL',
    syllables: ['BOR', 'BO', 'LE', 'TA'],
    options: {
      FACIL: ['BOR', 'BO', 'LE', 'TA', 'BA'],
      MEDIO: ['BOR', 'BO', 'LE', 'TA', 'BA', 'TE'],
      DIFICIL: ['BOR', 'BO', 'LE', 'TA', 'BA', 'TE', 'LAR', 'PA']
    }
  },
  { 
    id: '20', word: 'TARTARUGA', icon: '🐢', category: 'ANIMAIS', difficulty: 'DIFICIL',
    syllables: ['TAR', 'TA', 'RU', 'GA'],
    options: {
      FACIL: ['TAR', 'TA', 'RU', 'GA', 'MAR'],
      MEDIO: ['TAR', 'TA', 'RU', 'GA', 'MAR', 'LA'],
      DIFICIL: ['TAR', 'TA', 'RU', 'GA', 'MAR', 'LA', 'GU', 'RA']
    }
  },

  // ==================== OBJETOS ====================
  { 
    id: '21', word: 'TELEVISÃO', icon: '📺', category: 'OBJETOS', difficulty: 'DIFICIL',
    syllables: ['TE', 'LE', 'VI', 'SÃO'],
    options: {
      FACIL: ['TE', 'LE', 'VI', 'SÃO', 'SO'],
      MEDIO: ['TE', 'LE', 'VI', 'SÃO', 'SO', 'CA'],
      DIFICIL: ['TE', 'LE', 'VI', 'SÃO', 'SO', 'CA', 'MA', 'LÃO']
    }
  },
  { 
    id: '22', word: 'CELULAR', icon: '📱', category: 'OBJETOS', difficulty: 'MEDIO',
    syllables: ['CE', 'LU', 'LAR'],
    options: {
      FACIL: ['CE', 'LU', 'LAR', 'RA'],
      MEDIO: ['CE', 'LU', 'LAR', 'RA', 'BO'],
      DIFICIL: ['CE', 'LU', 'LAR', 'RA', 'BO', 'SE', 'MAR']
    }
  },
  { 
    id: '23', word: 'BOLA', icon: '⚽', category: 'OBJETOS', difficulty: 'FACIL',
    syllables: ['BO', 'LA'],
    options: {
      FACIL: ['BO', 'LA', 'CO'],
      MEDIO: ['BO', 'LA', 'CO', 'SA'],
      DIFICIL: ['BO', 'LA', 'CO', 'SA', 'MA', 'TA']
    }
  },
  { 
    id: '24', word: 'CASA', icon: '🏠', category: 'OBJETOS', difficulty: 'FACIL',
    syllables: ['CA', 'SA'],
    options: {
      FACIL: ['CA', 'SA', 'MA'],
      MEDIO: ['CA', 'SA', 'MA', 'PA'],
      DIFICIL: ['CA', 'SA', 'MA', 'PA', 'LA', 'RA']
    }
  },
  { 
    id: '25', word: 'LIVRO', icon: '📖', category: 'OBJETOS', difficulty: 'MEDIO',
    syllables: ['LI', 'VRO'],
    options: {
      FACIL: ['LI', 'VRO', 'VI'],
      MEDIO: ['LI', 'VRO', 'VI', 'BRO'],
      DIFICIL: ['LI', 'VRO', 'VI', 'BRO', 'MI', 'CRO']
    }
  },
  { 
    id: '26', word: 'CARRO', icon: '🚗', category: 'OBJETOS', difficulty: 'MEDIO',
    syllables: ['CAR', 'RO'],
    options: {
      FACIL: ['CAR', 'RO', 'BAR'],
      MEDIO: ['CAR', 'RO', 'BAR', 'TO'],
      DIFICIL: ['CAR', 'RO', 'BAR', 'TO', 'MAR', 'SO']
    }
  },
  { 
    id: '27', word: 'COMPUTADOR', icon: '💻', category: 'OBJETOS', difficulty: 'DIFICIL',
    syllables: ['COM', 'PU', 'TA', 'DOR'],
    options: {
      FACIL: ['COM', 'PU', 'TA', 'DOR', 'TE'],
      MEDIO: ['COM', 'PU', 'TA', 'DOR', 'TE', 'BO'],
      DIFICIL: ['COM', 'PU', 'TA', 'DOR', 'TE', 'BO', 'MAR', 'DO']
    }
  },

  // ==================== NATUREZA ====================
  { 
    id: '28', word: 'SOL', icon: '☀️', category: 'NATUREZA', difficulty: 'FACIL',
    syllables: ['SOL'],
    options: {
      FACIL: ['SOL', 'SAL'],
      MEDIO: ['SOL', 'SAL', 'GOL', 'LUA'],
      DIFICIL: ['SOL', 'SAL', 'GOL', 'LUA', 'MEL', 'MAR']
    }
  },
  { 
    id: '29', word: 'LUA', icon: '🌙', category: 'NATUREZA', difficulty: 'FACIL',
    syllables: ['LU', 'A'],
    options: {
      FACIL: ['LU', 'A', 'RU'],
      MEDIO: ['LU', 'A', 'RU', 'O'],
      DIFICIL: ['LU', 'A', 'RU', 'O', 'MU', 'E']
    }
  },
  { 
    id: '30', word: 'FLOR', icon: '🌸', category: 'NATUREZA', difficulty: 'FACIL',
    syllables: ['FLOR'],
    options: {
      FACIL: ['FLOR', 'DOR'],
      MEDIO: ['FLOR', 'DOR', 'COR', 'MAR'],
      DIFICIL: ['FLOR', 'DOR', 'COR', 'MAR', 'AMOR', 'LUZ']
    }
  },
  { 
    id: '31', word: 'ÁRVORE', icon: '🌳', category: 'NATUREZA', difficulty: 'MEDIO',
    syllables: ['ÁR', 'VO', 'RE'],
    options: {
      FACIL: ['ÁR', 'VO', 'RE', 'AL'],
      MEDIO: ['ÁR', 'VO', 'RE', 'AL', 'VE'],
      DIFICIL: ['ÁR', 'VO', 'RE', 'AL', 'VE', 'MAR', 'TE']
    }
  },
  { 
    id: '32', word: 'ESTRELA', icon: '⭐', category: 'NATUREZA', difficulty: 'MEDIO',
    syllables: ['ES', 'TRE', 'LA'],
    options: {
      FACIL: ['ES', 'TRE', 'LA', 'AS'],
      MEDIO: ['ES', 'TRE', 'LA', 'AS', 'PRE'],
      DIFICIL: ['ES', 'TRE', 'LA', 'AS', 'PRE', 'MA', 'TRA']
    }
  },

  // ==================== CORES ====================
  { 
    id: '33', word: 'AZUL', icon: '🔷', category: 'CORES', difficulty: 'FACIL',
    syllables: ['A', 'ZUL'],
    options: {
      FACIL: ['A', 'ZUL', 'SUL'],
      MEDIO: ['A', 'ZUL', 'SUL', 'O'],
      DIFICIL: ['A', 'ZUL', 'SUL', 'O', 'MEL', 'U']
    }
  },
  { 
    id: '34', word: 'VERDE', icon: '🟩', category: 'CORES', difficulty: 'FACIL',
    syllables: ['VER', 'DE'],
    options: {
      FACIL: ['VER', 'DE', 'TER'],
      MEDIO: ['VER', 'DE', 'TER', 'TE'],
      DIFICIL: ['VER', 'DE', 'TER', 'TE', 'SER', 'BE']
    }
  },
  { 
    id: '35', word: 'AMARELO', icon: '🟨', category: 'CORES', difficulty: 'MEDIO',
    syllables: ['A', 'MA', 'RE', 'LO'],
    options: {
      FACIL: ['A', 'MA', 'RE', 'LO', 'LA'],
      MEDIO: ['A', 'MA', 'RE', 'LO', 'LA', 'RO'],
      DIFICIL: ['A', 'MA', 'RE', 'LO', 'LA', 'RO', 'ME', 'BA']
    }
  },
  { 
    id: '36', word: 'VERMELHO', icon: '🟥', category: 'CORES', difficulty: 'DIFICIL',
    syllables: ['VER', 'ME', 'LHO'],
    options: {
      FACIL: ['VER', 'ME', 'LHO', 'TER'],
      MEDIO: ['VER', 'ME', 'LHO', 'TER', 'LHO', 'BE'],
      DIFICIL: ['VER', 'ME', 'LHO', 'TER', 'LHO', 'BE', 'SER', 'LHA']
    }
  },

  // ==================== BRINQUEDOS ====================
  { 
    id: '37', word: 'URSO', icon: '🧸', category: 'BRINQUEDOS', difficulty: 'FACIL',
    syllables: ['UR', 'SO'],
    options: {
      FACIL: ['UR', 'SO', 'AR'],
      MEDIO: ['UR', 'SO', 'AR', 'ZO'],
      DIFICIL: ['UR', 'SO', 'AR', 'ZO', 'OR', 'SE']
    }
  },
  { 
    id: '38', word: 'PIPA', icon: '🪁', category: 'BRINQUEDOS', difficulty: 'FACIL',
    syllables: ['PI', 'PA'],
    options: {
      FACIL: ['PI', 'PA', 'BI'],
      MEDIO: ['PI', 'PA', 'BI', 'BA'],
      DIFICIL: ['PI', 'PA', 'BI', 'BA', 'TI', 'MA']
    }
  },
  { 
    id: '39', word: 'BONECA', icon: '🪆', category: 'BRINQUEDOS', difficulty: 'MEDIO',
    syllables: ['BO', 'NE', 'CA'],
    options: {
      FACIL: ['BO', 'NE', 'CA', 'ME'],
      MEDIO: ['BO', 'NE', 'CA', 'ME', 'LA'],
      DIFICIL: ['BO', 'NE', 'CA', 'ME', 'LA', 'PO', 'DA']
    }
  },
  { 
    id: '40', word: 'ROBÔ', icon: '🤖', category: 'BRINQUEDOS', difficulty: 'FACIL',
    syllables: ['RO', 'BÔ'],
    options: {
      FACIL: ['RO', 'BÔ', 'PO'],
      MEDIO: ['RO', 'BÔ', 'PO', 'LÔ'],
      DIFICIL: ['RO', 'BÔ', 'PO', 'LÔ', 'TO', 'DÔ']
    }
  },

  // ==================== CORPO HUMANO ====================
  { 
    id: '41', word: 'BOCA', icon: '👄', category: 'CORPO', difficulty: 'FACIL',
    syllables: ['BO', 'CA'],
    options: {
      FACIL: ['BO', 'CA', 'CO'],
      MEDIO: ['BO', 'CA', 'CO', 'BA'],
      DIFICIL: ['BO', 'CA', 'CO', 'BA', 'PO', 'DA']
    }
  },
  { 
    id: '42', word: 'NARIZ', icon: '👃', category: 'CORPO', difficulty: 'MEDIO',
    syllables: ['NA', 'RIZ'],
    options: {
      FACIL: ['NA', 'RIZ', 'RA'],
      MEDIO: ['NA', 'RIZ', 'RA', 'LUZ'],
      DIFICIL: ['NA', 'RIZ', 'RA', 'LUZ', 'MA', 'PAZ']
    }
  },
  { 
    id: '43', word: 'OLHO', icon: '👁️', category: 'CORPO', difficulty: 'MEDIO',
    syllables: ['O', 'LHO'],
    options: {
      FACIL: ['O', 'LHO', 'A'],
      MEDIO: ['O', 'LHO', 'A', 'LHA'],
      DIFICIL: ['O', 'LHO', 'A', 'LHA', 'E', 'LHE']
    }
  },
  { 
    id: '44', word: 'CABEÇA', icon: '🧒', category: 'CORPO', difficulty: 'MEDIO',
    syllables: ['CA', 'BE', 'ÇA'],
    options: {
      FACIL: ['CA', 'BE', 'ÇA', 'BA'],
      MEDIO: ['CA', 'BE', 'ÇA', 'BA', 'SA'],
      DIFICIL: ['CA', 'BE', 'ÇA', 'BA', 'SA', 'MA', 'PA']
    }
  },

  // ==================== PROFISSÕES ====================
  { 
    id: '45', word: 'MÉDICO', icon: '👨‍⚕️', category: 'PROFISSÕES', difficulty: 'MEDIO',
    syllables: ['MÉ', 'DI', 'CO'],
    options: {
      FACIL: ['MÉ', 'DI', 'CO', 'MI'],
      MEDIO: ['MÉ', 'DI', 'CO', 'MI', 'CA'],
      DIFICIL: ['MÉ', 'DI', 'CO', 'MI', 'CA', 'DE', 'LO']
    }
  },
  { 
    id: '46', word: 'BOMBEIRO', icon: '👨‍🚒', category: 'PROFISSÕES', difficulty: 'DIFICIL',
    syllables: ['BOM', 'BEI', 'RO'],
    options: {
      FACIL: ['BOM', 'BEI', 'RO', 'SOM'],
      MEDIO: ['BOM', 'BEI', 'RO', 'SOM', 'TO'],
      DIFICIL: ['BOM', 'BEI', 'RO', 'SOM', 'TO', 'LEI', 'BAR']
    }
  },
  { 
    id: '47', word: 'PROFESSOR', icon: '👨‍🏫', category: 'PROFISSÕES', difficulty: 'DIFICIL',
    syllables: ['PRO', 'FES', 'SOR'],
    options: {
      FACIL: ['PRO', 'FES', 'SOR', 'PO'],
      MEDIO: ['PRO', 'FES', 'SOR', 'PO', 'TOR'],
      DIFICIL: ['PRO', 'FES', 'SOR', 'PO', 'TOR', 'PRE', 'MES']
    }
  },
  { 
    id: '48', word: 'POLÍCIA', icon: '👮', category: 'PROFISSÕES', difficulty: 'DIFICIL',
    syllables: ['PO', 'LÍ', 'CIA'],
    options: {
      FACIL: ['PO', 'LÍ', 'CIA', 'BO'],
      MEDIO: ['PO', 'LÍ', 'CIA', 'BO', 'DA'],
      DIFICIL: ['PO', 'LÍ', 'CIA', 'BO', 'DA', 'SI', 'MA']
    }
  }
];
