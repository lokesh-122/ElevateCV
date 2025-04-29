import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles as FileSparkles, Search } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <ArrowUpRight className="text-blue-600 dark:text-blue-400 transform rotate-45" size={60} />
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Elevate<span className="text-blue-600 dark:text-blue-400">CV</span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Build beautiful, ATS-optimized resumes in minutes
          </p>
          
          <button 
            onClick={onStart}
            className="btn btn-primary text-lg px-6 py-3 shadow-lg hover:shadow-xl transition-all"
          >
            Start Building Now
            <ArrowRight className="inline-block ml-2" size={20} />
          </button>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileSparkles size={32} />}
              title="ATS Optimized"
              description="Get your resume past the applicant tracking systems with our AI-powered suggestions and scoring."
            />
            
            <FeatureCard 
              icon={<ArrowUpRight size={32} className="transform rotate-45" />}
              title="Professional Templates"
              description="Choose from multiple eye-catching resume templates designed for various industries and roles."
            />
            
            <FeatureCard 
              icon={<Search size={32} />}
              title="Real-time Preview"
              description="See your changes in real time as you build your perfect resume with our intuitive interface."
            />
          </div>
        </div>
      </div>
      
      <footer className="bg-white/50 dark:bg-gray-800/50 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ElevateCV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow animate-slide-up">
      <div className="text-blue-500 dark:text-blue-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default WelcomeScreen;