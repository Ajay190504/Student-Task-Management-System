import React from 'react';
import { Search, Plus, LayoutList, Kanban as KanbanIcon, CheckSquare, Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

const TaskKanban = ({
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
  // Sample card data matching Page 5 in reference image
  const sampleKanbanData = [
    { id: 101, title: 'Prepare for Mid Sem', course: 'Mobile', priority: 'HIGH', status: 'TODO', subtasksCount: '0/2', dueDate: 'Sep 15' },
    { id: 102, title: 'Read React Documentation', course: 'Web Dev', priority: 'MEDIUM', status: 'TODO', subtasksCount: '1/3', dueDate: 'Sep 18' },
    { id: 103, title: 'Build REST API for task management', course: 'Web Dev', priority: 'HIGH', status: 'IN_PROGRESS', subtasksCount: '2/5', dueDate: 'Sep 10' },
    { id: 104, title: 'Database Lab Report', course: 'DBMS', priority: 'MEDIUM', status: 'IN_PROGRESS', subtasksCount: '1/2', dueDate: 'Sep 12' },
    { id: 105, title: 'Operating Systems Chapter 4', course: 'OS', priority: 'LOW', status: 'COMPLETED', subtasksCount: '1/1', dueDate: 'Sep 8' },
    { id: 106, title: 'DSA Assignment 1', course: 'DSA', priority: 'HIGH', status: 'OVERDUE', subtasksCount: '0/1', dueDate: 'Sep 1' },
  ];

  const allCards = tasks.length > 0 ? tasks : sampleKanbanData;

  const columns = [
    { id: 'TODO', title: 'To Do', color: 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200/50 dark:border-indigo-900/30' },
    { id: 'COMPLETED', title: 'Completed', color: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30' },
    { id: 'OVERDUE', title: 'Overdue', color: 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200/70 dark:border-rose-900/40' },
  ];

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case 'URGENT':
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      default: return 'success';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header (Page 5) */}
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

      {/* Filter & Action Toolbar (Page 5 Header Bar) */}
      <div className="saas-card p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2 flex-1">
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

        <div className="flex items-center gap-2">
          {/* View Toggles */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onSwitchView && onSwitchView('list')}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              title="List View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSwitchView && onSwitchView('kanban')}
              className="p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm text-indigo-600 dark:text-indigo-400"
              title="Kanban View"
            >
              <KanbanIcon className="w-4 h-4" />
            </button>
          </div>

          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
            Create Task
          </Button>
        </div>
      </div>

      {/* 4 Kanban Columns (Page 5) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const columnTasks = allCards.filter((t) => {
            if (col.id === 'OVERDUE') return t.status === 'OVERDUE' || t.isOverdue;
            return t.status === col.id;
          });

          return (
            <div
              key={col.id}
              className={`rounded-2xl p-3 border min-h-[500px] flex flex-col justify-between ${col.color}`}
            >
              <div className="space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{col.title}</span>
                    <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400 shadow-sm border border-slate-200 dark:border-slate-700">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Cards in Column */}
                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {task.title}
                        </h4>
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                          <button
                            onClick={() => onEditTask && onEditTask(task)}
                            className="p-1 text-slate-400 hover:text-indigo-600"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Course badge */}
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {task.course?.code || task.course || 'Web Dev'}
                      </span>

                      {/* Card Footer: Subtask indicator, priority badge, due date */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                        <div className="flex items-center gap-1 text-slate-400 font-semibold">
                          <CheckSquare className="w-3 h-3 text-indigo-500" />
                          <span>{task.subtasksCount || '0/2'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityBadge(task.priority)}>
                            {task.priority || 'Medium'}
                          </Badge>
                          <span className="text-slate-400 flex items-center gap-0.5">
                            <Calendar className="w-3 h-3" />
                            {task.dueDate || 'Sep 15'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskKanban;
