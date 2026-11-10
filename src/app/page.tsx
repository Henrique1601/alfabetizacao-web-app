'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { WORDS_DATA, WordItem, WordCategory, DifficultyLevel, ProfileMode } from '@/data/words';
import { ACHIEVEMENTS_LIST, Achievement, GameStats } from '@/data/achievements';
import { speak, updateSpeechSettings } from '@/utils/speech';
import { 
  playClickSound, 
  playErrorSound, 
  playSuccessSound, 
  playAchievementSound, 
  updateSoundSettings 
} from '@/utils/sfx';
import SpellingMinigame from '@/components/SpellingMinigame';
import PhonicsTrainerModal from '@/components/PhonicsTrainerModal';
import LearningTrailModal from '@/components/LearningTrailModal';

const CATEGORIES_INFANTIL: { label: string; value: WordCategory; icon: string }[] = [
  { label: 'Todos', value: 'TODOS', icon: '🌟' },
  { label: 'Alimentos', value: 'ALIMENTOS', icon: '🍎' },
  { label: 'Animais', value: 'ANIMAIS', icon: '🐶' },
  { label: 'Cores', value: 'CORES', icon: '🎨' },
  { label: 'Brinquedos', value: 'BRINQUEDOS', icon: '🧸' },
];

const CATEGORIES_EJA: { label: string; value: WordCategory; icon: string }[] = [
  { label: 'Todos', value: 'TODOS', icon: '🌟' },
  { label: 'Trabalho', value: 'TRABALHO', icon: '💼' },
  { label: 'Saúde', value: 'SAÚDE', icon: '🩺' },
  { label: 'Cidade', value: 'CIDADE', icon: '🏙️' },
  { label: 'Documentos', value: 'DOCUMENTOS', icon: '📄' },
  { label: 'Alimentos', value: 'ALIMENTOS', icon: '🍞' },
];

const DIFFICULTIES: { label: string; value: DifficultyLevel; icon: string; color: string }[] = [
  { label: 'Fácil', value: 'FACIL', icon: '🌱', color: 'text-emerald-600 bg-emerald-50 border-emerald-300' },
  { label: 'Médio', value: 'MEDIO', icon: '⚡', color: 'text-amber-600 bg-amber-50 border-amber-300' },
  { label: 'Difícil', value: 'DIFICIL', icon: '🔥', color: 'text-rose-600 bg-rose-50 border-rose-300' },
];

export default function Home() {
  // Perfil Pedagógico (Infantil vs Adultos/EJA)
  const [profileMode, setProfileMode] = useState<ProfileMode>('INFANTIL');
  const [selectedCategory, setSelectedCategory] = useState<WordCategory>('TODOS');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('MEDIO');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Gamificação (XP, Esmeraldas, Nível e Streak)
  const [xp, setXp] = useState(0);
  const [emeralds, setEmeralds] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [completedCategories, setCompletedCategories] = useState<Record<string, number>>({});
  const [difficultyCount, setDifficultyCount] = useState<{ FACIL: number; MEDIO: number; DIFICIL: number }>({
    FACIL: 0,
    MEDIO: 0,
    DIFICIL: 0
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // Configurações do App
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.8);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceRate, setVoiceRate] = useState(0.9);

  // Modais e Toasts
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showSpellingModal, setShowSpellingModal] = useState(false);
  const [showPhonicsModal, setShowPhonicsModal] = useState(false);
  const [showTrailModal, setShowTrailModal] = useState(false);
  const [latestBadge, setLatestBadge] = useState<Achievement | null>(null);

  // Carregar dados e registrar Service Worker para PWA
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Falha ao registrar Service Worker do PWA:', err);
      });
    }

    try {
      const savedProfile = localStorage.getItem('craft_profile_mode');
      const savedXp = localStorage.getItem('craft_xp');
      const savedEmeralds = localStorage.getItem('craft_emeralds');
      const savedWords = localStorage.getItem('craft_words_completed');
      const savedStreak = localStorage.getItem('craft_streak');
      const savedBestStreak = localStorage.getItem('craft_best_streak');
      const savedCats = localStorage.getItem('craft_categories_completed');
      const savedDiff = localStorage.getItem('craft_difficulty_count');
      const savedBadges = localStorage.getItem('craft_unlocked_badges');
      const savedDiffSetting = localStorage.getItem('craft_preferred_difficulty');

      const savedSoundEnabled = localStorage.getItem('craft_cfg_sound_enabled');
      const savedSoundVol = localStorage.getItem('craft_cfg_sound_volume');
      const savedVoiceEnabled = localStorage.getItem('craft_cfg_voice_enabled');
      const savedVoiceRate = localStorage.getItem('craft_cfg_voice_rate');

      if (savedProfile) setProfileMode(savedProfile as ProfileMode);
      if (savedXp) setXp(parseInt(savedXp, 10));
      if (savedEmeralds) setEmeralds(parseInt(savedEmeralds, 10));
      if (savedWords) setWordsCompleted(parseInt(savedWords, 10));
      if (savedStreak) setStreak(parseInt(savedStreak, 10));
      if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
      if (savedCats) setCompletedCategories(JSON.parse(savedCats));
      if (savedDiff) setDifficultyCount(JSON.parse(savedDiff));
      if (savedBadges) setUnlockedAchievements(JSON.parse(savedBadges));
      if (savedDiffSetting) setDifficulty(savedDiffSetting as DifficultyLevel);

      if (savedSoundEnabled !== null) {
        const en = savedSoundEnabled === 'true';
        setSoundEnabled(en);
        updateSoundSettings(en, savedSoundVol ? parseFloat(savedSoundVol) : 0.8);
      }
      if (savedSoundVol !== null) {
        setSoundVolume(parseFloat(savedSoundVol));
      }
      if (savedVoiceEnabled !== null) {
        const ven = savedVoiceEnabled === 'true';
        setVoiceEnabled(ven);
        updateSpeechSettings({ voiceEnabled: ven });
      }
      if (savedVoiceRate !== null) {
        const vr = parseFloat(savedVoiceRate);
        setVoiceRate(vr);
        updateSpeechSettings({ rate: vr });
      }
    } catch {
      // Ignora erro
    }
  }, []);

  const handleProfileChange = (mode: ProfileMode) => {
    playClickSound();
    setProfileMode(mode);
    setSelectedCategory('TODOS');
    setCurrentIndex(0);
    try {
      localStorage.setItem('craft_profile_mode', mode);
    } catch {}
    speak(mode === 'EJA' ? 'Modo Educação de Adultos ativado. Palavras do cotidiano e cidadania.' : 'Modo Infantil Lúdico ativado.');
  };

  const handleUpdateSound = (enabled: boolean, vol: number) => {
    setSoundEnabled(enabled);
    setSoundVolume(vol);
    updateSoundSettings(enabled, vol);
    try {
      localStorage.setItem('craft_cfg_sound_enabled', enabled.toString());
      localStorage.setItem('craft_cfg_sound_volume', vol.toString());
    } catch {}
  };

  const handleUpdateVoice = (enabled: boolean, rate: number) => {
    setVoiceEnabled(enabled);
    setVoiceRate(rate);
    updateSpeechSettings({ voiceEnabled: enabled, rate });
    try {
      localStorage.setItem('craft_cfg_voice_enabled', enabled.toString());
      localStorage.setItem('craft_cfg_voice_rate', rate.toString());
    } catch {}
  };

  const handleResetAllData = () => {
    if (confirm('Tem certeza de que deseja zerar todo o progresso (XP, Esmeraldas e Troféus)?')) {
      try {
        localStorage.clear();
      } catch {}
      setXp(0);
      setEmeralds(0);
      setWordsCompleted(0);
      setStreak(0);
      setBestStreak(0);
      setCompletedCategories({});
      setDifficultyCount({ FACIL: 0, MEDIO: 0, DIFICIL: 0 });
      setUnlockedAchievements([]);
      setShowSettingsModal(false);
      speak('Progresso reiniciado com sucesso.');
    }
  };

  // Filtragem de palavras por perfil e categoria
  const filteredWords = useMemo(() => {
    let list = WORDS_DATA.filter((w) => w.profile === 'TODOS' || w.profile === profileMode);
    if (selectedCategory !== 'TODOS') {
      list = list.filter((w) => w.category === selectedCategory);
    }
    return list.length > 0 ? list : WORDS_DATA;
  }, [profileMode, selectedCategory]);

  const currentItem: WordItem = filteredWords[currentIndex] || filteredWords[0] || WORDS_DATA[0];

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

  const handleDifficultyChange = (diff: DifficultyLevel) => {
    playClickSound();
    setDifficulty(diff);
    setSelectedSyllables([]);
    setIsSuccess(false);
    setIsError(false);
    try {
      localStorage.setItem('craft_preferred_difficulty', diff);
    } catch {}
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

    const expected = currentItem.syllables.slice(0, newSelected.length);
    const isCorrectSoFar = newSelected.every((val, idx) => val === expected[idx]);

    if (!isCorrectSoFar) {
      playErrorSound();
      setIsError(true);
      setStreak(0);
      try {
        localStorage.setItem('craft_streak', '0');
      } catch {}

      setTimeout(() => {
        speak('Tente de novo! Vamos limpar.');
        setSelectedSyllables([]);
        setIsError(false);
      }, 700);
      return;
    }

    if (newSelected.length === currentItem.syllables.length) {
      setIsSuccess(true);
      playSuccessSound();
      triggerConfetti();

      const difficultyBonus = difficulty === 'DIFICIL' ? 40 : difficulty === 'MEDIO' ? 25 : 15;
      const nextStreak = streak + 1;
      const nextBestStreak = Math.max(bestStreak, nextStreak);
      const streakBonus = nextStreak >= 3 ? 10 : 0;
      const nextXp = xp + difficultyBonus + streakBonus;
      const nextEmeralds = emeralds + (difficulty === 'DIFICIL' ? 2 : 1);
      const nextWords = wordsCompleted + 1;
      const nextCats = {
        ...completedCategories,
        [currentItem.category]: (completedCategories[currentItem.category] || 0) + 1
      };
      const nextDiffCount = {
        ...difficultyCount,
        [difficulty]: (difficultyCount[difficulty] || 0) + 1
      };
      const nextLevel = Math.floor(nextXp / 100) + 1;

      const currentStats: GameStats = {
        wordsCompleted: nextWords,
        emeralds: nextEmeralds,
        level: nextLevel,
        streak: nextStreak,
        bestStreak: nextBestStreak,
        completedCategories: nextCats,
        difficultyCount: nextDiffCount
      };

      const nextBadges = checkAchievements(currentStats, unlockedAchievements);

      setXp(nextXp);
      setEmeralds(nextEmeralds);
      setWordsCompleted(nextWords);
      setStreak(nextStreak);
      setBestStreak(nextBestStreak);
      setCompletedCategories(nextCats);
      setDifficultyCount(nextDiffCount);
      setUnlockedAchievements(nextBadges);

      try {
        localStorage.setItem('craft_xp', nextXp.toString());
        localStorage.setItem('craft_emeralds', nextEmeralds.toString());
        localStorage.setItem('craft_words_completed', nextWords.toString());
        localStorage.setItem('craft_streak', nextStreak.toString());
        localStorage.setItem('craft_best_streak', nextBestStreak.toString());
        localStorage.setItem('craft_categories_completed', JSON.stringify(nextCats));
        localStorage.setItem('craft_difficulty_count', JSON.stringify(nextDiffCount));
        localStorage.setItem('craft_unlocked_badges', JSON.stringify(nextBadges));
      } catch {}

      setTimeout(() => {
        const comboMsg = nextStreak >= 3 ? ` Sequência de ${nextStreak} acertos!` : '';
        speak(`Muito bem! Acertou: ${currentItem.word}!${comboMsg}`, 0.9);
      }, 400);
    }
  };

  const handleBonusComplete = (bonusXp: number, bonusEmeralds: number) => {
    const nextXp = xp + bonusXp;
    const nextEmeralds = emeralds + bonusEmeralds;
    setXp(nextXp);
    setEmeralds(nextEmeralds);
    try {
      localStorage.setItem('craft_xp', nextXp.toString());
      localStorage.setItem('craft_emeralds', nextEmeralds.toString());
    } catch {}
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

  const activeCategories = profileMode === 'INFANTIL' ? CATEGORIES_INFANTIL : CATEGORIES_EJA;
  const currentOptions = currentItem.options[difficulty] || currentItem.options.MEDIO;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 flex flex-col items-center justify-between p-3 sm:p-6 select-none relative overflow-x-hidden">
      {/* Banner Flutuante de Conquista */}
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

      {/* Barra de Status Gamificada */}
      <section className="w-full max-w-md bg-slate-900 text-white p-3 rounded-2xl shadow-lg border-2 border-slate-700 flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-bold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setShowTrailModal(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-2.5 py-0.5 rounded-lg text-xs font-black flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-sm"
              title="Abrir Trilha de Aprendizado"
            >
              <span>🗺️</span>
              <span>LVL {level}</span>
            </button>
            <span className="text-emerald-400 font-mono tracking-wide">{currentLevelXp}/100 XP</span>
            {streak >= 2 && (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg text-xs font-black animate-pulse flex items-center gap-1">
                🔥 {streak}x
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                playClickSound();
                setShowBadgesModal(true);
              }}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 px-2 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition active:scale-95 cursor-pointer"
              title="Ver Conquistas"
            >
              🏆 {unlockedAchievements.length}/{ACHIEVEMENTS_LIST.length}
            </button>
            <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-xl border border-emerald-600/50">
              <span className="text-sm">💎</span>
              <span className="text-emerald-300 font-black text-xs sm:text-sm">{emeralds}</span>
            </div>
            <button
              onClick={() => {
                playClickSound();
                setShowSettingsModal(true);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-xl border border-slate-600 transition active:scale-95 cursor-pointer text-sm"
              title="Configurações"
            >
              ⚙️
            </button>
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

      {/* Alternador de Perfil Pedagógico (Infantil vs Adultos/EJA) */}
      <div className="w-full max-w-md flex justify-between items-center my-1.5 px-1 bg-white/70 backdrop-blur-xs p-1.5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleProfileChange('INFANTIL')}
            className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition cursor-pointer ${
              profileMode === 'INFANTIL'
                ? 'bg-amber-400 text-amber-950 shadow-sm border border-amber-500'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🧒</span>
            <span>Infantil Craft</span>
          </button>
          <button
            onClick={() => handleProfileChange('EJA')}
            className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition cursor-pointer ${
              profileMode === 'EJA'
                ? 'bg-sky-600 text-white shadow-sm border border-sky-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>💼</span>
            <span>Adultos (EJA)</span>
          </button>
        </div>

        {/* Botão Treino Fônico (GraphoGame) */}
        <button
          onClick={() => {
            playClickSound();
            setShowPhonicsModal(true);
          }}
          className="bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-xs"
        >
          <span>👂</span>
          <span>Treino Fônico</span>
        </button>
      </div>

      {/* Controles de Nível de Dificuldade */}
      <div className="w-full max-w-md flex justify-between items-center my-1 px-1">
        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
          Dificuldade:
        </span>
        <div className="flex gap-1.5">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.value}
              onClick={() => handleDifficultyChange(diff.value)}
              className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 border-2 transition cursor-pointer ${
                difficulty === diff.value
                  ? `${diff.color} shadow-sm scale-105 font-extrabold`
                  : 'bg-white/70 text-slate-400 border-slate-200 hover:bg-white'
              }`}
            >
              <span>{diff.icon}</span>
              <span>{diff.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Seletor de Categorias / Fases */}
      <nav className="w-full max-w-md flex gap-2 overflow-x-auto py-1 px-1 scrollbar-none my-1">
        {activeCategories.map((cat) => (
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
            {currentOptions.map((option, idx) => (
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
              +{difficulty === 'DIFICIL' ? 40 : difficulty === 'MEDIO' ? 25 : 15} XP • +{difficulty === 'DIFICIL' ? 2 : 1} Esmeralda(s)! 💎
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

      {/* Controlos Inferiores com Suporte Voice-First */}
      <footer className="w-full max-w-md flex justify-between gap-2.5 mt-2">
        <button
          onClick={handleReset}
          className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 font-black rounded-2xl text-sm sm:text-base transition active:scale-95 border-b-4 border-slate-300 cursor-pointer"
        >
          🔄 Limpar
        </button>
        <button
          onClick={() => {
            playClickSound();
            speak(currentItem.word);
          }}
          className="flex-1 py-3 bg-amber-200 hover:bg-amber-300 active:bg-amber-400 text-amber-900 font-black rounded-2xl text-sm sm:text-base transition active:scale-95 border-b-4 border-amber-400 cursor-pointer"
        >
          💡 Dica
        </button>
        <button
          onClick={() => {
            playClickSound();
            setShowSpellingModal(true);
          }}
          className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-black rounded-2xl text-sm sm:text-base transition active:scale-95 border-b-4 border-purple-800 cursor-pointer shadow-md"
          title="Minigame Soletração"
        >
          🔤 Soletre!
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

      {/* Modal de Configurações */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-pop">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-slate-300 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">⚙️</span>
                <h3 className="text-xl font-black text-slate-800">Configurações</h3>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setShowSettingsModal(false);
                }}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h4 className="font-black text-slate-800 text-sm">Efeitos Sonoros (SFX)</h4>
                  <p className="text-xs text-slate-500">Cliques, vitória e fanfarras</p>
                </div>
                <button
                  onClick={() => handleUpdateSound(!soundEnabled, soundVolume)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer border ${
                    soundEnabled
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-slate-300 text-slate-600 border-slate-400'
                  }`}
                >
                  {soundEnabled ? 'LIGADO 🔊' : 'MUDO 🔇'}
                </button>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h4 className="font-black text-slate-800 text-sm">Voz do Narrador</h4>
                  <p className="text-xs text-slate-500">Leitura de sílabas e palavras</p>
                </div>
                <button
                  onClick={() => handleUpdateVoice(!voiceEnabled, voiceRate)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer border ${
                    voiceEnabled
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-slate-300 text-slate-600 border-slate-400'
                  }`}
                >
                  {voiceEnabled ? 'LIGADO 🗣️' : 'MUDO 🔇'}
                </button>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-black text-slate-800 text-sm">Velocidade da Fala</h4>
                  <span className="text-xs font-mono font-bold text-amber-600">
                    {voiceRate <= 0.8 ? 'Mais Lenta (Infantil)' : voiceRate >= 1.1 ? 'Rápida' : 'Normal'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[0.7, 0.9, 1.1].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleUpdateVoice(voiceEnabled, r)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-black border transition cursor-pointer ${
                        voiceRate === r
                          ? 'bg-amber-400 text-amber-950 border-amber-600 font-black'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {r === 0.7 ? '🐢 0.7x' : r === 0.9 ? '🧒 0.9x' : '⚡ 1.1x'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200">
                <button
                  onClick={handleResetAllData}
                  className="w-full py-2.5 bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 border border-red-200 rounded-2xl text-xs font-black transition cursor-pointer"
                >
                  ⚠️ Zerar Todo Progresso e Conquistas
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                setShowSettingsModal(false);
              }}
              className="mt-5 w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl text-base transition border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 cursor-pointer"
            >
              FECHAR ✕
            </button>
          </div>
        </div>
      )}

      {/* Minigame de Soletração */}
      {showSpellingModal && (
        <SpellingMinigame
          wordItem={currentItem}
          onComplete={handleBonusComplete}
          onClose={() => setShowSpellingModal(false)}
        />
      )}

      {/* Modal Treino Fônico (GraphoGame) */}
      {showPhonicsModal && (
        <PhonicsTrainerModal
          onComplete={handleBonusComplete}
          onClose={() => setShowPhonicsModal(false)}
        />
      )}

      {/* Modal Trilha do Conhecimento */}
      {showTrailModal && (
        <LearningTrailModal
          currentXp={xp}
          userLevel={level}
          onClose={() => setShowTrailModal(false)}
        />
      )}
    </main>
  );
}
