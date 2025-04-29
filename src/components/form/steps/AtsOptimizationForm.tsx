import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, Info, Search, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { FormStepProps } from '../../../types';
import { useResumeStore } from '../../../store/resumeStore';

const AtsOptimizationForm: React.FC<FormStepProps> = ({ onPrevious }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const resume = useResumeStore((state) => state.resume);
  const atsScore = useResumeStore((state) => state.atsScore);
  const suggestions = useResumeStore((state) => state.suggestions);
  const updateAtsScore = useResumeStore((state) => state.updateAtsScore);
  const updateSuggestions = useResumeStore((state) => state.updateSuggestions);
  
  // Simulated analysis function (in a real app, this would call an API)
  const analyzeResume = () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description to analyze');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Calculate a simple score based on matching skills
      const jdWords = jobDescription.toLowerCase().split(/\s+/);
      const resumeSkills = resume.skills.map(skill => skill.toLowerCase());
      const resumeText = [
        resume.personalInfo.summary,
        ...resume.experiences.map(exp => exp.description),
        ...resumeSkills
      ].join(' ').toLowerCase();
      
      // Count matching skills
      const matchingSkills = resumeSkills.filter(skill => 
        jdWords.some(word => word.includes(skill))
      );
      
      // Count key terms from job description found in resume
      const keyTerms = [...new Set(jdWords.filter(word => 
        word.length > 3 && !['and', 'the', 'with', 'that', 'this', 'for', 'you'].includes(word)
      ))];
      
      const matchingTerms = keyTerms.filter(term => resumeText.includes(term));
      
      // Calculate score - this is a simplified version
      const calculatedScore = Math.min(
        100, 
        Math.round(
          (matchingSkills.length / Math.max(1, resumeSkills.length)) * 40 + 
          (matchingTerms.length / Math.max(1, keyTerms.length)) * 60
        )
      );
      
      // Generate mock suggestions
      const mockSuggestions = [];
      
      if (calculatedScore < 80) {
        // Find important terms from job description not in resume
        const missingTerms = keyTerms.filter(term => 
          !resumeText.includes(term) && 
          Math.random() > 0.7 // Randomly select some terms
        ).slice(0, 3);
        
        if (missingTerms.length > 0) {
          mockSuggestions.push(`Consider adding these keywords: ${missingTerms.join(', ')}`);
        }
        
        if (resume.experiences.length < 2) {
          mockSuggestions.push('Add more work experiences to showcase your career progression');
        }
        
        if (resume.personalInfo.summary.split(' ').length < 20) {
          mockSuggestions.push('Expand your professional summary to highlight key qualifications');
        }
        
        if (resumeSkills.length < 5) {
          mockSuggestions.push('Add more relevant skills that match the job requirements');
        }
      }
      
      // If we don't have enough suggestions, add generic ones
      if (mockSuggestions.length < 2) {
        mockSuggestions.push('Quantify your achievements with numbers and percentages');
        mockSuggestions.push('Use action verbs to describe your responsibilities');
      }
      
      updateAtsScore(calculatedScore);
      updateSuggestions(mockSuggestions);
      setIsAnalyzing(false);
      
      toast.success('Resume analyzed successfully');
    }, 1500);
  };
  
  // Reset analysis when component unmounts
  useEffect(() => {
    return () => {
      updateAtsScore(0);
      updateSuggestions([]);
    };
  }, [updateAtsScore, updateSuggestions]);
  
  const getScoreColor = () => {
    if (atsScore >= 80) return 'text-green-600 dark:text-green-400';
    if (atsScore >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getScoreBackground = () => {
    if (atsScore >= 80) return 'bg-green-600 dark:bg-green-500';
    if (atsScore >= 60) return 'bg-yellow-600 dark:bg-yellow-500';
    return 'bg-red-600 dark:bg-red-500';
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 dark:text-blue-400 mt-1">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">ATS Optimization</h3>
            <p className="text-blue-700 dark:text-blue-200 mt-1">
              Most companies use Applicant Tracking Systems (ATS) to filter resumes. Optimize your resume by analyzing it against a specific job description.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="jobDescription" className="form-label">
          Paste Job Description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="input-field h-32 resize-none"
          placeholder="Paste the job description here to analyze your resume for ATS compatibility..."
        />
      </div>
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={analyzeResume}
          disabled={isAnalyzing}
          className="btn btn-primary flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Analyzing...
            </>
          ) : (
            <>
              <Search size={16} />
              Analyze Resume
            </>
          )}
        </button>
      </div>
      
      {atsScore > 0 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">ATS Compatibility Score</h3>
            <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${getScoreBackground()} transition-all duration-1000 ease-out`}
                style={{ width: `${atsScore}%` }}
              />
            </div>
            <p className={`text-2xl font-bold mt-2 ${getScoreColor()}`}>
              {atsScore}%
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {atsScore >= 80 ? (
                <span className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                  <Check size={16} /> Great job! Your resume is well-optimized for this position.
                </span>
              ) : atsScore >= 60 ? (
                <span>Your resume is somewhat optimized but could be improved.</span>
              ) : (
                <span className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400">
                  <AlertTriangle size={16} /> Your resume needs significant optimization for this position.
                </span>
              )}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Improvement Suggestions</h3>
            {suggestions.length > 0 ? (
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                      <Info size={16} />
                    </div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No specific suggestions at this time. Your resume looks good!
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-6">
        <button type="button" onClick={onPrevious} className="btn btn-secondary">
          Back
        </button>
        <button 
          type="button" 
          onClick={() => toast.success('Resume ready for export!')}
          className="btn btn-success flex items-center gap-2"
        >
          <Upload size={16} />
          Finalize Resume
        </button>
      </div>
    </div>
  );
};

export default AtsOptimizationForm;