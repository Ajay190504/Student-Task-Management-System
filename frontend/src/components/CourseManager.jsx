import React, { useState } from 'react';
import { BookOpen, Plus, Search, Code, Database, Cpu, Terminal, Binary } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';

const CourseManager = ({ courses = [], onRefreshCourses }) => {
  const { addToast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    instructorName: '',
    colorCode: '#2563eb'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sample course card data matching TaskPulse design
  const defaultCourses = [
    { id: 1, code: 'WD', title: 'Web Development', tasksCount: 4, progress: 75, color: '#2563eb', icon: Code },
    { id: 2, code: 'DS', title: 'Data Structures & Algorithms', tasksCount: 2, progress: 50, color: '#2563eb', icon: Binary },
    { id: 3, code: 'DB', title: 'Database Management', tasksCount: 3, progress: 33, color: '#2563eb', icon: Database },
    { id: 4, code: 'ML', title: 'Machine Learning', tasksCount: 3, progress: 0, color: '#2563eb', icon: Cpu },
    { id: 5, code: 'PY', title: 'Python Programming', tasksCount: 3, progress: 33, color: '#ec4899', icon: Terminal },
    { id: 6, code: 'OS', title: 'Operating Systems', tasksCount: 2, progress: 50, color: '#06b6d4', icon: BookOpen },
  ];

  const displayCourses = courses.length > 0
    ? courses.map((c, idx) => ({
        ...c,
        progress: c.progress || (idx % 2 === 0 ? 75 : 33),
        tasksCount: c.totalTasks || (idx + 2),
      }))
    : defaultCourses;

  const filteredCourses = displayCourses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.code.trim() || !formData.title.trim()) {
      setError('Course code and title are required');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/courses', formData);
      addToast('Course created successfully!', 'success');
      setFormData({ code: '', title: '', instructorName: '', colorCode: '#2563eb' });
      setShowAddForm(false);
      if (onRefreshCourses) onRefreshCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
      addToast('Failed to create course', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Courses
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage your academic courses and track task completion.
            </p>
          </div>
        </div>
      </div>

      {/* Action Toolbar with Search Bar & + Add Course Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Add Course Inline Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-blue-500/30 shadow-md space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Create New Course</h3>
            <p className="text-xs text-slate-400">Enter course code and name</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g. WD"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Course Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Web Development"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={submitting}>
                Save Course
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((c) => {
          return (
            <div key={c.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-blue-500/20">
                    {c.code}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                    {c.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{c.tasksCount || 3} tasks completed</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>Progress</span>
                  <span className="text-slate-900 dark:text-slate-100">{c.progress || 50}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${c.progress || 50}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseManager;
