'use client';

import { speak } from '@/utils/speech';
import { playClickSound } from '@/utils/sfx';

export interface LevelStage {
  level: number;
  title: string;
  category: string;
  icon: string;
  description: string;
  minXpRequired: number;
}

export const STAGES_LIST: LevelStage[] = [
  { level: 1, title: 'Iniciação das Vogais', category: 'A, E, I, O, U', icon: '🌱', description: 'Reconhecendo os sons fundamentais da fala.', minXpRequired: 0 },
  { level: 2, title: 'Família do B e C', category: 'BA, BE, CA, CO', icon: '🪵', description: 'Construindo as primeiras sílabas simples.', minXpRequired: 100 },
  { level: 3, title: 'Alimentos do Dia a Dia', category: 'PÃO, CAFÉ, ARROZ', icon: '🍞', description: 'Lendo o que comemos e bebemos.', minXpRequired: 200 },
  { level: 4, title: 'O Mundo dos Animais', category: 'GATO, SAPO, PEIXE', icon: '🐾', description: 'Identificando sílabas de seres vivos.', minXpRequired: 300 },
  { level: 5, title: 'Cores e Natureza', category: 'AZUL, VERDE, SOL, LUA', icon: '🌈', description: 'Reconhecendo o ambiente ao redor.', minXpRequired: 400 },
  { level: 6, title: 'Encontros Consonantais', category: 'TRA, BRA, PRO', icon: '⚡', description: 'Desbravando sílabas compostas.', minXpRequired: 500 },
  { level: 7, title: 'Cidadania & Comunidade', category: 'ÔNIBUS, BANCO, POSTO', icon: '🏙️', description: 'Leitura prática de placas e serviços.', minXpRequired: 650 },
  { level: 8, title: 'Mundo do Trabalho', category: 'TRABALHO, SALÁRIO', icon: '💼', description: 'Autonomia para a vida e profissão.', minXpRequired: 800 },
  { level: 9, title: 'Leitura Fluente', category: 'Palavras de 4 Sílabas', icon: '📖', description: 'Leitura rápida sem hesitação.', minXpRequired: 1000 },
  { level: 10, title: 'Mestre da Alfabetização', category: 'Graduação Completa', icon: '👑', description: 'Domínio total do princípio alfabético!', minXpRequired: 1200 },
];

interface LearningTrailModalProps {
  currentXp: number;
  userLevel: number;
  onClose: () => void;
}

export default function LearningTrailModal({
  currentXp,
  userLevel,
  onClose
}: LearningTrailModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-pop select-none">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-emerald-400 flex flex-col max-h-[85vh]">
        {/* Topo */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🗺️</span>
            <div>
              <h3 className="text-xl font-black text-slate-800">Trilha do Conhecimento</h3>
              <p className="text-xs text-slate-500 font-bold">Progressão pedagógica por níveis</p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Status Atual */}
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex justify-between items-center my-2">
          <div>
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">Seu Nível Atual</span>
            <h4 className="text-lg font-black text-emerald-950">Nível {userLevel} • {currentXp} XP</h4>
          </div>
          <span className="text-3xl">🎖️</span>
        </div>

        {/* Lista de Fases em Trilha */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-1 my-2">
          {STAGES_LIST.map((stage) => {
            const isUnlocked = currentXp >= stage.minXpRequired;
            const isCurrent = userLevel === stage.level;

            return (
              <div
                key={stage.level}
                onClick={() => {
                  playClickSound();
                  speak(`Fase ${stage.level}: ${stage.title}. ${stage.description}`);
                }}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-50 border-amber-400 shadow-md scale-102 ring-2 ring-amber-300'
                    : isUnlocked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black ${
                    isCurrent
                      ? 'bg-amber-400 text-amber-950 animate-bounce-subtle'
                      : isUnlocked
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isUnlocked ? stage.icon : '🔒'}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Fase {stage.level} {isCurrent && '• ATUAL 🔥'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {stage.minXpRequired} XP
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-slate-800">{stage.title}</h4>
                  <p className="text-xs text-slate-500">{stage.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="mt-3 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-base transition border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 cursor-pointer"
        >
          VOLTAR AO JOGO 🎮
        </button>
      </div>
    </div>
  );
}
