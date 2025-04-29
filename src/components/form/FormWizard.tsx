import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';
import PersonalInfoForm from './steps/PersonalInfoForm';
import ExperienceForm from './steps/ExperienceForm';
import EducationForm from './steps/EducationForm';
import SkillsForm from './steps/SkillsForm';
import TemplateForm from './steps/TemplateForm';
import AtsOptimizationForm from './steps/AtsOptimizationForm';

const INSPIRATIONAL_TEXTS = {
  'Personal Info': "Make a strong first impression with your professional identity",
  'Experience': "Showcase your journey and achievements that make you stand out",
  'Education': "Highlight the foundation of your professional growth",
  'Skills': "Demonstrate your expertise and unique capabilities",
  'Template': "Choose a design that reflects your professional style",
  'ATS Check': "Optimize your resume for automated screening systems"
};

const FormWizard: React.FC = () => {
  const currentStep = useResumeStore((state) => state.currentStep);
  const setCurrentStep = useResumeStore((state) => state.setCurrentStep);
  
  const steps = [
    { title: 'Personal Info', component: PersonalInfoForm },
    { title: 'Experience', component: ExperienceForm },
    { title: 'Education', component: EducationForm },
    { title: 'Skills', component: SkillsForm },
    { title: 'Template', component: TemplateForm },
    { title: 'ATS Check', component: AtsOptimizationForm },
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="section-card animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold">
            {steps[currentStep].title}
          </h2>
          <div className="color-accent floating-accent" />
        </div>
        
        <div className="inspiration-container">
          <p className="inspiration-text">
            {INSPIRATIONAL_TEXTS[steps[currentStep].title as keyof typeof INSPIRATIONAL_TEXTS]}
          </p>
        </div>
        
        <div className="relative mb-6">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
            <div 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 dark:bg-blue-500 transition-all duration-500"
            />
          </div>
          
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-200 transform hover:scale-110
                  ${index <= currentStep
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }
                  ${index === currentStep && 'ring-2 ring-blue-300 dark:ring-blue-700'}
                `}
                onClick={() => setCurrentStep(index)}
                aria-label={`Go to step ${index + 1}: ${step.title}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <CurrentStepComponent onNext={handleNext} onPrevious={handlePrevious} />
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`btn flex items-center gap-1 ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              : 'btn-secondary'
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className={`btn flex items-center gap-1 ${
            currentStep === steps.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              : 'btn-primary'
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default FormWizard;