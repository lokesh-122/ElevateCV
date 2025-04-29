import React from 'react';
import { Mail, MapPin, Phone, Link as LinkIcon, Linkedin } from 'lucide-react';
import { ResumeData } from '../../../types';
import { getColorClasses } from '../../../utils/templateHelpers';

interface TemplateProps {
  resume: ResumeData;
  isDarkMode: boolean;
}

const ModernTemplate: React.FC<TemplateProps> = ({ resume, isDarkMode }) => {
  const { bgClass, textClass, borderClass } = getColorClasses(resume.colorScheme);
  
  return (
    <div className={`resume-page w-full min-h-[1056px] ${isDarkMode ? 'dark' : ''}`}>
      <div className={`w-full h-24 ${bgClass}`}>
        <div className="container mx-auto px-8 py-6">
          <h1 className={`text-3xl font-bold text-white`} style={{ fontFamily: resume.primaryFont }}>
            {resume.personalInfo.name || 'Your Name'}
          </h1>
          {resume.personalInfo.summary && (
            <p className="text-white text-sm mt-1 opacity-90" style={{ fontFamily: resume.secondaryFont }}>
              {resume.personalInfo.summary.substring(0, 100)}{resume.personalInfo.summary.length > 100 ? '...' : ''}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-6 bg-gray-100 dark:bg-gray-800">
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-semibold mb-3 ${textClass}`} style={{ fontFamily: resume.primaryFont }}>
                Contact Information
              </h2>
              <ul className="space-y-2" style={{ fontFamily: resume.secondaryFont }}>
                {resume.personalInfo.email && (
                  <li className="flex items-center gap-2 text-sm">
                    <Mail size={14} className="text-gray-500 dark:text-gray-400" />
                    <span>{resume.personalInfo.email}</span>
                  </li>
                )}
                {resume.personalInfo.phone && (
                  <li className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-gray-500 dark:text-gray-400" />
                    <span>{resume.personalInfo.phone}</span>
                  </li>
                )}
                {resume.personalInfo.location && (
                  <li className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
                    <span>{resume.personalInfo.location}</span>
                  </li>
                )}
                {resume.personalInfo.website && (
                  <li className="flex items-center gap-2 text-sm">
                    <LinkIcon size={14} className="text-gray-500 dark:text-gray-400" />
                    <span>{resume.personalInfo.website}</span>
                  </li>
                )}
                {resume.personalInfo.linkedIn && (
                  <li className="flex items-center gap-2 text-sm">
                    <Linkedin size={14} className="text-gray-500 dark:text-gray-400" />
                    <span>{resume.personalInfo.linkedIn}</span>
                  </li>
                )}
              </ul>
            </div>
            
            {resume.skills.length > 0 && (
              <div>
                <h2 className={`text-lg font-semibold mb-3 ${textClass}`} style={{ fontFamily: resume.primaryFont }}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2" style={{ fontFamily: resume.secondaryFont }}>
                  {resume.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className={`px-2 py-1 text-xs rounded ${bgClass} text-white`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {resume.educations.length > 0 && (
              <div>
                <h2 className={`text-lg font-semibold mb-3 ${textClass}`} style={{ fontFamily: resume.primaryFont }}>
                  Education
                </h2>
                <div className="space-y-3" style={{ fontFamily: resume.secondaryFont }}>
                  {resume.educations.map((education, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-sm">{education.title}</h3>
                      <p className="text-sm">{education.organization}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
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
                        <p className="text-xs mt-1">{education.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-2/3 p-6">
          {resume.personalInfo.summary && (
            <div className="mb-6">
              <h2 className={`text-lg font-semibold mb-2 ${textClass} ${borderClass} border-b pb-1`} style={{ fontFamily: resume.primaryFont }}>
                Professional Summary
              </h2>
              <p className="text-sm" style={{ fontFamily: resume.secondaryFont }}>
                {resume.personalInfo.summary}
              </p>
            </div>
          )}
          
          {resume.experiences.length > 0 && (
            <div>
              <h2 className={`text-lg font-semibold mb-4 ${textClass} ${borderClass} border-b pb-1`} style={{ fontFamily: resume.primaryFont }}>
                Work Experience
              </h2>
              <div className="space-y-4" style={{ fontFamily: resume.secondaryFont }}>
                {resume.experiences.map((experience, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{experience.title}</h3>
                        <p className="text-sm">{experience.organization}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
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
                          <p className="text-xs text-gray-600 dark:text-gray-400">{experience.location}</p>
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
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;