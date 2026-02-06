
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { GameCard as IGameCard, CharacterArchetype } from '../types.ts';

interface GameCardProps {
  card: IGameCard;
  onChoice: (side: 'left' | 'right') => void;
  onDrag?: (direction: 'left' | 'right' | null, progress: number) => void;
  disabled?: boolean;
}

const ARCHETYPE_LABELS: Record<CharacterArchetype, string> = {
  [CharacterArchetype.MENTOR]: '지혜로운 스승',
  [CharacterArchetype.ANTAGONIST]: '탐욕스런 경쟁자',
  [CharacterArchetype.SHADOW]: '달콤한 유혹자',
  [CharacterArchetype.HERALD]: '사건의 전령',
  [CharacterArchetype.GUARDIAN]: '장벽의 수호자',
  [CharacterArchetype.ALLY]: '불안한 동료'
};

export const GameCard: React.FC<GameCardProps> = ({ card, onChoice, onDrag, disabled }) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Stamps opacity
  const leftOpacity = useTransform(x, [-150, -20], [1, 0]);
  const rightOpacity = useTransform(x, [20, 150], [0, 1]);

  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    // Report drag progress
    const unsubscribe = x.on("change", (latest) => {
      if (!onDrag || exitDirection) return;
      const progress = Math.min(Math.abs(latest) / 100, 1);
      if (latest > 10) onDrag('right', progress);
      else if (latest < -10) onDrag('left', progress);
      else onDrag(null, 0);
    });
    return () => unsubscribe();
  }, [x, onDrag, exitDirection]);

  useEffect(() => {
    x.set(0);
    setExitDirection(null);
    controls.start({ x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } });
  }, [card.id, controls, x]);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    if (disabled || exitDirection) return;

    const threshold = 100;
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || velocity > 500) {
      setExitDirection('right');
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
      onChoice('right');
    } else if (info.offset.x < -threshold || velocity < -500) {
      setExitDirection('left');
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
      onChoice('left');
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <div className="relative w-full max-w-[340px] aspect-[3/4.5] select-none touch-none perspective-1000 flex justify-center items-center">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, rotate, opacity }}
        className="absolute w-full h-full bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] border border-white/10 cursor-grab active:cursor-grabbing will-change-transform z-20"
      >
        <div className="h-full flex flex-col relative">
          {/* Stamps */}
          <motion.div
            style={{ opacity: rightOpacity }}
            className="absolute top-10 right-6 z-50 px-6 py-2 border-4 rounded-xl font-black text-xl uppercase tracking-tight shadow-lg border-emerald-500 text-emerald-500 -rotate-6 pointer-events-none"
          >
            {card.rightChoice.text.split(' ')[0]}
          </motion.div>

          <motion.div
            style={{ opacity: leftOpacity }}
            className="absolute top-10 left-6 z-50 px-6 py-2 border-4 rounded-xl font-black text-xl uppercase tracking-tight shadow-lg border-rose-600 text-rose-600 rotate-6 pointer-events-none"
          >
            {card.leftChoice.text.split(' ')[0]}
          </motion.div>

          {/* Art */}
          <div className="relative h-[60%] shrink-0 pointer-events-none">
            <img
              src={card.image}
              alt={card.character}
              className="w-full h-full object-cover grayscale-[0.2]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-2 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[8px] font-black text-white/80 tracking-widest uppercase">
                {ARCHETYPE_LABELS[card.archetype]}
              </span>
            </div>

            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-2xl font-black text-white italic tracking-tighter drop-shadow-md">
                {card.character}
              </h2>
            </div>
          </div>

          {/* Dialogue */}
          <div className="flex-1 p-6 flex flex-col justify-center bg-zinc-950 pointer-events-none">
            <p className="text-zinc-200 text-base font-medium leading-relaxed italic text-center">
              "{card.dialogue}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Visual Stack Layers - Static background layers for depth effect */}
      <div className="absolute w-full h-full -z-10 translate-y-3 scale-[0.95] bg-zinc-800/40 rounded-[2.5rem] border border-white/5" />
      <div className="absolute w-full h-full -z-20 translate-y-6 scale-[0.9] bg-zinc-900/40 rounded-[2.5rem] border border-white/5" />
    </div>
  );
};
