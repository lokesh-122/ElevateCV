import React, { useState } from 'react';
import { FormStepProps, Section } from '../../../types';
import { useResumeStore } from '../../../store/resumeStore';
import { GripVertical, Plus, Trash } from 'lucide-react';
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

const EducationForm: React.FC<FormStepProps> = ({ onNext, onPrevious }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Section>({
    title: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const educations = useResumeStore((state) => state.resume.educations);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const reorderEducation = useResumeStore((state) => state.reorderEducation);
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      updateEducation(editIndex, formData);
    } else {
      addEducation(formData);
    }
    
    setFormData({
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setIsAdding(false);
    setEditIndex(null);
  };
  
  const handleEdit = (index: number) => {
    setFormData(educations[index]);
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
    });
    setIsAdding(false);
    setEditIndex(null);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const fromIndex = educations.findIndex((edu) => `education-${edu.organization}-${edu.title}` === active.id);
      const toIndex = educations.findIndex((edu) => `education-${edu.organization}-${edu.title}` === over.id);
      reorderEducation(fromIndex, toIndex);
    }
  };
  
  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="form-label">Degree/Certificate *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Bachelor of Science in Computer Science"
              required
            />
          </div>
          
          <div>
            <label htmlFor="organization" className="form-label">School/Institution *</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="input-field"
              placeholder="University of Example"
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
              placeholder="City, State"
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
            I'm currently studying here
          </label>
        </div>
        
        <div>
          <label htmlFor="description" className="form-label">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field h-20 resize-none"
            placeholder="Relevant coursework, achievements, GPA, etc."
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={handleCancel} className="btn btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            {editIndex !== null ? 'Update' : 'Add'} Education
          </button>
        </div>
      </form>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="btn btn-primary"
        >
          <Plus size={16} className="mr-1" /> Add Education
        </button>
      </div>
      
      {educations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No education added yet.</p>
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary mt-2"
          >
            <Plus size={16} className="mr-1" /> Add Your Education
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={educations.map(edu => `education-${edu.organization}-${edu.title}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {educations.map((education, index) => (
                <SortableEducationItem
                  key={`education-${education.organization}-${education.title}`}
                  id={`education-${education.organization}-${education.title}`}
                  education={education}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => removeEducation(index)}
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

interface SortableEducationItemProps {
  id: string;
  education: Section;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableEducationItem: React.FC<SortableEducationItemProps> = ({ 
  id, education, onEdit, onDelete 
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
        <h4 className="font-medium text-gray-900 dark:text-white">{education.title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{education.organization}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {education.startDate && new Date(education.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          {' - '}
          {education.current 
            ? 'Present' 
            : education.endDate 
              ? new Date(education.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
              : ''
          }
        </p>
      </div>
      
      <div className="flex space-x-1">
        <button
          type="button"
          onClick={onEdit}
          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="Edit education"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          aria-label="Delete education"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EducationForm;