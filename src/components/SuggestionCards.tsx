import React from 'react';
import type { Mode, SuggestionPrompt } from '../types';

/**
 * KIRO INTEGRATION: SuggestionCards Component
 * 
 * This component was developed with Kiro's assistance:
 * - Kiro helped design the mode-specific suggestion prompts and their content
 * - Kiro guided the implementation of the responsive grid layout and card styling
 * - The mode-specific color schemes and hover effects were refined with Kiro's input
 * - Kiro assisted in creating engaging and contextually relevant suggestion text
 */

interface SuggestionCardsProps {
  mode: Mode;
  onSelect: (prompt: string) => void;
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ mode, onSelect }) => {
  // Define suggestion prompts for each mode
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

  const getModeIcon = (mode: Mode) => {
    switch (mode) {
      case 'food': return '🍽️';
      case 'dasara': return '🎉';
      case 'walks': return '🏛️';
      default: return '💬';
    }
  };

  const getModeColor = (mode: Mode) => {
    switch (mode) {
      case 'food': return 'from-secondary-100 to-secondary-50 border-secondary-200 hover:from-secondary-200 hover:to-secondary-100';
      case 'dasara': return 'from-primary-100 to-primary-50 border-primary-200 hover:from-primary-200 hover:to-primary-100';
      case 'walks': return 'from-accent-100 to-accent-50 border-accent-200 hover:from-accent-200 hover:to-accent-100';
      default: return 'from-gray-100 to-gray-50 border-gray-200 hover:from-gray-200 hover:to-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" role="img" aria-label={mode}>
          {getModeIcon(mode)}
        </span>
        <div>
          <h3 className="font-serif font-semibold text-lg text-heritage-text capitalize">
            {mode} Suggestions
          </h3>
          <p className="text-sm text-gray-600">
            Click any suggestion to start chatting with Mysa
          </p>
        </div>
      </div>

      {/* Suggestion Cards Grid */}
      <div className="grid gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion.text)}
            aria-label={`Suggestion: ${suggestion.text}`}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200 
              bg-gradient-to-br ${getModeColor(mode)}
              hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              min-h-[60px] group
            `}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1 group-hover:scale-110 transition-transform duration-200">
                💭
              </span>
              <p className="text-sm font-medium text-heritage-text leading-relaxed">
                {suggestion.text}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Or type your own question in the chat above
        </p>
      </div>
    </div>
  );
};

export default SuggestionCards;