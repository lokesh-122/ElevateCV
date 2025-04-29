import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div className="mb-2 md:mb-0">
            <p>© {new Date().getFullYear()} ElevateCV. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart size={14} className="text-red-500" /> for professionals
            </span>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;