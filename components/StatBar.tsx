import React from 'react';
import { StatType, Stats } from '../types.ts';
import { Wallet, Brain, TrendingUp, Heart } from 'lucide-react';


interface StatBarProps {
  stats: Stats;
  previewImpact?: Partial<Record<StatType, number>> | null;
}

const StatIcon = ({ type, impact }: { type: StatType, impact?: number }) => {
  const baseIcon = (() => {
    switch (type) {
      case StatType.ASSET: return <Wallet className="w-5 h-5 text-green-400" />;
      case StatType.MENTAL: return <Brain className="w-5 h-5 text-pink-400" />;
      case StatType.FOMO: return <TrendingUp className="w-5 h-5 text-red-500" />;
      case StatType.HEALTH: return <Heart className="w-5 h-5 text-blue-400" />;
    }
  })();

  return (
    <div className="relative">
      {baseIcon}
      {impact !== undefined && impact !== 0 && (
        <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-black ${impact > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
      )}
    </div>
  );
};

const StatItem = ({ type, value, impact }: { type: StatType, value: number, impact?: number }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const getLabel = (t: StatType): string => {
    switch (t) {
      case StatType.ASSET: return '자산';
      case StatType.MENTAL: return '멘탈';
      case StatType.FOMO: return '광기';
      case StatType.HEALTH: return '체력';
    }
  }

  return (
    <div className={`flex flex-col items-center gap-1 w-full transition-transform duration-200 ${impact ? 'scale-110' : 'scale-100'}`}>
      <StatIcon type={type} impact={impact} />
      <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden border border-gray-600/50">
        <div
          className={`h-full transition-all duration-700 ease-in-out ${clampedValue > 85 ? 'bg-red-600 animate-pulse' : clampedValue < 15 ? 'bg-orange-500' : 'bg-white'
            }`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${impact ? 'text-white' : 'text-gray-500'}`}>
        {getLabel(type)}
      </span>
    </div>
  );
};

export const StatBar: React.FC<StatBarProps> = ({ stats, previewImpact }) => {
  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-black/60 backdrop-blur-md rounded-2xl w-full max-w-md border border-white/5 shadow-2xl">
      <StatItem type={StatType.ASSET} value={stats[StatType.ASSET]} impact={previewImpact?.[StatType.ASSET]} />
      <StatItem type={StatType.MENTAL} value={stats[StatType.MENTAL]} impact={previewImpact?.[StatType.MENTAL]} />
      <StatItem type={StatType.FOMO} value={stats[StatType.FOMO]} impact={previewImpact?.[StatType.FOMO]} />
      <StatItem type={StatType.HEALTH} value={stats[StatType.HEALTH]} impact={previewImpact?.[StatType.HEALTH]} />
    </div>
  );
};