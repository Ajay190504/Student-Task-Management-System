import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Circle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

const TaskKanban = ({
  tasks = [],
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
  onOpenTaskModal,
  courses = [],
  searchQuery,
  setSearchQuery,
  filterCourse,
  setFilterCourse,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
}) => {
  const [taskFilterTab, setTaskFilterTab] = useState('all'); // 'all' or 'mine'

  // Image 1 exact tasks list fallback data
  const defaultKanbanTasks = [
    { id: 1, title: 'Design system documentation', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Write component and style guide for the project.', dueDate: 'Sep 14, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'TODO' },
    { id: 2, title: 'Watch React course videos', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Complete hooks and context section.', dueDate: 'Sep 9, 2026', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'TODO' },
    { id: 3, title: 'Revise Java OOP concepts', course: 'Java', courseBg: 'bg-teal-50 text-teal-600 border-teal-100', description: 'Focus on inheritance, polymorphism.', dueDate: 'Sep 11, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'TODO' },
    { id: 4, title: 'Submit assignment', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Upload the completed file on LMS.', dueDate: 'Sep 13, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'TODO' },
    { id: 5, title: 'Read research paper', course: 'AI/ML', courseBg: 'bg-pink-50 text-pink-600 border-pink-100', description: 'Summarize the key findings in notes.', dueDate: 'Sep 12, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'TODO' },

    { id: 6, title: 'Study Database normalization notes', course: 'DBMS', courseBg: 'bg-purple-50 text-purple-600 border-purple-100', description: 'Learn 1NF, 2NF, 3NF concepts.', dueDate: 'Sep 8, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'IN_PROGRESS' },
    { id: 7, title: 'Complete SQL practice', course: 'DBMS', courseBg: 'bg-purple-50 text-purple-600 border-purple-100', description: 'Solve 20 queries on joins and subqueries.', dueDate: 'Sep 4, 2026', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'IN_PROGRESS' },
    { id: 8, title: 'Build final project', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Complete the backend API integration.', dueDate: 'Sep 10, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'IN_PROGRESS' },
    { id: 9, title: 'Prepare for DSA test', course: 'DSA', courseBg: 'bg-emerald-50 text-emerald-600 border-emerald-100', description: 'Solve 10 problems from arrays and strings.', dueDate: 'Sep 6, 2026', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'IN_PROGRESS' },

    { id: 10, title: 'Database practice questions', course: 'DBMS', courseBg: 'bg-purple-50 text-purple-600 border-purple-100', description: 'Solve joins, subqueries, indexing.', dueDate: 'Sep 7, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'REVIEW' },
    { id: 11, title: 'Project presentation', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Prepare slides for final presentation.', dueDate: 'Sep 12, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'REVIEW' },
    { id: 12, title: 'Code review & refactor', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Improve code structure and naming.', dueDate: 'Sep 11, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'REVIEW' },

    { id: 13, title: 'Complete React assignment', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Build the dashboard page and implement...', dueDate: 'Sep 7, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'DONE' },
    { id: 14, title: 'Study Git & GitHub', course: 'Tools', courseBg: 'bg-teal-50 text-teal-600 border-teal-100', description: 'Learn basic git commands and workflows.', dueDate: 'Sep 5, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'DONE' },
    { id: 15, title: 'Setup development environment', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Install Node.js, VS Code, and dependencies.', dueDate: 'Sep 3, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'DONE' },
    { id: 16, title: 'HTML & CSS basics', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', description: 'Build simple responsive webpage.', dueDate: 'Sep 2, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'DONE' },
  ];

  const kanbanCards = tasks.length > 0 ? tasks.map(t => ({
    id: t.id,
    title: t.title,
    course: t.course?.name || t.courseName || 'Web Development',
    courseBg: 'bg-blue-50 text-blue-600 border-blue-100',
    description: t.description || 'Task assignment details and objectives.',
    dueDate: t.dueDate || 'Sep 10, 2026',
    priority: t.priority === 'HIGH' ? 'High' : t.priority === 'MEDIUM' ? 'Medium' : 'Low',
    priorityBg: t.priority === 'HIGH' ? 'bg-red-50 text-red-600 border-red-100' : t.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100',
    status: t.status === 'COMPLETED' ? 'DONE' : t.status || 'TODO'
  })) : defaultKanbanTasks;

  // 4 Kanban Columns matching Image 1
  const columns = [
    {
      id: 'TODO',
      title: 'To Do',
      count: kanbanCards.filter(c => c.status === 'TODO').length,
      icon: Circle,
      iconColor: 'text-blue-500',
      containerBg: 'bg-[#F0F5FF]/80 dark:bg-slate-900/60 border border-blue-100/80 dark:border-slate-800',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    },
    {
      id: 'IN_PROGRESS',
      title: 'In Progress',
      count: kanbanCards.filter(c => c.status === 'IN_PROGRESS').length,
      icon: Clock,
      iconColor: 'text-blue-600',
      containerBg: 'bg-[#EEF4FF]/80 dark:bg-slate-900/60 border border-blue-100/80 dark:border-slate-800',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    },
    {
      id: 'REVIEW',
      title: 'Review',
      count: kanbanCards.filter(c => c.status === 'REVIEW').length,
      icon: AlertCircle,
      iconColor: 'text-amber-500',
      containerBg: 'bg-[#FFFBF2]/90 dark:bg-slate-900/60 border border-amber-100/80 dark:border-slate-800',
      badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
    },
    {
      id: 'DONE',
      title: 'Done',
      count: kanbanCards.filter(c => c.status === 'DONE' || c.status === 'COMPLETED').length,
      icon: CheckCircle2,
      iconColor: 'text-emerald-500',
      containerBg: 'bg-[#ECFDF5]/80 dark:bg-slate-900/60 border border-emerald-100/80 dark:border-slate-800',
      badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Kanban Header Title & Description (Image 1) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Kanban Board
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Visualize your workflow and move tasks across different stages.
            </p>
          </div>
        </div>
      </div>

      {/* Action Toolbar & Filters (Image 1 Toolbar) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tab switches: All Tasks & My Tasks */}
          <button
            onClick={() => setTaskFilterTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              taskFilterTab === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setTaskFilterTab('mine')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              taskFilterTab === 'mine'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            My Tasks
          </button>

          {/* Filter Dropdowns */}
          <select
            value={filterCourse || ''}
            onChange={(e) => setFilterCourse && setFilterCourse(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="">All Courses ∨</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name || c.code}</option>
            ))}
          </select>

          <select
            value={filterPriority || ''}
            onChange={(e) => setFilterPriority && setFilterPriority(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="">Due Date ∨</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>

        {/* Create / Add Task Primary Button */}
        <button
          onClick={onOpenTaskModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* 4 Column Kanban Grid (Exact Image 1 Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = kanbanCards.filter(c => {
            if (col.id === 'DONE') return c.status === 'DONE' || c.status === 'COMPLETED';
            return c.status === col.id;
          });
          const Icon = col.icon;

          return (
            <div
              key={col.id}
              className={`rounded-2xl p-3.5 space-y-3 min-h-[600px] flex flex-col justify-between ${col.containerBg}`}
            >
              <div className="space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4.5 h-4.5 ${col.iconColor}`} />
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{col.title}</h3>
                  </div>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${col.badgeBg}`}>
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards Stack */}
                <div className="space-y-3">
                  {colTasks.map((card) => (
                    <div
                      key={card.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-2.5 hover:shadow-md transition-all group relative"
                    >
                      {/* Top Title & Action Menu */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <button
                            onClick={() => onUpdateStatus && onUpdateStatus(card.id, col.id === 'DONE' ? 'TODO' : 'COMPLETED')}
                            className="mt-0.5 text-slate-300 hover:text-blue-600 transition-colors"
                          >
                            {col.id === 'DONE' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                            {card.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => onEditTask && onEditTask(card)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Course Pill Badge */}
                      <div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${card.courseBg}`}>
                          {card.course}
                        </span>
                      </div>

                      {/* Description Excerpt */}
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>

                      {/* Card Footer: Due Date, Priority Tag, User Avatar */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-slate-400 font-medium">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{card.dueDate}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full font-bold border ${card.priorityBg}`}>
                            {card.priority}
                          </span>
                        </div>

                        {/* User Avatar Circle */}
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                          <User className="w-3.5 h-3.5" />
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

      {/* Footer / Pagination Controls (Image 1 Footer) */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span>Showing 1 - 16 of 16 tasks</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            1
          </button>
          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskKanban;
