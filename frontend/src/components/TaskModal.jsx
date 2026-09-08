import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckSquare } from 'lucide-react';
import Modal from './ui/Modal';
import Button from './ui/Button';

const TaskModal = ({ isOpen, onClose, onSaveTask, initialTask, courses = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'TODO',
    category: 'ASSIGNMENT',
    dueDate: '',
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
      console.error('Failed to submit task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? 'Edit Task' : 'Create New Task'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[78vh] overflow-y-auto pr-1">
        {/* Task Title * */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
          />
          {errors.title && <p className="text-rose-600 dark:text-rose-400 text-[10px] font-bold mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Enter task description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
          ></textarea>
        </div>

        {/* Course * & Priority * (Page 6 layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Course *
            </label>
            <select
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Priority *
            </label>
            <div className="flex items-center gap-2">
              {['LOW', 'MEDIUM', 'HIGH'].map((prio) => (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: prio })}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
                    formData.priority === prio
                      ? prio === 'HIGH'
                        ? 'bg-rose-500/10 text-rose-600 border-rose-500/30'
                        : prio === 'MEDIUM'
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  {prio.charAt(0) + prio.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status & Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Subtasks (optional) */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Subtasks (optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add subtask item..."
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
            />
            <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={handleAddSubtask}>
              Add Subtask
            </Button>
          </div>

          <div className="space-y-1.5 mt-2 max-h-32 overflow-y-auto">
            {formData.subtasks.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
              >
                <span className="flex items-center gap-2 font-medium">
                  <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
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

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={submitting} className="px-4">
            {initialTask ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
