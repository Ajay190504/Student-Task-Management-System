import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckSquare } from 'lucide-react';
import Modal from './ui/Modal';
import Button from './ui/Button';

const TaskModal = ({ isOpen, onClose, onSaveTask, initialTask, courses }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'TODO',
    category: 'ASSIGNMENT',
    dueDate: '',
    estimatedHours: 1.0,
    courseId: '',
    subtasks: []
  });

  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setFormData({
        id: initialTask.id,
        title: initialTask.title || '',
        description: initialTask.description || '',
        priority: initialTask.priority || 'MEDIUM',
        status: initialTask.status || 'TODO',
        category: initialTask.category || 'ASSIGNMENT',
        dueDate: initialTask.dueDate || '',
        estimatedHours: initialTask.estimatedHours || 1.0,
        courseId: initialTask.course?.id || '',
        subtasks: initialTask.subtasks ? [...initialTask.subtasks] : []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'MEDIUM',
        status: 'TODO',
        category: 'ASSIGNMENT',
        dueDate: '',
        estimatedHours: 1.0,
        courseId: '',
        subtasks: []
      });
    }
    setErrors({});
    setSubmitting(false);
  }, [initialTask, isOpen]);

  const handleAddSubtask = () => {
    if (!subtaskTitle.trim()) return;
    setFormData((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, { title: subtaskTitle.trim(), completed: false }]
    }));
    setSubtaskTitle('');
  };

  const handleRemoveSubtask = (index) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Task title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      await onSaveTask(formData);
      onClose();
    } catch (err) {
      console.error('Failed to submit task form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? 'Edit Task Details' : 'Create Academic Task'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Database Systems Normalization Assignment"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
          />
          {errors.title && <p className="text-rose-600 dark:text-rose-400 text-[10px] font-bold mt-1">{errors.title}</p>}
        </div>

        {/* Course & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Course Tag
            </label>
            <select
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
            >
              <option value="">-- General / No Subject --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
            >
              <option value="ASSIGNMENT">Assignment</option>
              <option value="PROJECT">Project</option>
              <option value="EXAM_PREP">Exam Prep</option>
              <option value="LAB">Lab Session</option>
              <option value="PERSONAL">Personal Study</option>
            </select>
          </div>
        </div>

        {/* Priority, Status, Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Key requirements, guidelines, submission portal links..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
          ></textarea>
        </div>

        {/* Subtasks */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Subtask Checklist
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add subtask item..."
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
            <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={handleAddSubtask}>
              Add
            </Button>
          </div>

          <div className="space-y-1.5 mt-2 max-h-36 overflow-y-auto">
            {formData.subtasks.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
              >
                <span className="flex items-center gap-2 font-medium">
                  <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                  {sub.title}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSubtask(idx)}
                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={submitting}>
            {initialTask ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
