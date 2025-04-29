import React from 'react';
import { FormStepProps } from '../../../types';
import { useResumeStore } from '../../../store/resumeStore';
import { AlertCircle, Info } from 'lucide-react';

const PersonalInfoForm: React.FC<FormStepProps> = ({ onNext }) => {
  const personalInfo = useResumeStore((state) => state.resume.personalInfo);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePersonalInfo({
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  
  const isFormValid = () => {
    return [
      personalInfo.name,
      personalInfo.email,
      personalInfo.phone,
      personalInfo.location,
      personalInfo.summary
    ].every(field => field.trim() !== '');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            className="input-field"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="input-field"
            placeholder="johndoe@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="form-label">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="(123) 456-7890"
            required
          />
        </div>
        
        <div>
          <label htmlFor="location" className="form-label">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            className="input-field"
            placeholder="City, State"
            required
          />
        </div>
        
        <div>
          <label htmlFor="website" className="form-label">
            <span>Personal Website</span>
            <span className="has-tooltip ml-1">
              <Info size={14} className="inline text-gray-500" />
              <span className="tooltip">Having a personal website or portfolio increases your visibility</span>
            </span>
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            className="input-field"
            placeholder="https://yourwebsite.com"
          />
        </div>
        
        <div>
          <label htmlFor="linkedIn" className="form-label">
            <span>LinkedIn</span>
            <span className="has-tooltip ml-1">
              <Info size={14} className="inline text-gray-500" />
              <span className="tooltip">LinkedIn profile greatly enhances your professional presence</span>
            </span>
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            value={personalInfo.linkedIn}
            onChange={handleChange}
            className="input-field"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="summary" className="form-label">
          <span>Professional Summary *</span>
          <span className="has-tooltip ml-1">
            <Info size={14} className="inline text-gray-500" />
            <span className="tooltip">Write a compelling summary of your skills and experience</span>
          </span>
        </label>
        <textarea
          id="summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          className="input-field h-24 resize-none"
          placeholder="Highly motivated professional with experience in..."
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          <AlertCircle size={14} className="inline mr-1" />
          Your summary should be concise (3-5 sentences) and highlight your most relevant skills and experience.
        </p>
      </div>
      
      <div className="pt-4">
        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={!isFormValid()}
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;