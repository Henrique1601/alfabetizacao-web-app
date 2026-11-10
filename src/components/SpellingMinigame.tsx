'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { WordItem } from '@/data/words';
import { speak } from '@/utils/speech';
import { playClickSound, playErrorSound, playSuccessSound } from '@/utils/sfx';

interface SpellingMinigameProps {
  wordItem: WordItem;
  onComplete: (bonusXp: number, bonusEmeralds: number) => void;
  onClose: () => void;
}

export default function SpellingMinigame({
  wordItem,
  onComplete,
  onClose
}: SpellingMinigameProps) {
  // Letras individuais da palavra alvo (sem espaços ou traços)
  const letters = wordItem.word.split('');
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Embaralhar as letras corretas + 2 distratores fonéticos
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [letterOptions, setLetterOptions] = useState<string[]>([]);

  const setupLetters = useCallback(() => {
    setSelectedLetters([]);
    setIsSuccess(false);
    setIsError(false);

    const needed = [...letters];
    const distractors: string[] = [];
    while (distractors.length < 3) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!needed.includes(randomLetter) && !distractors.includes(randomLetter)) {
        distractors.push(randomLetter);
      }
    }

    // Baralhar
    const all = [...needed, ...distractors].sort(() => Math.random() - 0.5);
    setLetterOptions(all);
    speak(`Modo Soletração! Soletre letra por letra a palavra: ${wordItem.word}`);
  }, [wordItem, letters]);

  useEffect(() => {
    setupLetters();
  }, [setupLetters]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899']
    });
  };

  const handleSelectLetter = (char: string) => {
    playClickSound();
    speak(char);
    const newSelected = [...selectedLetters, char];
    setSelectedLetters(newSelected);

    // Validação passo a passo
    const expected = letters.slice(0, newSelected.length);
    const isCorrectSoFar = newSelected.every((val, idx) => val === expected[idx]);

    if (!isCorrectSoFar) {
      playErrorSound();
      setIsError(true);
      setTimeout(() => {
        speak('Ops! Tente novamente.');
        setSelectedLetters([]);
        setIsError(false);
      }, 700);
      return;
    }

    // Se completou todas as letras
    if (newSelected.length === letters.length) {
      setIsSuccess(true);
      playSuccessSound();
      triggerConfetti();
      setTimeout(() => {
        speak(`Excelente! Você soletrou ${wordItem.word} com perfeição!`);
        onComplete(35, 1); // +35 XP e +1 Esmeralda
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-pop select-none">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-amber-400 flex flex-col items-center relative">
        {/* Botão Fechar */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
        >
          ✕
        </button>

        {/* Badge Minigame */}
        <div className="flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
          <span>🔤</span>
          <span>Minigame de Soletração</span>
        </div>

        <h3 className="text-xl font-black text-slate-800 text-center">
          Soletre a Palavra!
        </h3>
        <p className="text-xs text-slate-500 font-bold text-center mb-3">
          Toque nas letras na ordem correta para formar a palavra inteira.
        </p>

        {/* Ícone */}
        <div className="text-6xl my-1 animate-bounce-subtle">{wordItem.icon}</div>

        {/* Slots das Letras */}
        <div
          className={`flex gap-1.5 sm:gap-2 my-4 flex-wrap justify-center transition-all ${
            isError ? 'animate-shake' : ''
          }`}
        >
          {letters.map((char, idx) => {
            const filled = selectedLetters[idx];
            return (
              <div
                key={idx}
                className={`w-11 h-13 sm:w-13 sm:h-15 border-3 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                  filled
                    ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm animate-pop scale-105'
                    : 'border-dashed border-slate-300 bg-slate-50 text-transparent'
                }`}
              >
                {filled || '_'}
              </div>
            );
          })}
        </div>

        {/* Opções de Letras */}
        {!isSuccess ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 w-full mt-2">
            {letterOptions.map((char, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectLetter(char)}
                className="h-14 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-black text-2xl rounded-xl shadow-md border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition transform active:scale-95 cursor-pointer"
              >
                {char}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full text-center mt-3 animate-pop">
            <p className="text-emerald-600 font-black text-2xl mb-1 animate-pulse">
              🎉 PALAVRA SOLETRADA! 🎉
            </p>
            <p className="text-slate-600 font-bold text-xs mb-3">
              +35 XP Bônus • +1 Esmeralda! 💎
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition cursor-pointer"
            >
              CONTINUAR AVENTURA 🚀
            </button>
          </div>
        )}

        {/* Botão de Dica / Ouvir Palavra */}
        {!isSuccess && (
          <div className="w-full flex justify-between gap-2 mt-4 pt-3 border-t border-slate-200">
            <button
              onClick={() => {
                playClickSound();
                setSelectedLetters([]);
                speak('Reiniciando a soletração.');
              }}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              🔄 Limpar Letras
            </button>
            <button
              onClick={() => {
                playClickSound();
                speak(`A palavra é: ${wordItem.word}`);
              }}
              className="flex-1 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              🔊 Ouvir Palavra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
