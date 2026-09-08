import React from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  Plus,
  LayoutList,
  Kanban,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  List,
  BookOpen,
  Timer
} from 'lucide-react';

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
  // Image 2 exact list fallback tasks
  const sampleTasksList = [
    { id: 1, title: 'Complete React assignment', description: 'Build the dashboard page and implement...', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'In Progress', statusBg: 'bg-blue-100 text-blue-700', dueDate: 'Sep 7, 2026', progress: 60 },
    { id: 2, title: 'Study Database normalization notes', description: 'Learn 1NF, 2NF, 3NF concepts and examples.', course: 'DBMS', courseBg: 'bg-purple-50 text-purple-600 border-purple-100', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 8, 2026', progress: 0 },
    { id: 3, title: 'Prepare for DSA test', description: 'Solve 10 problems from arrays and strings.', course: 'DSA', courseBg: 'bg-emerald-50 text-emerald-600 border-emerald-100', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 6, 2026', progress: 0 },
    { id: 4, title: 'Build final project', description: 'Complete the backend API integration.', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'In Progress', statusBg: 'bg-blue-100 text-blue-700', dueDate: 'Sep 10, 2026', progress: 40 },
    { id: 5, title: 'Read research paper', description: 'Summarize the key findings in notes.', course: 'AI/ML', courseBg: 'bg-pink-50 text-pink-600 border-pink-100', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 12, 2026', progress: 0 },
    { id: 6, title: 'Complete SQL practice', description: 'Solve 20 queries on joins and subqueries.', course: 'DBMS', courseBg: 'bg-purple-50 text-purple-600 border-purple-100', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'Completed', statusBg: 'bg-emerald-100 text-emerald-700', dueDate: 'Sep 4, 2026', progress: 100 },
    { id: 7, title: 'Design system documentation', description: 'Write component and style guide.', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 14, 2026', progress: 0 },
    { id: 8, title: 'Watch React course videos', description: 'Complete hooks and context section.', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'In Progress', statusBg: 'bg-blue-100 text-blue-700', dueDate: 'Sep 9, 2026', progress: 70 },
    { id: 9, title: 'Revise Java OOP concepts', description: 'Focus on inheritance, polymorphism.', course: 'Java', courseBg: 'bg-teal-50 text-teal-600 border-teal-100', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 11, 2026', progress: 0 },
    { id: 10, title: 'Submit assignment', description: 'Upload the completed file on LMS.', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 13, 2026', progress: 0 },
  ];

  const tableData = tasks.length > 0 ? tasks.map(t => ({
    id: t.id,
    title: t.title,
    description: t.description || 'Task details and assignment goals.',
    course: t.course?.name || t.courseName || 'Web Development',
    courseBg: 'bg-blue-50 text-blue-600 border-blue-100',
    priority: t.priority === 'HIGH' ? 'High' : t.priority === 'MEDIUM' ? 'Medium' : 'Low',
    priorityBg: t.priority === 'HIGH' ? 'bg-red-50 text-red-600 border-red-100' : t.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100',
    status: t.status === 'COMPLETED' ? 'Completed' : t.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending',
    statusBg: t.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : t.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600',
    dueDate: t.dueDate || 'Sep 10, 2026',
    progress: t.status === 'COMPLETED' ? 100 : t.status === 'IN_PROGRESS' ? 50 : 0
  })) : sampleTasksList;

  // Upcoming Deadlines (Right Panel - Image 2)
  const upcomingDeadlines = [
    { title: 'Project presentation', course: 'Web Development', dueDate: 'Sep 12, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', dotBg: 'bg-amber-400' },
    { title: 'DSA practice test', course: 'DSA', dueDate: 'Sep 9, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', dotBg: 'bg-emerald-500' },
    { title: 'Database normalization notes', course: 'DBMS', dueDate: 'Sep 8, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', dotBg: 'bg-amber-400' },
    { title: 'Complete React assignment', course: 'Web Development', dueDate: 'Sep 7, 2026', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', dotBg: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Tasks Header Title (Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-md">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Tasks
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage your tasks, stay on track and achieve your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters Header Bar (Image 2) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Box */}
          <div className="relative w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Filter Dropdowns */}
          <select
            value={filterStatus || ''}
            onChange={(e) => setFilterStatus && setFilterStatus(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="">All Status ∨</option>
            <option value="TODO">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={filterPriority || ''}
            onChange={(e) => setFilterPriority && setFilterPriority(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="">All Priority ∨</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

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

          <select className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none">
            <option>Due Date (Newest) ∨</option>
            <option>Due Date (Oldest)</option>
          </select>
        </div>

        {/* View Switchers & Create Task Primary Blue Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSwitchView && onSwitchView('list')}
              className="p-1.5 bg-blue-600 text-white rounded-lg shadow-sm"
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

          <button
            onClick={onOpenTaskModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid Layout: Table on Left (8 cols), Side Panel on Right (4 cols) - Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Tasks Data Table (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 w-8">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="py-3 px-4 font-bold">Task</th>
                  <th className="py-3 px-4 font-bold">Course</th>
                  <th className="py-3 px-4 font-bold">Priority</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Due Date</th>
                  <th className="py-3 px-4 font-bold">Progress</th>
                  <th className="py-3 px-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {tableData.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100 text-xs leading-snug">{task.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{task.description}</p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${task.courseBg}`}>
                        {task.course}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${task.priorityBg}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${task.statusBg}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
                        <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{task.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 w-28">
                        <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              task.progress === 100
                                ? 'bg-emerald-500'
                                : task.progress > 0
                                ? 'bg-blue-600'
                                : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 w-7 text-right">{task.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onEditTask && onEditTask(task)}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Left Table Pagination Footer (Image 2 Footer) */}
          <div className="flex items-center justify-between p-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Showing 1 - 10 of 12 tasks</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </button>
              <button className="w-6 h-6 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center hover:bg-slate-100">
                2
              </button>
              <button className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Panel: Task Overview, Quick Actions, Upcoming Deadlines (lg:col-span-4) - Image 2 */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Task Overview Donut Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Task Overview</h2>

            <div className="flex items-center justify-around gap-4 py-1">
              {/* SVG Donut Chart */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="10" fill="none" />
                  <circle cx="50" cy="50" r="38" className="stroke-emerald-500" strokeWidth="10" strokeDasharray="238" strokeDashoffset="138" fill="none" />
                  <circle cx="50" cy="50" r="38" className="stroke-blue-600" strokeWidth="10" strokeDasharray="70 168" strokeDashoffset="168" fill="none" />
                  <circle cx="50" cy="50" r="38" className="stroke-amber-400" strokeWidth="10" strokeDasharray="40 198" strokeDashoffset="225" fill="none" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">12</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Total Tasks</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2.5 w-full max-w-[130px]">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-slate-600 dark:text-slate-400">Completed</span>
                  </div>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">5</span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                    <span className="text-slate-600 dark:text-slate-400">In Progress</span>
                  </div>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">4</span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="text-slate-600 dark:text-slate-400">Pending</span>
                  </div>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">2</span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="text-slate-600 dark:text-slate-400">Overdue</span>
                  </div>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Actions 4 Tiles */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onOpenTaskModal}
                className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">Create Task</span>
              </button>

              <button
                onClick={() => onSwitchView('list')}
                className="p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-purple-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <List className="w-4.5 h-4.5 text-purple-700" />
                </div>
                <span className="text-xs font-bold leading-tight">View All Tasks</span>
              </button>

              <button
                onClick={() => onSwitchView && onSwitchView('courses')}
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4.5 h-4.5 text-emerald-700" />
                </div>
                <span className="text-xs font-bold leading-tight">Add Course</span>
              </button>

              <button
                onClick={() => onSwitchView && onSwitchView('pomodoro')}
                className="p-3.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-pink-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Timer className="w-4.5 h-4.5 text-pink-700" />
                </div>
                <span className="text-xs font-bold leading-tight">Start Study Session</span>
              </button>
            </div>
          </div>

          {/* Card 3: Upcoming Deadlines */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Upcoming Deadlines</h2>
              <button className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.dotBg} shrink-0`} />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">{item.title}</p>
                      <p className="text-[10px] text-slate-400">{item.course}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                        <CalendarIcon className="w-3 h-3 text-slate-400" />
                        <span>{item.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.priorityBg}`}>
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
