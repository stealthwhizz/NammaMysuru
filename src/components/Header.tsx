import React from 'react';

/**
 * KIRO INTEGRATION: Header Component
 * 
 * This component was created with Kiro's assistance:
 * - Kiro helped design the heritage-inspired styling and color scheme
 * - Kiro guided the implementation of responsive typography
 * - The Tailwind CSS classes and gradient design were refined with Kiro's suggestions
 */

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-800 to-blue-900 text-white py-6 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-secondary-100">
          NammaMysuru
        </h1>
        <p className="text-lg md:text-xl text-heritage-paper font-light">
          Meet <strong className="font-semibold text-secondary-200">Mysa</strong>, your local guide for Mysuru's food, Dasara, and walks
        </p>
      </div>
    </header>
  );
};

export default Header;