import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Tag, User } from 'lucide-react';
import api from '../services/api';

const CourseManager = ({ courses, onRefreshCourses }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    instructorName: '',
    colorCode: '#6366f1'
  });
  const [error, setError] = useState('');

  const colorPresets = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.code.trim() || !formData.title.trim()) {
      setError('Course code and title are required');
      return;
    }

    try {
      await api.post('/courses', formData);
      setFormData({ code: '', title: '', instructorName: '', colorCode: '#6366f1' });
      setShowAddForm(false);
      onRefreshCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course? Associated tasks will remain in General category.')) {
      try {
        await api.delete(`/courses/${id}`);
        onRefreshCourses();
      } catch (err) {
        console.error('Failed to delete course:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Academic Courses & Subjects</h2>
          <p className="text-xs text-slate-400">Organize tasks by subjects, modules, and instructors.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gradient-btn text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
        >
          <Plus className="w-3.5 h-3.5" /> Add Course
        </button>
      </div>

      {/* Add Course Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-4 border border-indigo-500/30 space-y-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">New Course Tag</h3>

          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Course Code *</label>
              <input
                type="text"
                placeholder="e.g. CS101"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Course Title *</label>
              <input
                type="text"
                placeholder="e.g. Data Structures & Algorithms"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Instructor Name</label>
              <input
                type="text"
                placeholder="e.g. Dr. Smith"
                value={formData.instructorName}
                onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge Color</label>
            <div className="flex items-center gap-2">
              {colorPresets.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFormData({ ...formData, colorCode: c })}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${formData.colorCode === c ? 'scale-125 border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gradient-btn text-white px-4 py-1.5 rounded-xl text-xs font-semibold"
            >
              Save Subject
            </button>
          </div>
        </form>
      )}

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3 relative group">
            <div className="flex items-start justify-between">
              <span
                className="px-2.5 py-1 rounded-lg text-xs font-extrabold border"
                style={{ backgroundColor: `${course.colorCode}20`, color: course.colorCode, borderColor: `${course.colorCode}40` }}
              >
                {course.code}
              </span>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-100">{course.title}</h3>
              {course.instructorName && (
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  {course.instructorName}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Tasks assigned
              </span>
              <span className="font-bold text-slate-200">{course.totalTasks || 0} Tasks</span>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="col-span-full text-center py-12 glass-panel rounded-2xl border border-dashed border-slate-800">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No course tags created yet. Add subjects to filter tasks!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManager;
