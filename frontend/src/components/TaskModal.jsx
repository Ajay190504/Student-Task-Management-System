import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckSquare } from 'lucide-react';

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
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveTask(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <h3 className="text-lg font-bold text-slate-100">
            {initialTask ? 'Edit Task Details' : 'Create New Academic Task'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title *</label>
            <input
              type="text"
              placeholder="e.g. Complete Database Design Assignment 3"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {errors.title && <p className="text-rose-400 text-[10px] mt-1">{errors.title}</p>}
          </div>

          {/* Course & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Course Tag</label>
              <select
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows="3"
              placeholder="Task context, submission requirements, or research links..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Subtask Checklist Builder */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300">Subtask Checklist</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add subtask item..."
                value={subtaskTitle}
                onChange={(e) => setSubtaskTitle(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-1 mt-2 max-h-36 overflow-y-auto">
              {formData.subtasks.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                    {sub.title}
                  </span>
                  <button type="button" onClick={() => handleRemoveSubtask(idx)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gradient-btn text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/25"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
