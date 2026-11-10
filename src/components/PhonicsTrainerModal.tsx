'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { speak } from '@/utils/speech';
import { playClickSound, playErrorSound, playSuccessSound } from '@/utils/sfx';

interface PhonicsExercise {
  targetSyllable: string;
  phonemeSound: string; // Ex: Som emitido pelo narrador
  options: string[];
  exampleWord: string;
}

const PHONICS_DATA: PhonicsExercise[] = [
  { targetSyllable: 'BA', phonemeSound: 'BÁ', options: ['BA', 'DA', 'PA'], exampleWord: 'BANANA' },
  { targetSyllable: 'CA', phonemeSound: 'CÁ', options: ['CA', 'GA', 'SA'], exampleWord: 'CAFÉ' },
  { targetSyllable: 'TRA', phonemeSound: 'TRÁ', options: ['TRA', 'PRA', 'GRA'], exampleWord: 'TRABALHO' },
  { targetSyllable: 'ME', phonemeSound: 'MÉ', options: ['ME', 'NE', 'LE'], exampleWord: 'MÉDICO' },
  { targetSyllable: 'LHO', phonemeSound: 'LHÔ', options: ['LHO', 'LHA', 'RO'], exampleWord: 'OLHO' },
  { targetSyllable: 'PÃO', phonemeSound: 'PÃO', options: ['PÃO', 'MÃO', 'CÃO'], exampleWord: 'PÃO' },
  { targetSyllable: 'SA', phonemeSound: 'SÁ', options: ['SA', 'ZA', 'FA'], exampleWord: 'SAÚDE' },
  { targetSyllable: 'REM', phonemeSound: 'RÊM', options: ['REM', 'SEM', 'BEM'], exampleWord: 'REMÉDIO' },
];

interface PhonicsTrainerModalProps {
  onComplete: (bonusXp: number, bonusEmeralds: number) => void;
  onClose: () => void;
}

export default function PhonicsTrainerModal({
  onComplete,
  onClose
}: PhonicsTrainerModalProps) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [score, setScore] = useState(0);

  const current = PHONICS_DATA[exerciseIndex];

  const playPrompt = useCallback((ex: PhonicsExercise) => {
    speak(`Ouça o som: ${ex.phonemeSound}. Qual destes blocos faz o som ${ex.phonemeSound}?`);
  }, []);

  useEffect(() => {
    if (current) {
      setSelectedOption(null);
      setIsSuccess(false);
      setIsError(false);
      playPrompt(current);
    }
  }, [exerciseIndex, current, playPrompt]);

  const handleChoose = (opt: string) => {
    setSelectedOption(opt);
    playClickSound();
    speak(opt);

    if (opt === current.targetSyllable) {
      setIsSuccess(true);
      playSuccessSound();
      setScore((s) => s + 1);

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        if (exerciseIndex < PHONICS_DATA.length - 1) {
          setExerciseIndex((i) => i + 1);
        } else {
          speak('Incrível! Você concluiu o treinamento fônico com sucesso!');
          onComplete(50, 2); // +50 XP e +2 Esmeraldas
        }
      }, 1200);
    } else {
      setIsError(true);
      playErrorSound();
      setTimeout(() => {
        speak(`Esse som é ${opt}. Ouça novamente: ${current.phonemeSound}`);
        setIsError(false);
        setSelectedOption(null);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-pop select-none">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-sky-400 flex flex-col items-center relative">
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
        >
          ✕
        </button>

        {/* Badge do Modo */}
        <div className="flex items-center gap-1.5 bg-sky-100 text-sky-900 border border-sky-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
          <span>👂</span>
          <span>Treino Fônico (Som & Sílaba)</span>
        </div>

        <h3 className="text-xl font-black text-slate-800 text-center">
          Ouça o Som do Bloco
        </h3>
        <p className="text-xs text-slate-500 font-bold text-center mb-4">
          Exercício {exerciseIndex + 1} de {PHONICS_DATA.length} • Pontos: {score}
        </p>

        {/* Botão Gigante de Reprodução de Áudio */}
        <button
          onClick={() => {
            playClickSound();
            speak(`Ouça com atenção: ${current.phonemeSound}`);
          }}
          className="w-28 h-28 bg-gradient-to-b from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 active:scale-95 rounded-3xl shadow-xl border-b-6 border-sky-800 flex flex-col items-center justify-center text-white transition cursor-pointer my-2"
        >
          <span className="text-4xl animate-bounce-subtle">🔊</span>
          <span className="text-xs font-black mt-1 uppercase tracking-wider">Tocar Som</span>
        </button>

        <p className="text-xs text-slate-400 font-bold mt-2 mb-4">
          Toque no bloco que corresponde a este som:
        </p>

        {/* Opções de Sílabas */}
        <div className={`grid grid-cols-3 gap-3 w-full ${isError ? 'animate-shake' : ''}`}>
          {current.options.map((opt) => {
            const isTarget = opt === current.targetSyllable;
            const isCurrentChosen = selectedOption === opt;

            return (
              <button
                key={opt}
                disabled={isSuccess}
                onClick={() => handleChoose(opt)}
                className={`h-20 rounded-2xl font-black text-3xl shadow-md border-b-4 transition transform active:scale-95 cursor-pointer ${
                  isSuccess && isTarget
                    ? 'bg-emerald-500 text-white border-emerald-800 animate-pop'
                    : isCurrentChosen && isError
                    ? 'bg-rose-500 text-white border-rose-800'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 active:border-b-0'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Dica da Palavra Exemplo */}
        <div className="w-full mt-5 pt-3 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-400 font-bold">
            Exemplo na palavra: <strong className="text-sky-600">{current.exampleWord}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
