
import React, { useState, useRef, useEffect } from 'react';
import { GameCard as IGameCard, CharacterArchetype } from '../types.ts';

interface GameCardProps {
  card: IGameCard;
  onChoice: (side: 'left' | 'right') => void;
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

export const GameCard: React.FC<GameCardProps> = ({ card, onChoice, disabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const SWIPE_THRESHOLD = 80; // Reduced for easier swipe
  const rotation = position.x / 12; // Damped rotation

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setExitDirection(null);
    setIsDragging(false);
  }, [card.id]);

  const triggerChoice = (side: 'left' | 'right') => {
    setExitDirection(side);
    setTimeout(() => {
      onChoice(side);
    }, 250); // Faster transition
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled || exitDirection) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    if (cardRef.current) cardRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || exitDirection) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    // Smoother drag feel
    setPosition({ x: dx, y: dy * 0.15 });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || exitDirection) return;
    setIsDragging(false);
    if (cardRef.current) cardRef.current.releasePointerCapture(e.pointerId);

    if (position.x > SWIPE_THRESHOLD) {
      triggerChoice('right');
    } else if (position.x < -SWIPE_THRESHOLD) {
      triggerChoice('left');
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const opacity = Math.min(Math.abs(position.x) / SWIPE_THRESHOLD, 1);

  return (
    <div className="relative w-full max-w-[340px] aspect-[3/4.5] select-none touch-none perspective-1000">
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`w-full h-full bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] border border-white/10 transition-transform will-change-transform ${
          !isDragging && !exitDirection ? 'duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)' : ''
        }`}
        style={{
          transform: exitDirection 
            ? `translate3d(${exitDirection === 'left' ? -1000 : 1000}px, 0, 0) rotate(${exitDirection === 'left' ? -35 : 35}deg)`
            : `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <div className="h-full flex flex-col relative">
          {/* Stamps */}
          {Math.abs(position.x) > 30 && (
            <div 
              className={`absolute top-10 z-50 px-6 py-2 border-4 rounded-xl font-black text-xl uppercase tracking-tight shadow-lg pointer-events-none ${
                position.x > 0 
                  ? 'right-6 border-emerald-500 text-emerald-500 -rotate-6' 
                  : 'left-6 border-rose-600 text-rose-600 rotate-6'
              }`}
              style={{ opacity: opacity }}
            >
              {position.x > 0 ? card.rightChoice.text.split(' ')[0] : card.leftChoice.text.split(' ')[0]}
            </div>
          )}

          {/* Art */}
          <div className="relative h-[60%] shrink-0">
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
          <div className="flex-1 p-6 flex flex-col justify-center bg-zinc-950">
            <p className="text-zinc-200 text-base font-medium leading-relaxed italic text-center">
              "{card.dialogue}"
            </p>
          </div>
        </div>
      </div>
      
      {/* Visual Stack Layers */}
      <div className="absolute inset-0 -z-10 translate-y-3 scale-[0.95] bg-zinc-800/40 rounded-[2.5rem] border border-white/5" />
      <div className="absolute inset-0 -z-20 translate-y-6 scale-[0.9] bg-zinc-900/40 rounded-[2.5rem] border border-white/5" />
    </div>
  );
};
