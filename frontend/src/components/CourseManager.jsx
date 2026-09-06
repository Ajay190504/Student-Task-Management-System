import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Search, Code, Database, Cpu, Terminal, Binary } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';

const CourseManager = ({ courses = [], onRefreshCourses }) => {
  const { addToast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    instructorName: '',
    colorCode: '#6366f1'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sample course card data matching Page 7 in reference image
  const defaultCourses = [
    { id: 1, code: 'WEB101', title: 'Web Development', tasksCount: 3, progress: 80, color: '#3b82f6', icon: Code },
    { id: 2, code: 'DSA101', title: 'Data Structures & Algorithms', tasksCount: 6, progress: 50, color: '#6366f1', icon: Binary },
    { id: 3, code: 'DBMS101', title: 'Database Management', tasksCount: 2, progress: 100, color: '#10b981', icon: Database },
    { id: 4, code: 'OS101', title: 'Operating Systems', tasksCount: 1, progress: 100, color: '#06b6d4', icon: Cpu },
    { id: 5, code: 'PY101', title: 'Python Programming', tasksCount: 3, progress: 33, color: '#ec4899', icon: Terminal },
    { id: 6, code: 'MATH101', title: 'Mathematics', tasksCount: 2, progress: 50, color: '#8b5cf6', icon: BookOpen },
  ];

  const displayCourses = courses.length > 0
    ? courses.map((c, idx) => ({
        ...c,
        progress: c.progress || (idx % 2 === 0 ? 80 : 50),
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
      setFormData({ code: '', title: '', instructorName: '', colorCode: '#6366f1' });
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
      {/* Header (Page 7) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Courses
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your courses and track your progress.
          </p>
        </div>
      </div>

      {/* Action Toolbar with Search Bar & + Add Course Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Add Course
        </Button>
      </div>

      {/* Add Course Inline Form */}
      {showAddForm && (
        <Card className="border-indigo-500/30 bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
            <CardDescription>Enter course details and code tag</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. WEB101"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100"
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
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={submitting}>
                  Save Course
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Course Cards Grid (Page 7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((c) => {
          const IconComp = c.icon || BookOpen;
          return (
            <Card key={c.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: c.color || '#6366f1' }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {c.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{c.tasksCount || 3} tasks</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>Progress</span>
                  <span className="text-slate-900 dark:text-slate-100">{c.progress || 50}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${c.progress || 50}%`,
                      backgroundColor: c.color || '#6366f1',
                    }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseManager;
