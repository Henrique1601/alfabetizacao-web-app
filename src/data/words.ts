export type ProfileMode = 'INFANTIL' | 'EJA';

export type WordCategory = 
  | 'TODOS' 
  // Categorias Infantis / Gerais
  | 'ALIMENTOS' 
  | 'ANIMAIS' 
  | 'CORES' 
  | 'BRINQUEDOS' 
  | 'CORPO' 
  | 'OBJETOS' 
  | 'NATUREZA'
  // Categorias EJA / Adultos (Cidadania & Cotidiano)
  | 'TRABALHO'
  | 'SAÚDE'
  | 'CIDADE'
  | 'DOCUMENTOS';

export type DifficultyLevel = 'FACIL' | 'MEDIO' | 'DIFICIL';

export interface WordItem {
  id: string;
  word: string;
  icon: string;
  category: WordCategory;
  profile: 'TODOS' | ProfileMode;
  difficulty: DifficultyLevel;
  syllables: string[];
  options: {
    FACIL: string[];
    MEDIO: string[];
    DIFICIL: string[];
  };
}

export const WORDS_DATA: WordItem[] = [
  // ==================== ALIMENTOS (TODOS / INFANTIL) ====================
  { 
    id: '1', word: 'CAFÉ', icon: '☕', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['CA', 'FÉ'],
    options: {
      FACIL: ['CA', 'FÉ', 'BA'],
      MEDIO: ['CA', 'FÉ', 'BA', 'LÓ'],
      DIFICIL: ['CA', 'FÉ', 'BA', 'LÓ', 'PE', 'RA']
    }
  },
  { 
    id: '2', word: 'PÃO', icon: '🍞', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['PÃO'],
    options: {
      FACIL: ['PÃO', 'MÃO'],
      MEDIO: ['PÃO', 'MÃO', 'CÃO', 'NÃO'],
      DIFICIL: ['PÃO', 'MÃO', 'CÃO', 'NÃO', 'VÃO', 'SÃO']
    }
  },
  { 
    id: '3', word: 'MAMÃO', icon: '🥭', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['MA', 'MÃO'],
    options: {
      FACIL: ['MA', 'MÃO', 'PA'],
      MEDIO: ['MA', 'MÃO', 'PA', 'PÃO'],
      DIFICIL: ['MA', 'MÃO', 'PA', 'PÃO', 'LA', 'LÃO']
    }
  },
  { 
    id: '4', word: 'AÇÚCAR', icon: '🍬', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'MEDIO',
    syllables: ['A', 'ÇÚ', 'CAR'],
    options: {
      FACIL: ['A', 'ÇÚ', 'CAR', 'BA'],
      MEDIO: ['A', 'ÇÚ', 'CAR', 'BA', 'RA'],
      DIFICIL: ['A', 'ÇÚ', 'CAR', 'BA', 'RA', 'MA', 'LÁ']
    }
  },
  { 
    id: '5', word: 'COMIDA', icon: '🍲', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'MEDIO',
    syllables: ['CO', 'MI', 'DA'],
    options: {
      FACIL: ['CO', 'MI', 'DA', 'DE'],
      MEDIO: ['CO', 'MI', 'DA', 'DE', 'LO'],
      DIFICIL: ['CO', 'MI', 'DA', 'DE', 'LO', 'BA', 'RU']
    }
  },
  { 
    id: '6', word: 'ARROZ', icon: '🍚', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'MEDIO',
    syllables: ['AR', 'ROZ'],
    options: {
      FACIL: ['AR', 'ROZ', 'AL'],
      MEDIO: ['AR', 'ROZ', 'AL', 'LUZ'],
      DIFICIL: ['AR', 'ROZ', 'AL', 'LUZ', 'PAZ', 'VOZ']
    }
  },
  { 
    id: '7', word: 'BANANA', icon: '🍌', category: 'ALIMENTOS', profile: 'INFANTIL', difficulty: 'MEDIO',
    syllables: ['BA', 'NA', 'NA'],
    options: {
      FACIL: ['BA', 'NA', 'MA'],
      MEDIO: ['BA', 'NA', 'MA', 'LA', 'PA'],
      DIFICIL: ['BA', 'NA', 'MA', 'LA', 'PA', 'TA', 'DA']
    }
  },
  { 
    id: '8', word: 'MAÇÃ', icon: '🍎', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['MA', 'ÇÃ'],
    options: {
      FACIL: ['MA', 'ÇÃ', 'PA'],
      MEDIO: ['MA', 'ÇÃ', 'PA', 'SÃ'],
      DIFICIL: ['MA', 'ÇÃ', 'PA', 'SÃ', 'LA', 'RÃ']
    }
  },
  { 
    id: '9', word: 'LEITE', icon: '🥛', category: 'ALIMENTOS', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['LEI', 'TE'],
    options: {
      FACIL: ['LEI', 'TE', 'PE'],
      MEDIO: ['LEI', 'TE', 'BOI', 'PE'],
      DIFICIL: ['LEI', 'TE', 'BOI', 'PE', 'SEI', 'RE']
    }
  },
  { 
    id: '10', word: 'BOLO', icon: '🎂', category: 'ALIMENTOS', profile: 'INFANTIL', difficulty: 'FACIL',
    syllables: ['BO', 'LO'],
    options: {
      FACIL: ['BO', 'LO', 'TO'],
      MEDIO: ['BO', 'LO', 'TO', 'PO'],
      DIFICIL: ['BO', 'LO', 'TO', 'PO', 'CO', 'DO']
    }
  },

  // ==================== ANIMAIS (INFANTIL) ====================
  { 
    id: '11', word: 'PITOCO', icon: '🐶', category: 'ANIMAIS', profile: 'INFANTIL', difficulty: 'MEDIO',
    syllables: ['PI', 'TO', 'CO'],
    options: {
      FACIL: ['PI', 'TO', 'CO', 'BA'],
      MEDIO: ['PI', 'TO', 'CO', 'BA', 'LA'],
      DIFICIL: ['PI', 'TO', 'CO', 'BA', 'LA', 'ME', 'RO']
    }
  },
  { 
    id: '12', word: 'NINA', icon: '🐱', category: 'ANIMAIS', profile: 'INFANTIL', difficulty: 'FACIL',
    syllables: ['NI', 'NA'],
    options: {
      FACIL: ['NI', 'NA', 'MI'],
      MEDIO: ['NI', 'NA', 'MI', 'MA'],
      DIFICIL: ['NI', 'NA', 'MI', 'MA', 'LI', 'LA']
    }
  },
  { 
    id: '13', word: 'GATO', icon: '🐈', category: 'ANIMAIS', profile: 'INFANTIL', difficulty: 'FACIL',
    syllables: ['GA', 'TO'],
    options: {
      FACIL: ['GA', 'TO', 'PA'],
      MEDIO: ['GA', 'TO', 'PA', 'RO'],
      DIFICIL: ['GA', 'TO', 'PA', 'RO', 'MA', 'LO']
    }
  },
  { 
    id: '14', word: 'SAPO', icon: '🐸', category: 'ANIMAIS', profile: 'INFANTIL', difficulty: 'FACIL',
    syllables: ['SA', 'PO'],
    options: {
      FACIL: ['SA', 'PO', 'LA'],
      MEDIO: ['SA', 'PO', 'LA', 'CO'],
      DIFICIL: ['SA', 'PO', 'LA', 'CO', 'MA', 'TO']
    }
  },
  { 
    id: '15', word: 'PEIXE', icon: '🐟', category: 'ANIMAIS', profile: 'INFANTIL', difficulty: 'MEDIO',
    syllables: ['PEI', 'XE'],
    options: {
      FACIL: ['PEI', 'XE', 'TEI'],
      MEDIO: ['PEI', 'XE', 'TEI', 'ZE'],
      DIFICIL: ['PEI', 'XE', 'TEI', 'ZE', 'LEI', 'FE']
    }
  },
  { 
    id: '16', word: 'PATO', icon: '🦆', category: 'ANIMAIS', profile: 'INFANTIL', difficulty: 'FACIL',
    syllables: ['PA', 'TO'],
    options: {
      FACIL: ['PA', 'TO', 'MA'],
      MEDIO: ['PA', 'TO', 'MA', 'SO'],
      DIFICIL: ['PA', 'TO', 'MA', 'SO', 'BA', 'CO']
    }
  },

  // ==================== CORES & BRINQUEDOS (INFANTIL) ====================
  { 
    id: '17', word: 'AZUL', icon: '🔷', category: 'CORES', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['A', 'ZUL'],
    options: {
      FACIL: ['A', 'ZUL', 'SUL'],
      MEDIO: ['A', 'ZUL', 'SUL', 'O'],
      DIFICIL: ['A', 'ZUL', 'SUL', 'O', 'MEL', 'U']
    }
  },
  { 
    id: '18', word: 'VERDE', icon: '🟩', category: 'CORES', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['VER', 'DE'],
    options: {
      FACIL: ['VER', 'DE', 'TER'],
      MEDIO: ['VER', 'DE', 'TER', 'TE'],
      DIFICIL: ['VER', 'DE', 'TER', 'TE', 'SER', 'BE']
    }
  },
  { 
    id: '19', word: 'URSO', icon: '🧸', category: 'BRINQUEDOS', profile: 'INFANTIL', difficulty: 'FACIL',
    syllables: ['UR', 'SO'],
    options: {
      FACIL: ['UR', 'SO', 'AR'],
      MEDIO: ['UR', 'SO', 'AR', 'ZO'],
      DIFICIL: ['UR', 'SO', 'AR', 'ZO', 'OR', 'SE']
    }
  },
  { 
    id: '20', word: 'ROBÔ', icon: '🤖', category: 'BRINQUEDOS', profile: 'INFANTIL', difficulty: 'FACIL',
    syllables: ['RO', 'BÔ'],
    options: {
      FACIL: ['RO', 'BÔ', 'PO'],
      MEDIO: ['RO', 'BÔ', 'PO', 'LÔ'],
      DIFICIL: ['RO', 'BÔ', 'PO', 'LÔ', 'TO', 'DÔ']
    }
  },

  // ==================== MODO EJA: TRABALHO & COTIDIANO ====================
  { 
    id: '21', word: 'TRABALHO', icon: '💼', category: 'TRABALHO', profile: 'EJA', difficulty: 'MEDIO',
    syllables: ['TRA', 'BA', 'LHO'],
    options: {
      FACIL: ['TRA', 'BA', 'LHO', 'PRA'],
      MEDIO: ['TRA', 'BA', 'LHO', 'PRA', 'LHA'],
      DIFICIL: ['TRA', 'BA', 'LHO', 'PRA', 'LHA', 'GRA', 'LHO']
    }
  },
  { 
    id: '22', word: 'SALÁRIO', icon: '💵', category: 'TRABALHO', profile: 'EJA', difficulty: 'MEDIO',
    syllables: ['SA', 'LÁ', 'RIO'],
    options: {
      FACIL: ['SA', 'LÁ', 'RIO', 'RA'],
      MEDIO: ['SA', 'LÁ', 'RIO', 'RA', 'LIO'],
      DIFICIL: ['SA', 'LÁ', 'RIO', 'RA', 'LIO', 'MA', 'RUA']
    }
  },
  { 
    id: '23', word: 'OBRA', icon: '🧱', category: 'TRABALHO', profile: 'EJA', difficulty: 'FACIL',
    syllables: ['O', 'BRA'],
    options: {
      FACIL: ['O', 'BRA', 'PRA'],
      MEDIO: ['O', 'BRA', 'PRA', 'A'],
      DIFICIL: ['O', 'BRA', 'PRA', 'A', 'GRA', 'E']
    }
  },
  { 
    id: '24', word: 'CONTRATO', icon: '📄', category: 'TRABALHO', profile: 'EJA', difficulty: 'DIFICIL',
    syllables: ['CON', 'TRA', 'TO'],
    options: {
      FACIL: ['CON', 'TRA', 'TO', 'BON'],
      MEDIO: ['CON', 'TRA', 'TO', 'BON', 'PRA'],
      DIFICIL: ['CON', 'TRA', 'TO', 'BON', 'PRA', 'RO', 'MON']
    }
  },

  // ==================== MODO EJA: SAÚDE & CUIDADOS ====================
  { 
    id: '25', word: 'SAÚDE', icon: '🩺', category: 'SAÚDE', profile: 'EJA', difficulty: 'FACIL',
    syllables: ['SA', 'Ú', 'DE'],
    options: {
      FACIL: ['SA', 'Ú', 'DE', 'DA'],
      MEDIO: ['SA', 'Ú', 'DE', 'DA', 'I'],
      DIFICIL: ['SA', 'Ú', 'DE', 'DA', 'I', 'LA', 'TE']
    }
  },
  { 
    id: '26', word: 'REMÉDIO', icon: '💊', category: 'SAÚDE', profile: 'EJA', difficulty: 'MEDIO',
    syllables: ['RE', 'MÉ', 'DIO'],
    options: {
      FACIL: ['RE', 'MÉ', 'DIO', 'DE'],
      MEDIO: ['RE', 'MÉ', 'DIO', 'DE', 'ME'],
      DIFICIL: ['RE', 'MÉ', 'DIO', 'DE', 'ME', 'RIO', 'LE']
    }
  },
  { 
    id: '27', word: 'POSTO', icon: '🏥', category: 'SAÚDE', profile: 'EJA', difficulty: 'FACIL',
    syllables: ['POS', 'TO'],
    options: {
      FACIL: ['POS', 'TO', 'MOS'],
      MEDIO: ['POS', 'TO', 'MOS', 'TA'],
      DIFICIL: ['POS', 'TO', 'MOS', 'TA', 'TOS', 'PA']
    }
  },
  { 
    id: '28', word: 'RECEITA', icon: '📝', category: 'SAÚDE', profile: 'EJA', difficulty: 'MEDIO',
    syllables: ['RE', 'CEI', 'TA'],
    options: {
      FACIL: ['RE', 'CEI', 'TA', 'SEI'],
      MEDIO: ['RE', 'CEI', 'TA', 'SEI', 'TE'],
      DIFICIL: ['RE', 'CEI', 'TA', 'SEI', 'TE', 'LEI', 'RA']
    }
  },

  // ==================== MODO EJA: CIDADE & TRANSPORTE ====================
  { 
    id: '29', word: 'ÔNIBUS', icon: '🚌', category: 'CIDADE', profile: 'EJA', difficulty: 'MEDIO',
    syllables: ['Ô', 'NI', 'BUS'],
    options: {
      FACIL: ['Ô', 'NI', 'BUS', 'A'],
      MEDIO: ['Ô', 'NI', 'BUS', 'A', 'LI'],
      DIFICIL: ['Ô', 'NI', 'BUS', 'A', 'LI', 'MUS', 'E']
    }
  },
  { 
    id: '30', word: 'METRÔ', icon: '🚇', category: 'CIDADE', profile: 'EJA', difficulty: 'FACIL',
    syllables: ['ME', 'TRÔ'],
    options: {
      FACIL: ['ME', 'TRÔ', 'PRÔ'],
      MEDIO: ['ME', 'TRÔ', 'PRÔ', 'NE'],
      DIFICIL: ['ME', 'TRÔ', 'PRÔ', 'NE', 'TRO', 'TE']
    }
  },
  { 
    id: '31', word: 'RUA', icon: '🛣️', category: 'CIDADE', profile: 'TODOS', difficulty: 'FACIL',
    syllables: ['RU', 'A'],
    options: {
      FACIL: ['RU', 'A', 'LU'],
      MEDIO: ['RU', 'A', 'LU', 'O'],
      DIFICIL: ['RU', 'A', 'LU', 'O', 'MU', 'E']
    }
  },
  { 
    id: '32', word: 'MERCADO', icon: '🛒', category: 'CIDADE', profile: 'EJA', difficulty: 'MEDIO',
    syllables: ['MER', 'CA', 'DO'],
    options: {
      FACIL: ['MER', 'CA', 'DO', 'TER'],
      MEDIO: ['MER', 'CA', 'DO', 'TER', 'DA'],
      DIFICIL: ['MER', 'CA', 'DO', 'TER', 'DA', 'SER', 'DE']
    }
  },

  // ==================== MODO EJA: DOCUMENTOS & CIDADANIA ====================
  { 
    id: '33', word: 'BANCO', icon: '🏦', category: 'DOCUMENTOS', profile: 'EJA', difficulty: 'FACIL',
    syllables: ['BAN', 'CO'],
    options: {
      FACIL: ['BAN', 'CO', 'MAN'],
      MEDIO: ['BAN', 'CO', 'MAN', 'CA'],
      DIFICIL: ['BAN', 'CO', 'MAN', 'CA', 'TAN', 'BO']
    }
  },
  { 
    id: '34', word: 'CONTA', icon: '🧾', category: 'DOCUMENTOS', profile: 'EJA', difficulty: 'FACIL',
    syllables: ['CON', 'TA'],
    options: {
      FACIL: ['CON', 'TA', 'PON'],
      MEDIO: ['CON', 'TA', 'PON', 'TE'],
      DIFICIL: ['CON', 'TA', 'PON', 'TE', 'MON', 'TO']
    }
  },
  { 
    id: '35', word: 'CARTÃO', icon: '💳', category: 'DOCUMENTOS', profile: 'EJA', difficulty: 'MEDIO',
    syllables: ['CAR', 'TÃO'],
    options: {
      FACIL: ['CAR', 'TÃO', 'BAR'],
      MEDIO: ['CAR', 'TÃO', 'BAR', 'PÃO'],
      DIFICIL: ['CAR', 'TÃO', 'BAR', 'PÃO', 'TAR', 'LÃO']
    }
  },
  { 
    id: '36', word: 'VOTO', icon: '🗳️', category: 'DOCUMENTOS', profile: 'EJA', difficulty: 'FACIL',
    syllables: ['VO', 'TO'],
    options: {
      FACIL: ['VO', 'TO', 'PO'],
      MEDIO: ['VO', 'TO', 'PO', 'TA'],
      DIFICIL: ['VO', 'TO', 'PO', 'TA', 'BO', 'TE']
    }
  }
];
