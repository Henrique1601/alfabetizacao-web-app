'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WORDS_DATA, WordItem } from '@/data/words';
import { speak } from '@/utils/speech';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentItem: WordItem = WORDS_DATA[currentIndex];

  useEffect(() => {
    // Apresenta o item ao carregar a palavra
    speak(`Esta palavra é: ${currentItem.word}. Toque nos blocos para formar a palavra.`);
    setSelectedSyllables([]);
    setIsSuccess(false);
    setIsError(false);
  }, [currentIndex, currentItem]);

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSelectSyllable = (syl: string) => {
    speak(syl);
    const newSelected = [...selectedSyllables, syl];
    setSelectedSyllables(newSelected);

    // Verifica se completou a palavra ou errou
    const expected = currentItem.syllables.slice(0, newSelected.length);
    const isCorrectSoFar = newSelected.every((val, idx) => val === expected[idx]);

    if (!isCorrectSoFar) {
      setIsError(true);
      setTimeout(() => {
        speak('Tente de novo! Vamos limpar.');
        setSelectedSyllables([]);
        setIsError(false);
      }, 700);
      return;
    }

    if (newSelected.length === currentItem.syllables.length) {
      setIsSuccess(true);
      triggerConfetti();
      setTimeout(() => {
        speak(`Muito bem! Acertou: ${currentItem.word}!`, 0.9);
      }, 400);
    }
  };

  const handleNext = () => {
    if (currentIndex < WORDS_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      speak('Parabéns! Concluiu todas as palavras!');
      setCurrentIndex(0);
    }
  };

  const handleReset = () => {
    setSelectedSyllables([]);
    setIsError(false);
    speak('Recomeçando a palavra.');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 flex flex-col items-center justify-between p-4 sm:p-8 select-none">
      {/* Cabeçalho */}
      <header className="w-full max-w-md flex justify-between items-center bg-white/90 backdrop-blur p-4 rounded-2xl shadow-sm border-2 border-slate-200">
        <span className="text-xl font-black text-slate-800 tracking-wide">
          Palavra <span className="text-amber-500 font-extrabold">{currentIndex + 1}</span> de {WORDS_DATA.length}
        </span>
        <button
          onClick={() => speak(`Esta palavra é: ${currentItem.word}`)}
          className="bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 px-4 py-2 rounded-xl text-lg font-black flex items-center gap-2 shadow-md transition transform cursor-pointer border-b-4 border-amber-600"
          aria-label="Ouvir palavra"
        >
          🔊 Ouvir
        </button>
      </header>

      {/* Cartão Central */}
      <div
        className={`w-full max-w-md bg-white/95 rounded-3xl p-6 shadow-xl border-4 transition-all duration-300 flex flex-col items-center my-auto ${
          isError
            ? 'border-red-400 bg-red-50/50 animate-shake'
            : isSuccess
            ? 'border-emerald-400 shadow-emerald-200'
            : 'border-slate-200'
        }`}
      >
        {/* Ícone Grande com feedback */}
        <div
          className={`text-8xl my-3 transition-transform duration-300 select-none ${
            isSuccess ? 'scale-125 animate-bounce-subtle' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {currentItem.icon}
        </div>

        {/* Espaços das Sílabas */}
        <div className="flex gap-3 my-6 flex-wrap justify-center">
          {currentItem.syllables.map((syl, idx) => {
            const filled = selectedSyllables[idx];
            return (
              <div
                key={idx}
                className={`w-20 h-20 sm:w-24 sm:h-24 border-4 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-black transition-all duration-200 shadow-sm ${
                  filled
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-emerald-100 animate-pop scale-105'
                    : 'border-dashed border-slate-300 bg-slate-50/80 text-transparent'
                }`}
              >
                {filled || '_'}
              </div>
            );
          })}
        </div>

        {/* Opções de Sílabas */}
        {!isSuccess ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-2">
            {currentItem.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSyllable(option)}
                className="h-20 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-3xl rounded-2xl shadow-md border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition transform active:scale-95 cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full text-center mt-4 animate-pop">
            <p className="text-emerald-600 font-black text-3xl mb-4 tracking-wider animate-pulse">
              🌟 PARABÉNS! 🌟
            </p>
            <button
              onClick={handleNext}
              className="w-full h-20 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-2xl rounded-2xl shadow-xl border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition transform cursor-pointer"
            >
              PRÓXIMA ➡️
            </button>
          </div>
        )}
      </div>

      {/* Controlos Inferiores */}
      <footer className="w-full max-w-md flex justify-between gap-4">
        <button
          onClick={handleReset}
          className="flex-1 py-4 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 font-black rounded-2xl text-lg transition active:scale-95 border-b-4 border-slate-300 cursor-pointer"
        >
          🔄 Limpar
        </button>
      </footer>
    </main>
  );
}
