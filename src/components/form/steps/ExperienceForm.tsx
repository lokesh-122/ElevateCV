import React, { useState } from 'react';
import { FormStepProps, Section } from '../../../types';
import { useResumeStore } from '../../../store/resumeStore';
import { AlertCircle, GripVertical, Plus, Trash } from 'lucide-react';
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

const ExperienceForm: React.FC<FormStepProps> = ({ onNext, onPrevious }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Section>({
    title: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    highlights: [],
  });
  const [highlightInput, setHighlightInput] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const experiences = useResumeStore((state) => state.resume.experiences);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const reorderExperiences = useResumeStore((state) => state.reorderExperiences);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
        endDate: checked ? '' : formData.endDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...(formData.highlights || []), highlightInput.trim()],
      });
      setHighlightInput('');
    }
  };
  
  const handleRemoveHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights?.filter((_, i) => i !== index),
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      updateExperience(editIndex, formData);
    } else {
      addExperience(formData);
    }
    
    setFormData({
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: [],
    });
    setHighlightInput('');
    setIsAdding(false);
    setEditIndex(null);
  };
  
  const handleEdit = (index: number) => {
    setFormData(experiences[index]);
    setEditIndex(index);
    setIsAdding(true);
  };
  
  const handleCancel = () => {
    setFormData({
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: [],
    });
    setHighlightInput('');
    setIsAdding(false);
    setEditIndex(null);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const fromIndex = experiences.findIndex((exp) => `experience-${exp.organization}-${exp.title}` === active.id);
      const toIndex = experiences.findIndex((exp) => `experience-${exp.organization}-${exp.title}` === over.id);
      reorderExperiences(fromIndex, toIndex);
    }
  };
  
  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="form-label">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Software Engineer"
              required
            />
          </div>
          
          <div>
            <label htmlFor="organization" className="form-label">Company/Organization *</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="input-field"
              placeholder="XYZ Company"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="City, State or Remote"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="startDate" className="form-label">Start Date *</label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-field"
                disabled={formData.current}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="current"
            name="current"
            checked={formData.current}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="current" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            I currently work here
          </label>
        </div>
        
        <div>
          <label htmlFor="description" className="form-label">Job Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field h-20 resize-none"
            placeholder="Describe your responsibilities and achievements..."
            required
          />
        </div>
        
        <div>
          <label className="form-label">Achievements/Highlights</label>
          <div className="flex">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              className="input-field flex-1 mr-2"
              placeholder="Led a team of 5 developers..."
            />
            <button
              type="button"
              onClick={handleAddHighlight}
              className="btn btn-secondary"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <AlertCircle size={14} className="inline mr-1" />
            Add quantifiable achievements (e.g., "Increased sales by 20%")
          </p>
          
          {formData.highlights && formData.highlights.length > 0 && (
            <ul className="mt-2 space-y-1">
              {formData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="flex-1 text-sm">{highlight}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(index)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <Trash size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={handleCancel} className="btn btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            {editIndex !== null ? 'Update' : 'Add'} Experience
          </button>
        </div>
      </form>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="btn btn-primary"
        >
          <Plus size={16} className="mr-1" /> Add Experience
        </button>
      </div>
      
      {experiences.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No work experience added yet.</p>
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary mt-2"
          >
            <Plus size={16} className="mr-1" /> Add Your First Experience
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={experiences.map(exp => `experience-${exp.organization}-${exp.title}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {experiences.map((experience, index) => (
                <SortableExperienceItem
                  key={`experience-${experience.organization}-${experience.title}`}
                  id={`experience-${experience.organization}-${experience.title}`}
                  experience={experience}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => removeExperience(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      
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

interface SortableExperienceItemProps {
  id: string;
  experience: Section;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableExperienceItem: React.FC<SortableExperienceItemProps> = ({ 
  id, experience, onEdit, onDelete 
}) => {
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
      className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm group hover:shadow-md transition-shadow"
    >
      <div 
        {...attributes} 
        {...listeners}
        className="cursor-grab p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 drag-handle"
      >
        <GripVertical size={20} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 dark:text-white">{experience.title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{experience.organization}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {experience.startDate && new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          {' - '}
          {experience.current 
            ? 'Present' 
            : experience.endDate 
              ? new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
              : ''
          }
        </p>
      </div>
      
      <div className="flex space-x-1">
        <button
          type="button"
          onClick={onEdit}
          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="Edit experience"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          aria-label="Delete experience"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;