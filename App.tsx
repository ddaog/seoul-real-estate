
import React, { useState, useEffect, useCallback } from 'react';
import { StatBar } from './components/StatBar.tsx';
import { GameCard } from './components/GameCard.tsx';
import { GameCard as IGameCard, GameState, StatType, Stats, HeroStage, CardChoice } from './types.ts';
import { INITIAL_STATS, PRESET_CARDS } from './constants.ts';
import { generateNewEvent, generateGameOverSummary, getHeroStage } from './services/geminiService.ts';
import { RefreshCw, Skull, Loader2, ArrowRight, BookOpen } from 'lucide-react';

const STAGE_COLORS: Record<HeroStage, string> = {
  [HeroStage.ORDINARY_WORLD]: 'bg-zinc-950',
  [HeroStage.CALL_TO_ADVENTURE]: 'bg-indigo-950/30',
  [HeroStage.REFUSAL_OF_CALL]: 'bg-slate-950',
  [HeroStage.MENTOR]: 'bg-amber-950/20',
  [HeroStage.THRESHOLD]: 'bg-zinc-950',
  [HeroStage.TESTS]: 'bg-blue-950/20',
  [HeroStage.APPROACH]: 'bg-purple-950/20',
  [HeroStage.ORDEAL]: 'bg-red-950/20',
  [HeroStage.REWARD]: 'bg-emerald-950/20',
  [HeroStage.ROAD_BACK]: 'bg-orange-950/20',
  [HeroStage.RESURRECTION]: 'bg-zinc-950',
  [HeroStage.RETURN]: 'bg-white/5'
};

export const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    stats: { ...INITIAL_STATS },
    history: [],
    currentCard: PRESET_CARDS[0],
    isGameOver: false,
    gameOverReason: '',
    daysSurvived: 0,
    currentStage: HeroStage.ORDINARY_WORLD,
  });

  const [loading, setLoading] = useState(false);
  const [nextCard, setNextCard] = useState<IGameCard | null>(null);
  const [outcome, setOutcome] = useState<{ text: string; feedback: string } | null>(null);
  const [deathSummary, setDeathSummary] = useState<string>('');

  const checkGameOver = (newStats: Stats) => {
    if (newStats[StatType.ASSET] <= 0) return "[노숙자 엔딩] 전 재산을 탕진하고 서울역 신문지 위로 이사했습니다.";
    if (newStats[StatType.ASSET] >= 100) return "[사회적 타살 엔딩] 투기꾼으로 낙인찍혀 자산이 몰수되고 사회적으로 매장당했습니다.";
    if (newStats[StatType.MENTAL] <= 0) return "[해탈 엔딩] 부동산 우울증으로 속세를 끊고 무소유 수행자가 되었습니다.";
    if (newStats[StatType.MENTAL] >= 100) return "[자연인 엔딩] 시장을 초월한 척하다가 진짜 산으로 들어갔습니다.";
    if (newStats[StatType.FOMO] <= 0) return "[벼락거지 엔딩] 세상 물정 모르는 벼락거지로 고립되었습니다.";
    if (newStats[StatType.FOMO] >= 100) return "[야반도주 엔딩] 영끌의 광기에 휩쓸려 빚만 남기고 야반도주했습니다.";
    if (newStats[StatType.HEALTH] <= 0) return "[돌연사 엔딩] 과로와 스트레스가 한꺼번에 터져 전세금보다 먼저 심장이 나갔습니다.";
    if (newStats[StatType.HEALTH] >= 100) return "[장수 엔딩] 무병장수로 살아남아 집값 그래프만 지켜봤습니다.";
    return null;
  };

  const [previewImpact, setPreviewImpact] = useState<Partial<Record<StatType, number>> | null>(null);

  const handleDrag = useCallback((direction: 'left' | 'right' | null, progress: number) => {
    if (!direction || !state.currentCard) {
      setPreviewImpact(null);
      return;
    }

    const choice = direction === 'left' ? state.currentCard.leftChoice : state.currentCard.rightChoice;
    setPreviewImpact(choice.impact);
  }, [state.currentCard]);

  const handleChoice = async (side: 'left' | 'right') => {
    if (!state.currentCard || loading || outcome) return;
    setPreviewImpact(null);

    const choice = side === 'left' ? state.currentCard.leftChoice : state.currentCard.rightChoice;
    const newStats = { ...state.stats };

    Object.entries(choice.impact).forEach(([type, value]) => {
      newStats[type as StatType] = Math.max(0, Math.min(100, (newStats[type as StatType] || 0) + (value || 0)));
    });

    const gameOverReason = choice.gameOverReason || checkGameOver(newStats);
    setOutcome({ text: choice.outcome, feedback: choice.feedback });

    if (gameOverReason) {
      setLoading(true);
      const summary = await generateGameOverSummary(newStats, state.daysSurvived + 1, gameOverReason);
      setDeathSummary(summary);
      setState(prev => ({
        ...prev,
        stats: newStats,
        isGameOver: true,
        gameOverReason,
        daysSurvived: prev.daysSurvived + 1
      }));
      setLoading(false);
      return;
    }

    // Pre-fetch next card while user reads outcome
    setLoading(true);
    try {
      const generated = await generateNewEvent([...state.history, state.currentCard.dialogue], state.daysSurvived + 1);
      const nextStage = getHeroStage(state.daysSurvived + 1);

      // Fallback logic for stage-based selection
      const stageCards = PRESET_CARDS.filter(c => c.stages?.includes(nextStage));
      const fallbackCard = stageCards.length > 0
        ? stageCards[Math.floor(Math.random() * stageCards.length)]
        : PRESET_CARDS[Math.floor(Math.random() * PRESET_CARDS.length)];

      const finalNext = generated || fallbackCard;
      setNextCard(finalNext);

      setState(prev => ({
        ...prev,
        stats: newStats,
        history: [...prev.history, prev.currentCard!.dialogue],
        daysSurvived: prev.daysSurvived + 1,
        currentStage: nextStage
      }));
    } catch (err) {
      console.error(err);

      const nextStage = getHeroStage(state.daysSurvived + 1);
      const stageCards = PRESET_CARDS.filter(c => c.stages?.includes(nextStage));
      const fallbackCard = stageCards.length > 0
        ? stageCards[Math.floor(Math.random() * stageCards.length)]
        : PRESET_CARDS[Math.floor(Math.random() * PRESET_CARDS.length)];

      setNextCard(fallbackCard);
      setState(prev => ({
        ...prev,
        stats: newStats,
        history: [...prev.history, prev.currentCard!.dialogue],
        daysSurvived: prev.daysSurvived + 1,
        currentStage: nextStage
      }));
    } finally {
      setLoading(false);
    }
  };

  const proceedToNext = () => {
    if (nextCard) {
      setState(prev => ({ ...prev, currentCard: nextCard }));
      setNextCard(null);
      setOutcome(null);
    } else if (!loading) {
      // If next card didn't load for some reason, pick from preset based on stage
      const currentStage = state.currentStage; // Use current stage since we haven't advanced days yet if we are just recovering
      // Actually proceedToNext is called AFTER state update in handleChoice, so state.currentStage is already next stage?
      // No, setState in handleChoice updates state, but is async.
      // Wait, handleChoice calls setState, so when proceedToNext is called (by user click), state should be updated.

      const stageCards = PRESET_CARDS.filter(c => c.stages?.includes(state.currentStage));
      const fallback = stageCards.length > 0
        ? stageCards[Math.floor(Math.random() * stageCards.length)]
        : PRESET_CARDS[Math.floor(Math.random() * PRESET_CARDS.length)];

      setState(prev => ({ ...prev, currentCard: fallback }));
      setOutcome(null);
    }
  };

  const resetGame = () => {
    setState({
      stats: { ...INITIAL_STATS },
      history: [],
      currentCard: PRESET_CARDS[0],
      isGameOver: false,
      gameOverReason: '',
      daysSurvived: 0,
      currentStage: HeroStage.ORDINARY_WORLD,
    });
    setOutcome(null);
    setNextCard(null);
    setDeathSummary('');
    setLoading(false);
  };

  return (
    <div className={`h-[100dvh] w-full transition-colors duration-1000 flex flex-col items-center overflow-hidden font-sans ${STAGE_COLORS[state.currentStage] || 'bg-zinc-950'}`}>
      {/* HUD */}
      <div className="w-full max-w-md flex flex-col items-center gap-2 pt-6 pb-4 px-6 z-40 shrink-0">
        <div className="flex justify-between w-full items-center mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white/40" />
            <h1 className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase italic">SEOUL LAND</h1>
          </div>
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-white/60">
            DAY {state.daysSurvived}
          </div>
        </div>
        <StatBar stats={state.stats} previewImpact={previewImpact} />
        <div className="mt-2 text-[9px] font-bold text-yellow-500/80 tracking-widest uppercase animate-pulse">
          {state.currentStage}
        </div>
      </div>

      <main className="flex-1 w-full max-w-md flex flex-col items-center justify-center px-6 relative">
        {state.isGameOver ? (
          <div className="w-full p-8 bg-zinc-900/90 backdrop-blur-3xl border-2 border-red-900/30 rounded-[2.5rem] shadow-2xl space-y-8 animate-in zoom-in-95 duration-500">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-red-600/20 rounded-full" />
              <Skull className="relative w-20 h-20 text-red-600 mx-auto" />
            </div>
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black text-white italic tracking-tighter">서울의 꿈은 끝났습니다</h2>
              <p className="text-lg text-red-400 font-bold leading-tight">{state.gameOverReason}</p>
              <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <p className="text-zinc-400 italic text-md leading-relaxed font-medium">"{deathSummary}"</p>
              </div>
            </div>
            <button onClick={resetGame} className="w-full py-5 bg-white text-black hover:bg-zinc-200 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
              <RefreshCw className="w-6 h-6" /> 다시 청약하기
            </button>
          </div>
        ) : outcome ? (
          <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-2xl border border-white/10 relative shrink-0">
              <img src={state.currentCard?.image} className="w-full h-full object-cover blur-xl brightness-50 scale-110" />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-black/40">
                <p className="text-2xl font-black text-white leading-tight italic drop-shadow-2xl">"{outcome.feedback}"</p>
              </div>
            </div>
            <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl w-full mb-8">
              <p className="text-lg text-zinc-100 leading-relaxed font-semibold text-center">{outcome.text}</p>
            </div>
            <button
              onClick={proceedToNext}
              disabled={loading && !nextCard}
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
              {loading && !nextCard ? <Loader2 className="w-6 h-6 animate-spin" /> : <>여정을 계속하기 <ArrowRight className="w-6 h-6" /></>}
            </button>
          </div>
        ) : state.currentCard && (
          <div className="w-full flex flex-col items-center gap-6">
            <GameCard card={state.currentCard} onChoice={handleChoice} disabled={loading} />
            {loading && (
              <div className="flex items-center gap-3 py-2 px-4 bg-white/5 rounded-full backdrop-blur-md border border-white/5 animate-pulse">
                <Loader2 className="w-3 h-3 text-white/40 animate-spin" />
                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">Drawing Next Chapter</span>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="py-4 text-[8px] text-white/10 font-black uppercase tracking-[0.4em] text-center w-full shrink-0">
        Concrete Jungle Survivor • 2025
      </footer>
    </div>
  );
};
