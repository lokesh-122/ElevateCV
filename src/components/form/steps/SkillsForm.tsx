import React, { useState } from 'react';
import { FormStepProps } from '../../../types';
import { useResumeStore } from '../../../store/resumeStore';
import { GripVertical, Plus, X } from 'lucide-react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'HTML', 'CSS',
  'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Next.js',
  'SQL', 'MongoDB', 'PostgreSQL', 'Git', 'Docker', 'AWS',
  'Project Management', 'Team Leadership', 'Problem Solving',
  'Communication', 'Customer Service', 'Data Analysis',
  'Marketing', 'Sales', 'Content Writing', 'SEO',
  'Graphic Design', 'UI/UX Design', 'Adobe Photoshop',
  'Microsoft Office', 'Product Management', 'Agile Methodology'
];

const SkillsForm: React.FC<FormStepProps> = ({ onNext, onPrevious }) => {
  const [skillInput, setSkillInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  
  const skills = useResumeStore((state) => state.resume.skills);
  const addSkill = useResumeStore((state) => state.addSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const reorderSkills = useResumeStore((state) => state.reorderSkills);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillInput(value);
    
    if (value.trim()) {
      const suggestions = SUGGESTED_SKILLS.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase()) && 
        !skills.includes(skill)
      ).slice(0, 5);
      
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      addSkill(skillInput.trim());
      setSkillInput('');
      setFilteredSuggestions([]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleSuggestionClick = (skill: string) => {
    if (!skills.includes(skill)) {
      addSkill(skill);
      setSkillInput('');
      setFilteredSuggestions([]);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const fromIndex = skills.findIndex((skill) => `skill-${skill}` === active.id);
      const toIndex = skills.findIndex((skill) => `skill-${skill}` === over.id);
      reorderSkills(fromIndex, toIndex);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Add skills that are relevant to the job you're applying for. Drag to reorder by importance.
        </p>
        
        <div className="relative">
          <div className="flex">
            <input
              type="text"
              value={skillInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="input-field flex-1 mr-2"
              placeholder="Add a skill (e.g., JavaScript, Leadership)"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn btn-primary"
              disabled={!skillInput.trim() || skills.includes(skillInput.trim())}
            >
              <Plus size={16} />
            </button>
          </div>
          
          {filteredSuggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
              <ul className="py-1">
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Skills</h4>
        
        {skills.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No skills added yet.</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={skills.map(skill => `skill-${skill}`)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <SortableSkillItem
                    key={`skill-${skill}`}
                    id={`skill-${skill}`}
                    skill={skill}
                    onDelete={() => removeSkill(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
      
      <div className="pt-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggested Skills</h4>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.filter(skill => !skills.includes(skill))
            .slice(0, 10)
            .map((skill) => (
              <button
                key={skill}
                onClick={() => handleSuggestionClick(skill)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                {skill}
              </button>
            ))}
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

interface SortableSkillItemProps {
  id: string;
  skill: string;
  onDelete: () => void;
}

const SortableSkillItem: React.FC<SortableSkillItemProps> = ({ id, skill, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-1 px-3 py-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 text-blue-800 dark:text-blue-300 rounded-full shadow-sm"
    >
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 drag-handle"
      >
        <GripVertical size={14} />
      </span>
      <span>{skill}</span>
      <button
        type="button"
        onClick={onDelete}
        className="ml-1 p-1 text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
        aria-label={`Remove ${skill}`}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default SkillsForm;