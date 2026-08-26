'use client';

import { useState, useEffect } from 'react';
import { WORDS_DATA, WordItem } from '@/data/words';
import { speak } from '@/utils/speech';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentItem: WordItem = WORDS_DATA[currentIndex];

  useEffect(() => {
    // Apresenta o item ao carregar a palavra
    speak(`Esta palavra é: ${currentItem.word}. Toque nos botões para formar a palavra.`);
    setSelectedSyllables([]);
    setIsSuccess(false);
  }, [currentIndex, currentItem]);

  const handleSelectSyllable = (syl: string) => {
    speak(syl);
    const newSelected = [...selectedSyllables, syl];
    setSelectedSyllables(newSelected);

    // Verifica se completou a palavra
    const expected = currentItem.syllables.slice(0, newSelected.length);
    const isCorrectSoFar = newSelected.every((val, idx) => val === expected[idx]);

    if (!isCorrectSoFar) {
      setTimeout(() => {
        speak('Tente de novo! Vamos limpar.');
        setSelectedSyllables([]);
      }, 700);
      return;
    }

    if (newSelected.length === currentItem.syllables.length) {
      setIsSuccess(true);
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
    speak('Recomeçando a palavra.');
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-between p-4 sm:p-8 select-none">
      {/* Cabeçalho */}
      <header className="w-full max-w-md flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <span className="text-xl font-bold text-slate-700">
          Palavra {currentIndex + 1} de {WORDS_DATA.length}
        </span>
        <button
          onClick={() => speak(`Esta palavra é: ${currentItem.word}`)}
          className="bg-amber-400 hover:bg-amber-500 text-amber-950 px-4 py-2 rounded-xl text-lg font-bold flex items-center gap-2 shadow transition active:scale-95"
          aria-label="Ouvir palavra"
        >
          🔊 Ouvir
        </button>
      </header>

      {/* Cartão Central */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col items-center my-auto">
        {/* Ícone Grande */}
        <div className="text-8xl my-2 animate-pulse">{currentItem.icon}</div>

        {/* Espaços das Sílabas */}
        <div className="flex gap-2 my-6 flex-wrap justify-center">
          {currentItem.syllables.map((syl, idx) => {
            const filled = selectedSyllables[idx];
            return (
              <div
                key={idx}
                className={`w-20 h-20 sm:w-24 sm:h-24 border-4 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-black ${
                  filled
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-dashed border-slate-300 bg-slate-50 text-transparent'
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
                className="h-20 bg-blue-600 hover:bg-blue-700 text-white font-black text-3xl rounded-2xl shadow-md border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full text-center mt-4">
            <p className="text-emerald-600 font-black text-2xl mb-4">🌟 PARABÉNS! 🌟</p>
            <button
              onClick={handleNext}
              className="w-full h-20 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-2xl rounded-2xl shadow-lg border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition"
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
          className="flex-1 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-2xl text-lg transition active:scale-95"
        >
          🔄 Limpar
        </button>
      </footer>
    </main>
  );
}