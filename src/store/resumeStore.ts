import { create } from 'zustand';
import { ResumeData, Section, ResumeTemplate, ColorScheme } from '../types';

interface ResumeState {
  resume: ResumeData;
  currentStep: number;
  atsScore: number;
  suggestions: string[];
  
  updatePersonalInfo: (personalInfo: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (experience: Section) => void;
  updateExperience: (index: number, experience: Partial<Section>) => void;
  removeExperience: (index: number) => void;
  reorderExperiences: (fromIndex: number, toIndex: number) => void;
  
  addEducation: (education: Section) => void;
  updateEducation: (index: number, education: Partial<Section>) => void;
  removeEducation: (index: number) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;
  
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  reorderSkills: (fromIndex: number, toIndex: number) => void;
  
  updateTemplate: (template: ResumeTemplate) => void;
  updateColorScheme: (colorScheme: ColorScheme) => void;
  updatePrimaryFont: (font: string) => void;
  updateSecondaryFont: (font: string) => void;
  
  setCurrentStep: (step: number) => void;
  updateAtsScore: (score: number) => void;
  updateSuggestions: (suggestions: string[]) => void;
  
  resetResume: () => void;
  loadResume: (resumeData: ResumeData) => void;
}

const DEFAULT_RESUME: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedIn: '',
    summary: '',
  },
  experiences: [],
  educations: [],
  skills: [],
  template: 'modern',
  colorScheme: 'blue',
  primaryFont: 'Poppins',
  secondaryFont: 'Lato',
};

export const useResumeStore = create<ResumeState>((set) => ({
  resume: { ...DEFAULT_RESUME },
  currentStep: 0,
  atsScore: 0,
  suggestions: [],
  
  updatePersonalInfo: (personalInfo) => 
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...personalInfo },
      }
    })),
  
  addExperience: (experience) => 
    set((state) => ({
      resume: {
        ...state.resume,
        experiences: [...state.resume.experiences, experience],
      }
    })),
  
  updateExperience: (index, experience) => 
    set((state) => ({
      resume: {
        ...state.resume,
        experiences: state.resume.experiences.map((exp, i) => 
          i === index ? { ...exp, ...experience } : exp
        ),
      }
    })),
  
  removeExperience: (index) => 
    set((state) => ({
      resume: {
        ...state.resume,
        experiences: state.resume.experiences.filter((_, i) => i !== index),
      }
    })),
  
  reorderExperiences: (fromIndex, toIndex) => 
    set((state) => {
      const newExperiences = [...state.resume.experiences];
      const [movedItem] = newExperiences.splice(fromIndex, 1);
      newExperiences.splice(toIndex, 0, movedItem);
      return {
        resume: {
          ...state.resume,
          experiences: newExperiences,
        }
      };
    }),
  
  addEducation: (education) => 
    set((state) => ({
      resume: {
        ...state.resume,
        educations: [...state.resume.educations, education],
      }
    })),
  
  updateEducation: (index, education) => 
    set((state) => ({
      resume: {
        ...state.resume,
        educations: state.resume.educations.map((edu, i) => 
          i === index ? { ...edu, ...education } : edu
        ),
      }
    })),
  
  removeEducation: (index) => 
    set((state) => ({
      resume: {
        ...state.resume,
        educations: state.resume.educations.filter((_, i) => i !== index),
      }
    })),
  
  reorderEducation: (fromIndex, toIndex) => 
    set((state) => {
      const newEducations = [...state.resume.educations];
      const [movedItem] = newEducations.splice(fromIndex, 1);
      newEducations.splice(toIndex, 0, movedItem);
      return {
        resume: {
          ...state.resume,
          educations: newEducations,
        }
      };
    }),
  
  addSkill: (skill) => 
    set((state) => ({
      resume: {
        ...state.resume,
        skills: [...state.resume.skills, skill],
      }
    })),
  
  removeSkill: (index) => 
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.filter((_, i) => i !== index),
      }
    })),
  
  reorderSkills: (fromIndex, toIndex) => 
    set((state) => {
      const newSkills = [...state.resume.skills];
      const [movedItem] = newSkills.splice(fromIndex, 1);
      newSkills.splice(toIndex, 0, movedItem);
      return {
        resume: {
          ...state.resume,
          skills: newSkills,
        }
      };
    }),
  
  updateTemplate: (template) => 
    set((state) => ({
      resume: {
        ...state.resume,
        template,
      }
    })),
  
  updateColorScheme: (colorScheme) => 
    set((state) => ({
      resume: {
        ...state.resume,
        colorScheme,
      }
    })),
  
  updatePrimaryFont: (primaryFont) => 
    set((state) => ({
      resume: {
        ...state.resume,
        primaryFont,
      }
    })),
  
  updateSecondaryFont: (secondaryFont) => 
    set((state) => ({
      resume: {
        ...state.resume,
        secondaryFont,
      }
    })),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  updateAtsScore: (atsScore) => set({ atsScore }),
  
  updateSuggestions: (suggestions) => set({ suggestions }),
  
  resetResume: () => set({ 
    resume: { ...DEFAULT_RESUME },
    currentStep: 0,
    atsScore: 0,
    suggestions: [],
  }),
  
  loadResume: (resumeData) => set({ 
    resume: resumeData,
    currentStep: 0,
  }),
}));