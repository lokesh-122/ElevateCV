import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

const ResumePreview: React.FC = () => {
  const resume = useResumeStore((state) => state.resume);
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const renderTemplate = () => {
    switch (resume.template) {
      case 'modern':
        return <ModernTemplate resume={resume} isDarkMode={isDarkMode} />;
      case 'classic':
        return <ClassicTemplate resume={resume} isDarkMode={isDarkMode} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} isDarkMode={isDarkMode} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} isDarkMode={isDarkMode} />;
      default:
        return <ModernTemplate resume={resume} isDarkMode={isDarkMode} />;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
      
      <div className="w-full overflow-auto max-h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="w-full template-transition">
          {renderTemplate()}
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        This is how your resume will appear when exported as a PDF.
      </p>
    </div>
  );
};

export default ResumePreview;