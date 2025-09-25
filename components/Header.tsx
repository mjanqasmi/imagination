
import React from 'react';
import Button from './Button';
import LogoIcon from './icons/LogoIcon';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <LogoIcon className="h-8 w-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight">AI Image Studio</h1>
        </div>
        <Button onClick={onLogout} variant="secondary">
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default Header;
