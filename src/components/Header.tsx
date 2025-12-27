import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-serif font-semibold text-[#4b2b1a]">NammaMysuru</h1>
        <p className="text-xs text-[#3b3126]">Mysa · Mysuru local guide</p>
      </div>
      <span className="inline-flex h-7 px-3 items-center rounded-full bg-[#fef3c7] text-[#b45309] text-[11px] font-medium border border-[#e2c9a2]">
        ● Online
      </span>
    </header>
  );
};

export default Header;