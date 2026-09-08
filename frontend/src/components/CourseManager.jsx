import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Edit, GraduationCap, CheckCircle2 } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { Input } from './ui/Input';
import api from '../services/api';
import EmptyState from './ui/EmptyState';

const CourseManager = ({ courses = [], onRefreshCourses }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      await api.post('/courses', { name, code, instructor });
      setIsAddModalOpen(false);
      setName('');
      setCode('');
      setInstructor('');
      if (onRefreshCourses) onRefreshCourses();
    } catch (err) {
      console.error('Failed to add course:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${courseId}`);
        if (onRefreshCourses) onRefreshCourses();
      } catch (err) {
        console.error('Failed to delete course:', err);
      }
    }
  };

  const displayCourses = courses.length > 0 ? courses : [
    { id: 1, name: 'Web Development', code: 'CS301', instructor: 'Prof. Sharma', taskCount: 8, completion: 75 },
    { id: 2, name: 'Database Management', code: 'CS302', instructor: 'Dr. Patel', taskCount: 5, completion: 40 },
    { id: 3, name: 'Data Structures & Algorithms', code: 'CS201', instructor: 'Prof. Verma', taskCount: 6, completion: 50 },
    { id: 4, name: 'Machine Learning Fundamentals', code: 'CS401', instructor: 'Dr. Rao', taskCount: 4, completion: 25 },
  ];

  return (
    <div className="space-y-6">
      {/* Course Manager Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            Courses
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Organize academic courses, instructors, and workload completion rates.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Add Course
        </Button>
      </div>

      {/* Courses Grid */}
      {displayCourses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses added yet"
          description="Add your enrolled academic courses to categorize tasks."
          actionLabel="Add Course"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayCourses.map((course) => {
            const completion = course.completion ?? 50;
            const taskCount = course.taskCount ?? course.tasks?.length ?? 5;

            return (
              <Card key={course.id} hover className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-[8px] bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 text-xs font-bold border border-blue-200/60 dark:border-blue-800/40">
                      {course.code || 'CS101'}
                    </span>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">{course.name}</h3>
                    {course.instructor && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{course.instructor}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">{taskCount} tasks tracked</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{completion}% complete</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Course Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Course"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddCourse} className="space-y-4">
          <Input
            label="Course Name *"
            placeholder="e.g. Data Structures & Algorithms"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Course Code"
            placeholder="e.g. CS201"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Input
            label="Instructor"
            placeholder="e.g. Dr. Jane Smith"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Add Course
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CourseManager;
