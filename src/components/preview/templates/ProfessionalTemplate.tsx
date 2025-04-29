import React from 'react';
import { ResumeData } from '../../../types';
import { getColorClasses } from '../../../utils/templateHelpers';

interface TemplateProps {
  resume: ResumeData;
  isDarkMode: boolean;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ resume, isDarkMode }) => {
  const { bgClass, textClass, borderClass } = getColorClasses(resume.colorScheme);
  
  return (
    <div className={`resume-page w-full min-h-[1056px] ${isDarkMode ? 'dark' : ''}`}>
      <header className="px-8 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: resume.primaryFont }}>
              {resume.personalInfo.name || 'Your Name'}
            </h1>
          </div>
          
          <div className="text-right text-sm" style={{ fontFamily: resume.secondaryFont }}>
            {resume.personalInfo.email && (
              <p>{resume.personalInfo.email}</p>
            )}
            
            {resume.personalInfo.phone && (
              <p>{resume.personalInfo.phone}</p>
            )}
            
            {resume.personalInfo.location && (
              <p>{resume.personalInfo.location}</p>
            )}
            
            <div className="flex justify-end gap-3 mt-1">
              {resume.personalInfo.website && (
                <p>{resume.personalInfo.website}</p>
              )}
              
              {resume.personalInfo.linkedIn && (
                <p>{resume.personalInfo.linkedIn}</p>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="px-8 py-6">
        {resume.personalInfo.summary && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
              Professional Summary
            </h2>
            <div className={`w-full h-0.5 ${bgClass} mb-3`}></div>
            <p className="text-sm" style={{ fontFamily: resume.secondaryFont }}>
              {resume.personalInfo.summary}
            </p>
          </div>
        )}
        
        {resume.experiences.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
              Professional Experience
            </h2>
            <div className={`w-full h-0.5 ${bgClass} mb-3`}></div>
            
            <div className="space-y-4" style={{ fontFamily: resume.secondaryFont }}>
              {resume.experiences.map((experience, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{experience.title} | {experience.organization}</h3>
                    <span className="text-sm">
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
                  
                  {experience.location && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{experience.location}</p>
                  )}
                  
                  <p className="text-sm">{experience.description}</p>
                  
                  {experience.highlights && experience.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm">
                      {experience.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <span className={`${textClass} mr-2`}>•</span>
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
        
        {resume.educations.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
              Education
            </h2>
            <div className={`w-full h-0.5 ${bgClass} mb-3`}></div>
            
            <div className="space-y-3" style={{ fontFamily: resume.secondaryFont }}>
              {resume.educations.map((education, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{education.title}</h3>
                    <span className="text-sm">
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
                  
                  <p className="text-sm">{education.organization}</p>
                  
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
            <h2 className={`text-lg font-semibold ${textClass} mb-2`} style={{ fontFamily: resume.primaryFont }}>
              Skills
            </h2>
            <div className={`w-full h-0.5 ${bgClass} mb-3`}></div>
            
            <div className="flex flex-wrap gap-1" style={{ fontFamily: resume.secondaryFont }}>
              {resume.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className={`px-2 py-1 text-sm ${resume.colorScheme === 'blue' ? 'bg-blue-100 text-blue-800' : resume.colorScheme === 'green' ? 'bg-green-100 text-green-800' : resume.colorScheme === 'purple' ? 'bg-purple-100 text-purple-800' : resume.colorScheme === 'red' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} dark:bg-opacity-20 rounded`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;