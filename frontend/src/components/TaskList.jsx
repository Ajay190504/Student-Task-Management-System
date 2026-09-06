import React from 'react';
import { Download, Filter, Edit2, Trash2, Plus } from 'lucide-react';
import api from '../services/api';
import Button from './ui/Button';
import Badge from './ui/Badge';
import EmptyState from './ui/EmptyState';

const TaskList = ({
  tasks,
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
  onOpenTaskModal,
  filterCourse,
  setFilterCourse,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  courses,
}) => {

  const handleExportCsv = async () => {
    try {
      const response = await api.get('/tasks/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_tasks_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to export CSV:', err);
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'URGENT': return 'danger';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'primary';
      default: return 'default';
    }
  };

  const hasActiveFilters = filterStatus || filterPriority || filterCourse;

  const clearFilters = () => {
    setFilterStatus('');
    setFilterPriority('');
    setFilterCourse('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Task Directory & Records
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Filter, search, organize, and export complete task records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={handleExportCsv}>
            Export CSV
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="saas-card p-3 rounded-2xl flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 pl-2">
          <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Filters:</span>
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="URGENT">Urgent</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Course Filter */}
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 max-w-xs"
        >
          <option value="">All Subjects / Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.title}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Table Container */}
      {tasks.length > 0 ? (
        <div className="saas-card rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Task</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{task.title}</div>
                      {task.description && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs mt-0.5">
                          {task.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {task.course ? (
                        <Badge
                          style={{
                            color: task.course.colorCode,
                            borderColor: `${task.course.colorCode}40`,
                            backgroundColor: `${task.course.colorCode}15`,
                          }}
                        >
                          {task.course.code}
                        </Badge>
                      ) : (
                        <span className="text-slate-400 text-[11px]">General</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 capitalize">
                      {task.category?.toLowerCase().replace('_', ' ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getPriorityBadgeVariant(task.priority)}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={task.status}
                        onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                        className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-semibold ${
                          task.isOverdue ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {task.dueDate ? task.dueDate : 'No Deadline'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => onEditTask(task)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No tasks match your filters"
          description="Try adjusting your status, priority, or course filters to locate tasks."
          actionLabel="Create New Task"
          onAction={onOpenTaskModal}
        />
      )}
    </div>
  );
};

export default TaskList;
