import React from 'react';
import { ResumeData } from '../../../types';
import { getColorClasses } from '../../../utils/templateHelpers';

interface TemplateProps {
  resume: ResumeData;
  isDarkMode: boolean;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ resume, isDarkMode }) => {
  const { textClass } = getColorClasses(resume.colorScheme);
  
  return (
    <div className={`resume-page w-full min-h-[1056px] ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto max-w-4xl px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: resume.primaryFont }}>
            {resume.personalInfo.name || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: resume.secondaryFont }}>
            {resume.personalInfo.email && (
              <span>{resume.personalInfo.email}</span>
            )}
            
            {resume.personalInfo.phone && (
              <span>{resume.personalInfo.phone}</span>
            )}
            
            {resume.personalInfo.location && (
              <span>{resume.personalInfo.location}</span>
            )}
            
            {resume.personalInfo.website && (
              <span>{resume.personalInfo.website}</span>
            )}
            
            {resume.personalInfo.linkedIn && (
              <span>{resume.personalInfo.linkedIn}</span>
            )}
          </div>
        </div>
        
        {resume.personalInfo.summary && (
          <div className="mb-8">
            <p className="text-sm leading-relaxed" style={{ fontFamily: resume.secondaryFont }}>
              {resume.personalInfo.summary}
            </p>
          </div>
        )}
        
        {resume.experiences.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-lg font-semibold ${textClass} mb-4`} style={{ fontFamily: resume.primaryFont }}>
              Experience
            </h2>
            
            <div className="space-y-6" style={{ fontFamily: resume.secondaryFont }}>
              {resume.experiences.map((experience, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium">{experience.title}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {experience.startDate && new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {' - '}
                      {experience.current 
                        ? 'Present' 
                        : experience.endDate 
                          ? new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                          : ''
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{experience.organization}</p>
                    {experience.location && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{experience.location}</p>
                    )}
                  </div>
                  
                  <p className="text-sm">{experience.description}</p>
                  
                  {experience.highlights && experience.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm">
                      {experience.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resume.educations.length > 0 && (
            <div>
              <h2 className={`text-lg font-semibold ${textClass} mb-4`} style={{ fontFamily: resume.primaryFont }}>
                Education
              </h2>
              
              <div className="space-y-4" style={{ fontFamily: resume.secondaryFont }}>
                {resume.educations.map((education, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-medium">{education.title}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {education.startDate && new Date(education.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {education.current 
                          ? 'Present' 
                          : education.endDate 
                            ? new Date(education.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                            : ''
                        }
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300">{education.organization}</p>
                    
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
              <h2 className={`text-lg font-semibold ${textClass} mb-4`} style={{ fontFamily: resume.primaryFont }}>
                Skills
              </h2>
              
              <div style={{ fontFamily: resume.secondaryFont }}>
                <p className="text-sm">
                  {resume.skills.join(' • ')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;