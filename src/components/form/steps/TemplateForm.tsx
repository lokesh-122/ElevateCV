import React from 'react';
import { FormStepProps } from '../../../types';
import { useResumeStore } from '../../../store/resumeStore';
import { Check } from 'lucide-react';
import classNames from 'classnames';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design with a sidebar' },
  { id: 'classic', name: 'Classic', description: 'Traditional layout, perfect for conservative industries' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant with focus on content' },
  { id: 'professional', name: 'Professional', description: 'Structured layout with clear section hierarchy' },
];

const COLOR_SCHEMES = [
  { id: 'blue', name: 'Blue', color: '#3b82f6', textColor: 'text-blue-600' },
  { id: 'green', name: 'Green', color: '#10b981', textColor: 'text-green-600' },
  { id: 'purple', name: 'Purple', color: '#8b5cf6', textColor: 'text-purple-600' },
  { id: 'red', name: 'Red', color: '#ef4444', textColor: 'text-red-600' },
  { id: 'gray', name: 'Gray', color: '#6b7280', textColor: 'text-gray-600' },
];

const FONTS = [
  { id: 'Poppins', name: 'Poppins', className: 'font-poppins' },
  { id: 'Lato', name: 'Lato', className: 'font-lato' },
  { id: 'Roboto', name: 'Roboto', className: 'font-roboto' },
];

const TemplateForm: React.FC<FormStepProps> = ({ onNext, onPrevious }) => {
  const resume = useResumeStore((state) => state.resume);
  const updateTemplate = useResumeStore((state) => state.updateTemplate);
  const updateColorScheme = useResumeStore((state) => state.updateColorScheme);
  const updatePrimaryFont = useResumeStore((state) => state.updatePrimaryFont);
  const updateSecondaryFont = useResumeStore((state) => state.updateSecondaryFont);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={classNames(
                'relative border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md',
                resume.template === template.id
                  ? 'border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700'
                  : 'border-gray-200 dark:border-gray-700'
              )}
              onClick={() => updateTemplate(template.id as any)}
            >
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700">
                <div className="h-full flex items-center justify-center">
                  <div className="w-3/4 h-5/6 bg-white dark:bg-gray-800 shadow-sm flex flex-col">
                    {template.id === 'modern' && (
                      <>
                        <div className="h-1/6 bg-blue-600 dark:bg-blue-700"></div>
                        <div className="flex h-5/6">
                          <div className="w-1/3 bg-gray-100 dark:bg-gray-700"></div>
                          <div className="w-2/3 p-2">
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                            <div className="w-2/3 h-2 bg-gray-200 dark:bg-gray-600 mb-2 rounded"></div>
                            <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                            <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {template.id === 'classic' && (
                      <>
                        <div className="h-1/5 p-2">
                          <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                          <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                        <div className="h-4/5 p-2">
                          <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 mb-2 rounded"></div>
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                          <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 mb-2 rounded mt-2"></div>
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                        </div>
                      </>
                    )}
                    
                    {template.id === 'minimal' && (
                      <div className="h-full p-3">
                        <div className="w-2/3 h-3 bg-gray-800 dark:bg-gray-300 mb-2 rounded"></div>
                        <div className="w-1/2 h-2 bg-gray-400 dark:bg-gray-500 mb-3 rounded"></div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-3 rounded"></div>
                        <div className="w-1/3 h-2 bg-gray-800 dark:bg-gray-300 mb-2 rounded"></div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      </div>
                    )}
                    
                    {template.id === 'professional' && (
                      <>
                        <div className="h-1/6 flex justify-between p-2 border-b border-gray-200 dark:border-gray-700">
                          <div className="w-1/2 h-3 bg-gray-800 dark:bg-gray-300 rounded"></div>
                          <div className="w-1/3 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                        <div className="h-5/6 p-2">
                          <div className="w-full h-2 bg-blue-600 dark:bg-blue-700 mb-2 rounded"></div>
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-3 rounded"></div>
                          <div className="w-full h-2 bg-blue-600 dark:bg-blue-700 mb-2 rounded"></div>
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mb-1 rounded"></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {resume.template === template.id && (
                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 text-white">
                  <Check size={14} />
                </div>
              )}
              
              <div className="p-2 text-center">
                <h4 className="text-sm font-medium">{template.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
        <div className="flex flex-wrap gap-3">
          {COLOR_SCHEMES.map((scheme) => (
            <button
              key={scheme.id}
              className={classNames(
                'w-8 h-8 rounded-full transition-all',
                resume.colorScheme === scheme.id
                  ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 scale-110'
                  : 'hover:scale-110'
              )}
              style={{ backgroundColor: scheme.color }}
              onClick={() => updateColorScheme(scheme.id as any)}
              aria-label={`${scheme.name} color scheme`}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Heading Font</h3>
          <div className="space-y-2">
            {FONTS.map((font) => (
              <div
                key={font.id}
                className={classNames(
                  'p-2 border rounded-md cursor-pointer flex items-center',
                  font.className,
                  resume.primaryFont === font.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                )}
                onClick={() => updatePrimaryFont(font.id)}
              >
                <div className="flex-1">
                  <span className="text-lg font-medium">{font.name}</span>
                </div>
                {resume.primaryFont === font.id && (
                  <Check className="text-blue-600 dark:text-blue-400" size={18} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Body Font</h3>
          <div className="space-y-2">
            {FONTS.map((font) => (
              <div
                key={font.id}
                className={classNames(
                  'p-2 border rounded-md cursor-pointer flex items-center',
                  font.className,
                  resume.secondaryFont === font.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                )}
                onClick={() => updateSecondaryFont(font.id)}
              >
                <div className="flex-1">
                  <span>{font.name}</span>
                </div>
                {resume.secondaryFont === font.id && (
                  <Check className="text-blue-600 dark:text-blue-400" size={18} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <button type="button" onClick={onPrevious} className="btn btn-secondary">
          Back
        </button>
        <button type="button" onClick={onNext} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
};

export default TemplateForm;