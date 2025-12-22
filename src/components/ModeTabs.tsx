import React from 'react';
import type { Mode } from '../types';

/**
 * KIRO INTEGRATION: ModeTabs Component
 * 
 * This component was developed with Kiro's assistance:
 * - Kiro helped design the pill-style button layout and active state styling
 * - Kiro guided the implementation of accessibility features (ARIA labels, focus states)
 * - The responsive design and hover effects were refined with Kiro's input
 * - Icon selection and mode-specific styling were discussed with Kiro
 */

interface ModeTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const ModeTabs: React.FC<ModeTabsProps> = ({ mode, onChange }) => {
  const tabs = [
    { mode: 'food' as Mode, label: 'Food', icon: '🍽️' },
    { mode: 'dasara' as Mode, label: 'Dasara', icon: '🎉' },
    { mode: 'walks' as Mode, label: 'Walks', icon: '🏛️' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          onClick={() => onChange(tab.mode)}
          aria-label={`Switch to ${tab.label} mode`}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ease-in-out
            ${mode === tab.mode
              ? 'bg-primary-600 text-white shadow-lg transform scale-105 ring-2 ring-primary-300'
              : 'bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800 shadow-sm hover:shadow-md hover:scale-102'
            }
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            min-h-[44px] min-w-[100px] active:scale-95
          `}
        >
          <span className={`text-lg transition-transform duration-200 ${mode === tab.mode ? 'animate-pulse' : 'group-hover:scale-110'}`} role="img" aria-label={tab.label}>
            {tab.icon}
          </span>
          <span className="font-sans font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeTabs;