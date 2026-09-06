import React from 'react';
import { Search, Plus, LayoutList, Kanban, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import EmptyState from './ui/EmptyState';

const TaskList = ({
  tasks = [],
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
  onOpenTaskModal,
  onSwitchView,
  filterCourse,
  setFilterCourse,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  courses = [],
}) => {
  // Sample data fallback matching Page 4 in reference image if tasks empty
  const displayTasks = tasks.length > 0 ? tasks : [
    { id: 1, title: 'Build REST API for task management', courseName: 'Web Dev', priority: 'HIGH', status: 'IN_PROGRESS', dueDate: 'Sep 10, 2026' },
    { id: 2, title: 'Data Structures Assignment', courseName: 'DSA', priority: 'HIGH', status: 'TODO', dueDate: 'Sep 9, 2026' },
    { id: 3, title: 'Database Lab Report', courseName: 'DBMS', priority: 'MEDIUM', status: 'IN_PROGRESS', dueDate: 'Sep 12, 2026' },
    { id: 4, title: 'Read Operating Systems Chapter 4', courseName: 'OS', priority: 'LOW', status: 'COMPLETED', dueDate: 'Sep 8, 2026' },
    { id: 5, title: 'Prepare for Mid Sem', courseName: 'Multiple', priority: 'HIGH', status: 'TODO', dueDate: 'Sep 15, 2026' },
  ];

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'URGENT':
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      default: return 'success';
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'primary';
      default: return 'warning';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (Page 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Tasks
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your tasks and stay on track.
          </p>
        </div>
      </div>

      {/* Filter & Action Toolbar (Page 4 Header Bar) */}
      <div className="saas-card p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Filter Search */}
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={filterStatus || ''}
            onChange={(e) => setFilterStatus && setFilterStatus(e.target.value)}
            className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Status</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {/* Priority Dropdown */}
          <select
            value={filterPriority || ''}
            onChange={(e) => setFilterPriority && setFilterPriority(e.target.value)}
            className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Priority</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Courses Dropdown */}
          <select
            value={filterCourse || ''}
            onChange={(e) => setFilterCourse && setFilterCourse(e.target.value)}
            className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 max-w-[140px]"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.code}</option>
            ))}
          </select>
        </div>

        {/* Right Action Switchers */}
        <div className="flex items-center gap-2">
          {/* View Mode Switcher Toggles */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onSwitchView && onSwitchView('list')}
              className="p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm text-indigo-600 dark:text-indigo-400"
              title="List View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSwitchView && onSwitchView('kanban')}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              title="Kanban View"
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>

          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
            Create Task
          </Button>
        </div>
      </div>

      {/* Data Table */}
      {displayTasks.length > 0 ? (
        <div className="saas-card rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 w-8">
                    <input type="checkbox" className="rounded text-indigo-600" />
                  </th>
                  <th className="py-3 px-4">Task</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {displayTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <input type="checkbox" className="rounded text-indigo-600" />
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {task.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {task.course?.code || task.courseName || 'Web Dev'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getPriorityBadgeVariant(task.priority)}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getStatusBadgeVariant(task.status)}>
                        {task.status?.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-medium">
                      {task.dueDate || 'Sep 10, 2026'}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => onEditTask && onEditTask(task)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteTask && onDeleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
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
          title="No tasks match your filter"
          description="Try clearing search or filters to display tasks."
          actionLabel="Create Task"
          onAction={onOpenTaskModal}
        />
      )}
    </div>
  );
};

export default TaskList;
