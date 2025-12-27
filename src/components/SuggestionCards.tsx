import React from 'react';
import type { Mode, SuggestionPrompt } from '../types';

interface SuggestionCardsProps {
  mode: Mode;
  onSelect: (prompt: string) => void;
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ mode, onSelect }) => {
  const suggestionsByMode: Record<Mode, SuggestionPrompt[]> = {
    food: [
      {
        id: 'food-1',
        text: "Evening snacks near Mysore Palace under ₹150 (veg)",
        mode: 'food'
      },
      {
        id: 'food-2',
        text: "Where can I try authentic Mysore Pak for gifting?",
        mode: 'food'
      },
      {
        id: 'food-3',
        text: "Best breakfast spots locals recommend in Mysuru",
        mode: 'food'
      },
      {
        id: 'food-4',
        text: "Traditional South Indian thali places near city center",
        mode: 'food'
      }
    ],
    dasara: [
      {
        id: 'dasara-1',
        text: "First-time Jamboo Savari plan for my family",
        mode: 'dasara'
      },
      {
        id: 'dasara-2',
        text: "What should I wear and avoid during Dasara?",
        mode: 'dasara'
      },
      {
        id: 'dasara-3',
        text: "Best viewing spots for Dasara procession",
        mode: 'dasara'
      },
      {
        id: 'dasara-4',
        text: "Dasara exhibition and cultural events schedule",
        mode: 'dasara'
      }
    ],
    walks: [
      {
        id: 'walks-1',
        text: "Half-day heritage + market walk starting near Palace",
        mode: 'walks'
      },
      {
        id: 'walks-2',
        text: "Sunset walk that's not too crowded",
        mode: 'walks'
      },
      {
        id: 'walks-3',
        text: "Morning walk route with good photo spots",
        mode: 'walks'
      },
      {
        id: 'walks-4',
        text: "Easy walking route for elderly visitors",
        mode: 'walks'
      }
    ]
  };

  const suggestions = suggestionsByMode[mode];

  const title =
    mode === 'food' ? 'Food suggestions'
      : mode === 'dasara' ? 'Dasara suggestions'
      : 'Walk suggestions';

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#e2c9a2] p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#4b2b1a]">{title}</p>
        <span className="text-[11px] text-[#3b3126] capitalize">{mode}</span>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {suggestions.map(suggestion => (
          <button
            key={suggestion.id}
            type="button"
            onClick={() => onSelect(suggestion.text)}
            className="w-full text-left rounded-xl border border-[#e2c9a2] px-3 py-2 text-xs text-[#3b3126] bg-[#fef3c7]/30 hover:bg-[#fef3c7]/50 transition-colors"
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SuggestionCards;