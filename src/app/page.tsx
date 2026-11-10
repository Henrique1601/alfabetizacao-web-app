'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { WORDS_DATA, WordItem, WordCategory } from '@/data/words';
import { ACHIEVEMENTS_LIST, Achievement, GameStats } from '@/data/achievements';
import { speak } from '@/utils/speech';
import { playClickSound, playErrorSound, playSuccessSound, playAchievementSound } from '@/utils/sfx';

const CATEGORIES: { label: string; value: WordCategory; icon: string }[] = [
  { label: 'Todos', value: 'TODOS', icon: '🌟' },
  { label: 'Alimentos', value: 'ALIMENTOS', icon: '🍎' },
  { label: 'Animais', value: 'ANIMAIS', icon: '🐶' },
  { label: 'Objetos', value: 'OBJETOS', icon: '📱' },
  { label: 'Natureza', value: 'NATUREZA', icon: '🌳' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<WordCategory>('TODOS');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Gamificação (XP, Esmeraldas e Nível persistidos)
  const [xp, setXp] = useState(0);
  const [emeralds, setEmeralds] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [completedCategories, setCompletedCategories] = useState<Record<string, number>>({});
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // Notificação de Conquista Recém-Desbloqueada
  const [latestBadge, setLatestBadge] = useState<Achievement | null>(null);
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  // Carregar dados salvos e registrar Service Worker para PWA
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Falha ao registrar Service Worker do PWA:', err);
      });
    }

    try {
      const savedXp = localStorage.getItem('craft_xp');
      const savedEmeralds = localStorage.getItem('craft_emeralds');
      const savedWords = localStorage.getItem('craft_words_completed');
      const savedCats = localStorage.getItem('craft_categories_completed');
      const savedBadges = localStorage.getItem('craft_unlocked_badges');

      if (savedXp) setXp(parseInt(savedXp, 10));
      if (savedEmeralds) setEmeralds(parseInt(savedEmeralds, 10));
      if (savedWords) setWordsCompleted(parseInt(savedWords, 10));
      if (savedCats) setCompletedCategories(JSON.parse(savedCats));
      if (savedBadges) setUnlockedAchievements(JSON.parse(savedBadges));
    } catch {
      // Ignora erro se localStorage restrito
    }
  }, []);

  // Salvar dados
  const saveProgress = (
    newXp: number,
    newEmeralds: number,
    newWords: number,
    newCats: Record<string, number>,
    newBadges: string[]
  ) => {
    try {
      localStorage.setItem('craft_xp', newXp.toString());
      localStorage.setItem('craft_emeralds', newEmeralds.toString());
      localStorage.setItem('craft_words_completed', newWords.toString());
      localStorage.setItem('craft_categories_completed', JSON.stringify(newCats));
      localStorage.setItem('craft_unlocked_badges', JSON.stringify(newBadges));
    } catch {
      // Ignora erro
    }
  };

  // Filtragem de palavras por categoria
  const filteredWords = useMemo(() => {
    if (selectedCategory === 'TODOS') return WORDS_DATA;
    return WORDS_DATA.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  const currentItem: WordItem = filteredWords[currentIndex] || filteredWords[0] || WORDS_DATA[0];

  // Cálculo de nível no estilo RPG/Minecraft
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;

  const resetCurrentWord = useCallback((item: WordItem) => {
    setSelectedSyllables([]);
    setIsSuccess(false);
    setIsError(false);
    speak(`Esta palavra é: ${item.word}. Toque nos blocos para formar a palavra.`);
  }, []);

  useEffect(() => {
    if (currentItem) {
      resetCurrentWord(currentItem);
    }
  }, [currentIndex, currentItem, resetCurrentWord]);

  const handleCategoryChange = (category: WordCategory) => {
    playClickSound();
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
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

  // Checagem de Conquistas
  const checkAchievements = (stats: GameStats, currentBadges: string[]): string[] => {
    const updated = [...currentBadges];
    let newlyUnlocked: Achievement | null = null;

    ACHIEVEMENTS_LIST.forEach((ach) => {
      if (!updated.includes(ach.id) && ach.condition(stats)) {
        updated.push(ach.id);
        if (!newlyUnlocked) {
          newlyUnlocked = ach;
        }
      }
    });

    if (newlyUnlocked) {
      setLatestBadge(newlyUnlocked);
      playAchievementSound();
      speak(`Conquista desbloqueada: ${(newlyUnlocked as Achievement).title}!`);
      setTimeout(() => {
        setLatestBadge(null);
      }, 5000);
    }

    return updated;
  };

  const handleSelectSyllable = (syl: string) => {
    playClickSound();
    speak(syl);
    const newSelected = [...selectedSyllables, syl];
    setSelectedSyllables(newSelected);

    // Verifica se a sequência parcial está correta
    const expected = currentItem.syllables.slice(0, newSelected.length);
    const isCorrectSoFar = newSelected.every((val, idx) => val === expected[idx]);

    if (!isCorrectSoFar) {
      playErrorSound();
      setIsError(true);
      setTimeout(() => {
        speak('Tente de novo! Vamos limpar.');
        setSelectedSyllables([]);
        setIsError(false);
      }, 700);
      return;
    }

    // Se completou a palavra inteira
    if (newSelected.length === currentItem.syllables.length) {
      setIsSuccess(true);
      playSuccessSound();
      triggerConfetti();

      // Atualização de Estatísticas
      const nextXp = xp + 25;
      const nextEmeralds = emeralds + 1;
      const nextWords = wordsCompleted + 1;
      const nextCats = {
        ...completedCategories,
        [currentItem.category]: (completedCategories[currentItem.category] || 0) + 1
      };
      const nextLevel = Math.floor(nextXp / 100) + 1;

      const currentStats: GameStats = {
        wordsCompleted: nextWords,
        emeralds: nextEmeralds,
        level: nextLevel,
        completedCategories: nextCats
      };

      const nextBadges = checkAchievements(currentStats, unlockedAchievements);

      setXp(nextXp);
      setEmeralds(nextEmeralds);
      setWordsCompleted(nextWords);
      setCompletedCategories(nextCats);
      setUnlockedAchievements(nextBadges);
      saveProgress(nextXp, nextEmeralds, nextWords, nextCats, nextBadges);

      setTimeout(() => {
        speak(`Muito bem! Acertou: ${currentItem.word}! Você ganhou uma esmeralda!`, 0.9);
      }, 400);
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      speak('Parabéns! Concluiu todas as palavras desta categoria!');
      setCurrentIndex(0);
    }
  };

  const handleReset = () => {
    playClickSound();
    setSelectedSyllables([]);
    setIsError(false);
    speak('Recomeçando a palavra.');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 flex flex-col items-center justify-between p-3 sm:p-6 select-none relative overflow-x-hidden">
      {/* Banner Flutuante de Conquista Desbloqueada (Estilo Minecraft Advancements) */}
      {latestBadge && (
        <div className="fixed top-4 z-50 animate-pop max-w-sm w-11/12 bg-slate-900 border-2 border-amber-400 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <div className="text-4xl bg-slate-800 p-2 rounded-xl border border-amber-400/50">
            {latestBadge.icon}
          </div>
          <div className="flex-1">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
              Desafio Concluído! 🏆
            </span>
            <h4 className="font-black text-base text-white">{latestBadge.title}</h4>
            <p className="text-xs text-slate-300">{latestBadge.description}</p>
          </div>
        </div>
      )}

      {/* Barra de Status Gamificada (Nível, XP, Esmeraldas e Botão de Conquistas) */}
      <section className="w-full max-w-md bg-slate-900 text-white p-3 rounded-2xl shadow-lg border-2 border-slate-700 flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-bold">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-lg text-xs font-black">
              LVL {level}
            </span>
            <span className="text-emerald-400 font-mono tracking-wide">{currentLevelXp}/100 XP</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setShowBadgesModal(true);
              }}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 px-2 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition active:scale-95 cursor-pointer"
            >
              🏆 {unlockedAchievements.length}/{ACHIEVEMENTS_LIST.length}
            </button>
            <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-xl border border-emerald-600/50">
              <span className="text-base">💎</span>
              <span className="text-emerald-300 font-black text-xs sm:text-sm">{emeralds}</span>
            </div>
          </div>
        </div>

        {/* Barra de XP estilo Minecraft */}
        <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className="bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${currentLevelXp}%` }}
          />
        </div>
      </section>

      {/* Seletor de Categorias / Fases */}
      <nav className="w-full max-w-md flex gap-2 overflow-x-auto py-2 px-1 scrollbar-none my-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer border-b-2 ${
              selectedCategory === cat.value
                ? 'bg-amber-400 text-amber-950 border-amber-600 shadow-sm scale-105'
                : 'bg-white/80 hover:bg-white text-slate-600 border-slate-300'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* Cartão Central de Desafio */}
      <div
        className={`w-full max-w-md bg-white/95 rounded-3xl p-5 sm:p-6 shadow-xl border-4 transition-all duration-300 flex flex-col items-center my-auto ${
          isError
            ? 'border-red-400 bg-red-50/50 animate-shake'
            : isSuccess
            ? 'border-emerald-400 shadow-emerald-200'
            : 'border-slate-200'
        }`}
      >
        {/* Cabeçalho do Cartão */}
        <div className="w-full flex justify-between items-center mb-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {currentItem.category} • {currentIndex + 1} de {filteredWords.length}
          </span>
          <button
            onClick={() => {
              playClickSound();
              speak(`Esta palavra é: ${currentItem.word}`);
            }}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1 rounded-xl text-sm font-black flex items-center gap-1 border border-amber-300 transition active:scale-95 cursor-pointer"
          >
            🔊 Ouvir
          </button>
        </div>

        {/* Ícone Lúdico com Feedback de Animação */}
        <div
          className={`text-8xl my-2 transition-transform duration-300 select-none ${
            isSuccess ? 'scale-125 animate-bounce-subtle' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {currentItem.icon}
        </div>

        {/* Espaços das Sílabas */}
        <div className="flex gap-2 sm:gap-3 my-4 flex-wrap justify-center">
          {currentItem.syllables.map((syl, idx) => {
            const filled = selectedSyllables[idx];
            return (
              <div
                key={idx}
                className={`w-18 h-18 sm:w-22 sm:h-22 border-4 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl font-black transition-all duration-200 shadow-sm ${
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mt-2">
            {currentItem.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSyllable(option)}
                className="h-16 sm:h-20 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-2xl sm:text-3xl rounded-2xl shadow-md border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition transform active:scale-95 cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full text-center mt-3 animate-pop">
            <p className="text-emerald-600 font-black text-2xl sm:text-3xl mb-1 tracking-wider animate-pulse">
              🌟 PARABÉNS! 🌟
            </p>
            <p className="text-slate-600 font-bold text-sm mb-4">
              +25 XP • +1 Esmeralda Coletada! 💎
            </p>
            <button
              onClick={handleNext}
              className="w-full h-18 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-2xl rounded-2xl shadow-xl border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition transform cursor-pointer"
            >
              PRÓXIMA ➡️
            </button>
          </div>
        )}
      </div>

      {/* Controlos Inferiores */}
      <footer className="w-full max-w-md flex justify-between gap-3 mt-2">
        <button
          onClick={handleReset}
          className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 font-black rounded-2xl text-base transition active:scale-95 border-b-4 border-slate-300 cursor-pointer"
        >
          🔄 Limpar
        </button>
        <button
          onClick={() => {
            playClickSound();
            speak(currentItem.word);
          }}
          className="flex-1 py-3 bg-amber-200 hover:bg-amber-300 active:bg-amber-400 text-amber-900 font-black rounded-2xl text-base transition active:scale-95 border-b-4 border-amber-400 cursor-pointer"
        >
          💡 Dica
        </button>
      </footer>

      {/* Modal de Conquistas & Desafios */}
      {showBadgesModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-pop">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-slate-300 flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                <h3 className="text-xl font-black text-slate-800">Suas Conquistas</h3>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setShowBadgesModal(false);
                }}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-bold">
              Complete palavras e suba de nível para desbloquear todos os troféus!
            </p>

            <div className="flex flex-col gap-3 overflow-y-auto pr-1">
              {ACHIEVEMENTS_LIST.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition ${
                      isUnlocked
                        ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`text-3xl p-2 rounded-xl flex items-center justify-center ${
                        isUnlocked ? 'bg-amber-200' : 'bg-slate-200 grayscale'
                      }`}
                    >
                      {ach.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm">{ach.title}</h4>
                        {isUnlocked && (
                          <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.5 rounded-full">
                            CONCLUÍDO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{ach.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                playClickSound();
                setShowBadgesModal(false);
              }}
              className="mt-5 w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl text-base transition border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 cursor-pointer"
            >
              CONTINUAR JOGANDO 🎮
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
