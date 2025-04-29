import React from 'react';
import { Mail, MapPin, Phone, Link as LinkIcon, Linkedin } from 'lucide-react';
import { ResumeData } from '../../../types';
import { getColorClasses } from '../../../utils/templateHelpers';

interface TemplateProps {
  resume: ResumeData;
  isDarkMode: boolean;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ resume, isDarkMode }) => {
  const { bgClass, textClass, borderClass } = getColorClasses(resume.colorScheme);
  
  return (
    <div className={`resume-page w-full min-h-[1056px] ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: resume.primaryFont }}>
            {resume.personalInfo.name || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm" style={{ fontFamily: resume.secondaryFont }}>
            {resume.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail size={14} className="text-gray-500 dark:text-gray-400" />
                {resume.personalInfo.email}
              </span>
            )}
            
            {resume.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone size={14} className="text-gray-500 dark:text-gray-400" />
                {resume.personalInfo.phone}
              </span>
            )}
            
            {resume.personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
                {resume.personalInfo.location}
              </span>
            )}
            
            {resume.personalInfo.website && (
              <span className="flex items-center gap-1">
                <LinkIcon size={14} className="text-gray-500 dark:text-gray-400" />
                {resume.personalInfo.website}
              </span>
            )}
            
            {resume.personalInfo.linkedIn && (
              <span className="flex items-center gap-1">
                <Linkedin size={14} className="text-gray-500 dark:text-gray-400" />
                {resume.personalInfo.linkedIn}
              </span>
            )}
          </div>
        </div>
        
        {resume.personalInfo.summary && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
              Summary
            </h2>
            <div className={`w-full h-1 ${bgClass} mb-3`}></div>
            <p className="text-sm" style={{ fontFamily: resume.secondaryFont }}>
              {resume.personalInfo.summary}
            </p>
          </div>
        )}
        
        {resume.experiences.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
              Experience
            </h2>
            <div className={`w-full h-1 ${bgClass} mb-3`}></div>
            
            <div className="space-y-4" style={{ fontFamily: resume.secondaryFont }}>
              {resume.experiences.map((experience, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{experience.title}</h3>
                      <p className="text-sm font-medium">{experience.organization}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {experience.startDate && new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {experience.current 
                          ? 'Present' 
                          : experience.endDate 
                            ? new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                            : ''
                        }
                      </p>
                      {experience.location && (
                        <p className="text-sm">{experience.location}</p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm mt-2">{experience.description}</p>
                  
                  {experience.highlights && experience.highlights.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {experience.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resume.educations.length > 0 && (
            <div>
              <h2 className={`text-xl font-bold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
                Education
              </h2>
              <div className={`w-full h-1 ${bgClass} mb-3`}></div>
              
              <div className="space-y-3" style={{ fontFamily: resume.secondaryFont }}>
                {resume.educations.map((education, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{education.title}</h3>
                    <p className="text-sm">{education.organization}</p>
                    <p className="text-sm">
                      {education.startDate && new Date(education.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {' - '}
                      {education.current 
                        ? 'Present' 
                        : education.endDate 
                          ? new Date(education.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                          : ''
                      }
                    </p>
                    {education.description && (
                      <p className="text-sm mt-1">{education.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resume.skills.length > 0 && (
            <div>
              <h2 className={`text-xl font-bold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
                Skills
              </h2>
              <div className={`w-full h-1 ${bgClass} mb-3`}></div>
              
              <div className="flex flex-wrap gap-2" style={{ fontFamily: resume.secondaryFont }}>
                {resume.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;