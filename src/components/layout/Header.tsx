import React, { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ArrowUpRight className="text-blue-600 dark:text-blue-400 transform rotate-45" size={28} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Elevate<span className="text-blue-600 dark:text-blue-400">CV</span>
            </h1>
          </div>
          
          <div>
            {children}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;