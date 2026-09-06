import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, User } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import EmptyState from './ui/EmptyState';

const CourseManager = ({ courses, onRefreshCourses }) => {
  const { addToast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    instructorName: '',
    colorCode: '#6366f1'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const colorPresets = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

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
      addToast('Course subject tag created successfully!', 'success');
      setFormData({ code: '', title: '', instructorName: '', colorCode: '#6366f1' });
      setShowAddForm(false);
      onRefreshCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
      addToast('Failed to create course tag', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course tag? Associated tasks will revert to General.')) {
      try {
        await api.delete(`/courses/${id}`);
        addToast('Course deleted successfully', 'info');
        onRefreshCourses();
      } catch (err) {
        addToast('Failed to delete course', 'error');
        console.error('Failed to delete course:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Academic Courses & Subjects
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Organize tasks into distinct course workspaces and modules.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Course
        </Button>
      </div>

      {/* Add Course Form */}
      {showAddForm && (
        <Card className="border-indigo-500/30 bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Create New Subject Tag</CardTitle>
            <CardDescription>Assign a color badge and course details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">{error}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CS101"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Algorithms & Data Structures"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Instructor Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Alan Turing"
                    value={formData.instructorName}
                    onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Badge Color Accent
                </label>
                <div className="flex items-center gap-2">
                  {colorPresets.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormData({ ...formData, colorCode: c })}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        formData.colorCode === c ? 'scale-125 border-slate-900 dark:border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={submitting}>
                  Save Subject Tag
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Course Cards Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="relative group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge
                    style={{
                      backgroundColor: `${course.colorCode}20`,
                      color: course.colorCode,
                      borderColor: `${course.colorCode}40`,
                    }}
                  >
                    {course.code}
                  </Badge>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{course.title}</h3>
                  {course.instructorName && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      {course.instructorName}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> Assigned Tasks
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {course.totalTasks || 0} Tasks
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No course tags created yet"
          description="Create subject tags to categorize and filter your academic workload."
          actionLabel="Add Your First Course"
          onAction={() => setShowAddForm(true)}
        />
      )}
    </div>
  );
};

export default CourseManager;
