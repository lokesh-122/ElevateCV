export interface Section {
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  highlights?: string[];
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedIn?: string;
  summary: string;
}

export type ResumeTemplate = 'modern' | 'classic' | 'minimal' | 'professional';

export type ColorScheme = 'blue' | 'green' | 'purple' | 'red' | 'gray';

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Section[];
  educations: Section[];
  skills: string[];
  template: ResumeTemplate;
  colorScheme: ColorScheme;
  primaryFont: string;
  secondaryFont: string;
}

export interface FormStepProps {
  onNext: () => void;
  onPrevious: () => void;
}