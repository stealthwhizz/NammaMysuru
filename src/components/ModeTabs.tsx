import React from 'react';
import type { Mode } from '../types';

interface ModeTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const ModeTabs: React.FC<ModeTabsProps> = ({ mode, onChange }) => {
  const modes = [
    { id: 'food' as Mode, label: 'Food', icon: '🍽️' },
    { id: 'dasara' as Mode, label: 'Dasara', icon: '🎉' },
    { id: 'walks' as Mode, label: 'Walks', icon: '🏛️' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {modes.map(m => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className={[
            "flex flex-col items-center justify-center py-3 rounded-2xl text-[11px] font-medium transition-all",
            m.id === mode
              ? "bg-[#b45309] text-white shadow-md"
              : "bg-white/80 text-[#3b3126] border border-[#e2c9a2] hover:bg-white/90"
          ].join(" ")}
        >
          <span className="text-lg mb-1">{m.icon}</span>
          {m.label}
        </button>
      ))}
    </div>
  );
};

export default ModeTabs;