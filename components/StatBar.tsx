import React from 'react';
import { StatType, Stats } from '../types.ts';
import { Wallet, Brain, TrendingUp, ShieldAlert } from 'lucide-react';

interface StatBarProps {
  stats: Stats;
}

const StatIcon = ({ type }: { type: StatType }) => {
  switch (type) {
    case StatType.ASSET: return <Wallet className="w-5 h-5 text-green-400" />;
    case StatType.MENTAL: return <Brain className="w-5 h-5 text-pink-400" />;
    case StatType.FOMO: return <TrendingUp className="w-5 h-5 text-red-500" />;
    case StatType.REGULATION: return <ShieldAlert className="w-5 h-5 text-blue-400" />;
  }
};

const StatItem = ({ type, value }: { type: StatType, value: number }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const getLabel = (t: StatType): string => {
    switch (t) {
      case StatType.ASSET: return '자산';
      case StatType.MENTAL: return '멘탈';
      case StatType.FOMO: return '광기';
      case StatType.REGULATION: return '규제';
      default: return '';
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <StatIcon type={type} />
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
        <div
          className={`h-full transition-all duration-700 ease-in-out ${clampedValue > 85 ? 'bg-red-600 animate-pulse' : clampedValue < 15 ? 'bg-orange-500' : 'bg-white'
            }`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{getLabel(type)}</span>
    </div>
  );
};

export const StatBar: React.FC<StatBarProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-black/60 backdrop-blur-md rounded-2xl w-full max-w-md border border-white/5 shadow-2xl">
      <StatItem type={StatType.ASSET} value={stats[StatType.ASSET]} />
      <StatItem type={StatType.MENTAL} value={stats[StatType.MENTAL]} />
      <StatItem type={StatType.FOMO} value={stats[StatType.FOMO]} />
      <StatItem type={StatType.REGULATION} value={stats[StatType.REGULATION]} />
    </div>
  );
};