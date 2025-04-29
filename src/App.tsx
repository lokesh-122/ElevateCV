import React, { useEffect, useState } from 'react';
import { ClipboardCheck, Download, Moon, Save, Sun } from 'lucide-react';
import { toast } from 'sonner';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FormWizard from './components/form/FormWizard';
import ResumePreview from './components/preview/ResumePreview';
import WelcomeScreen from './components/WelcomeScreen';
import { useResumeStore } from './store/resumeStore';
import { generatePDF } from './utils/pdfExport';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const resume = useResumeStore((state) => state.resume);
  const resetResume = useResumeStore((state) => state.resetResume);
  const loadResume = useResumeStore((state) => state.loadResume);

  useEffect(() => {
    // Check if dark mode preference was saved
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    
    // Check if there's a saved resume draft
    const savedDraft = localStorage.getItem('resumeDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        loadResume(parsedDraft);
      } catch (error) {
        console.error('Failed to load saved draft:', error);
      }
    }
    
    // Check if user has seen welcome screen
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome') === 'true';
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, [loadResume]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  const handleStartBuilding = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleSaveDraft = () => {
    localStorage.setItem('resumeDraft', JSON.stringify(resume));
    toast.success('Resume draft saved successfully');
  };

  const handleExportPDF = () => {
    generatePDF(resume).then(() => {
      toast.success('Resume exported as PDF');
    }).catch((error) => {
      console.error('PDF export failed:', error);
      toast.error('Failed to export PDF');
    });
  };

  const handleNewResume = () => {
    if (confirm('Are you sure you want to start a new resume? All current data will be lost.')) {
      resetResume();
      toast.info('Started new resume');
    }
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStartBuilding} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={handleSaveDraft} 
            className="btn btn-secondary flex items-center gap-2"
          >
            <Save size={16} />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
          
          <button 
            onClick={handleExportPDF} 
            className="btn btn-primary flex items-center gap-2"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
          
          <button 
            onClick={handleNewResume} 
            className="btn btn-secondary flex items-center gap-2"
          >
            <ClipboardCheck size={16} />
            <span className="hidden sm:inline">New Resume</span>
          </button>
        </div>
      </Header>
      
      <main className="flex-1 px-4 md:px-6 py-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2 xl:w-2/5">
              <FormWizard />
            </div>
            <div className="lg:w-1/2 xl:w-3/5">
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;