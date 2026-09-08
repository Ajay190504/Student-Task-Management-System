import React from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Plus,
  Timer,
  BookOpen,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckSquare,
  List,
  Target,
  Flame,
  ChevronRight
} from 'lucide-react';

const Dashboard = ({ onNavigate, onOpenTaskModal, tasks = [], courses = [], stats = null }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Metric values matching reference Image 4
  const totalTasks = stats?.totalTasks || 12;
  const completedTasks = stats?.completedTasks || 5;
  const inProgressTasks = stats?.inProgressTasks || 4;
  const pendingTasks = stats?.pendingTasks || 3;
  const overdueTasks = stats?.overdueTasks || 1;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100) || 42;

  // Stat Cards (Top Row - Image 4)
  const statCards = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      trend: '↑ 2 from last week',
      trendType: 'up',
      icon: CheckSquare,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/40 dark:text-blue-400'
    },
    {
      label: 'Completed',
      value: completedTasks,
      trend: '↑ 1 from last week',
      trendType: 'up',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/50 dark:border-emerald-900/40 dark:text-emerald-400'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      trend: '→ 0 from last week',
      trendType: 'neutral',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/40 dark:text-amber-400'
    },
    {
      label: 'Pending / Overdue',
      value: pendingTasks,
      trend: '↓ 1 from last week',
      trendType: 'down',
      icon: AlertCircle,
      iconBg: 'bg-red-50 text-red-600 border-red-100 dark:bg-red-950/50 dark:border-red-900/40 dark:text-red-400'
    },
  ];

  // Recent Tasks (Middle Card - Image 4)
  const recentTasksList = [
    { id: 1, title: 'Complete React assignment', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'In Progress', statusBg: 'bg-blue-100 text-blue-700', dueDate: 'Sep 7, 2026' },
    { id: 2, title: 'Study Database normalization notes', course: 'DBMS', courseBg: 'bg-purple-50 text-purple-600 border-purple-100', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 8, 2026' },
    { id: 3, title: 'Prepare for DSA test', course: 'DSA', courseBg: 'bg-emerald-50 text-emerald-600 border-emerald-100', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100', status: 'Completed', statusBg: 'bg-emerald-100 text-emerald-700', dueDate: 'Sep 6, 2026' },
    { id: 4, title: 'Build final project', course: 'Web Development', courseBg: 'bg-blue-50 text-blue-600 border-blue-100', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100', status: 'In Progress', statusBg: 'bg-blue-100 text-blue-700', dueDate: 'Sep 10, 2026' },
    { id: 5, title: 'Read research paper', course: 'AI/ML', courseBg: 'bg-pink-50 text-pink-600 border-pink-100', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', status: 'Pending', statusBg: 'bg-slate-100 text-slate-600', dueDate: 'Sep 12, 2026' },
  ];

  // Upcoming Deadlines (Bottom Left Card - Image 4)
  const upcomingDeadlines = [
    { title: 'Complete React assignment', course: 'Web Development', dueDate: 'Sep 7, 2026', priority: 'High', priorityBg: 'bg-red-50 text-red-600 border-red-100' },
    { title: 'Database normalization notes', course: 'DBMS', dueDate: 'Sep 8, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100' },
    { title: 'DSA practice test', course: 'DSA', dueDate: 'Sep 9, 2026', priority: 'Medium', priorityBg: 'bg-amber-50 text-amber-700 border-amber-100' },
    { title: 'Project presentation', course: 'Web Development', dueDate: 'Sep 12, 2026', priority: 'Low', priorityBg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  ];

  // Course Overview (Bottom Right Card - Image 4)
  const courseOverviewList = [
    { code: 'WD', name: 'Web Development', tasksCount: '3/4 tasks completed', progress: 75, badgeBg: 'bg-blue-600 text-white' },
    { code: 'DB', name: 'Database Management', tasksCount: '1/3 tasks completed', progress: 33, badgeBg: 'bg-blue-600 text-white' },
    { code: 'DS', name: 'Data Structures & Algorithms', tasksCount: '1/2 tasks completed', progress: 50, badgeBg: 'bg-blue-600 text-white' },
    { code: 'ML', name: 'Machine Learning', tasksCount: '0/3 tasks completed', progress: 0, badgeBg: 'bg-blue-600 text-white' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Contextual Greeting & Date Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>{getGreeting()}, Ajay</span>
            <span>👋</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Here's an overview of your academic productivity.
          </p>
        </div>

        {/* Date & Motivational Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Saturday, September 6, 2026
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Keep going, you're doing great!
            </p>
          </div>
        </div>
      </div>

      {/* Top Grid: 4 Metric Stat Cards with Trends (Image 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{card.label}</span>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                  {card.value}
                </p>
                <p
                  className={`text-[11px] font-bold ${
                    card.trendType === 'up'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : card.trendType === 'down'
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {card.trend}
                </p>
              </div>
              <div className={`p-3 rounded-2xl border ${card.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: Task Progress, Recent Tasks Table, Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Task Progress Donut Card (Image 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Task Progress</h2>
            <p className="text-[11px] text-slate-400">Overall completion rate</p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-around gap-4 py-2">
            {/* SVG Donut Chart with percentage in center */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="10" fill="none" />
                {/* Completed circle - Green */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-emerald-500"
                  strokeWidth="10"
                  strokeDasharray="238"
                  strokeDashoffset="138"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* In Progress circle - Blue */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-blue-600"
                  strokeWidth="10"
                  strokeDasharray="70 168"
                  strokeDashoffset="168"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Pending circle - Yellow */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-amber-400"
                  strokeWidth="10"
                  strokeDasharray="40 198"
                  strokeDashoffset="225"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{completionPercentage}%</span>
                <span className="text-[10px] text-slate-400 font-semibold">Completed</span>
              </div>
            </div>

            {/* Donut Chart Legend */}
            <div className="space-y-2.5 w-full max-w-[160px]">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-600 dark:text-slate-400">Completed</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{completedTasks}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                  <span className="text-slate-600 dark:text-slate-400">In Progress</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{inProgressTasks}</span>
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
                <span className="text-slate-900 dark:text-slate-100 font-bold">{overdueTasks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks Card (Image 4) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Recent Tasks</h2>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table of Recent Tasks */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wider">
                    <th className="pb-2 font-bold">Task</th>
                    <th className="pb-2 font-bold">Course</th>
                    <th className="pb-2 font-bold">Priority</th>
                    <th className="pb-2 font-bold">Status</th>
                    <th className="pb-2 font-bold">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {recentTasksList.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 pr-2 font-bold text-slate-900 dark:text-slate-100 truncate max-w-[140px]">
                        {t.title}
                      </td>
                      <td className="py-2.5 px-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.courseBg}`}>
                          {t.course === 'Web Development' ? 'Web Dev' : t.course}
                        </span>
                      </td>
                      <td className="py-2.5 px-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.priorityBg}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.statusBg}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2.5 pl-1 text-slate-500 text-[11px] whitespace-nowrap">
                        {t.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions 4 Tile Card (Image 4) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3 my-auto">
            {/* Tile 1: Create Task (Solid Blue Action Tile) */}
            <button
              onClick={onOpenTaskModal}
              className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center text-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold leading-tight">Create Task</span>
            </button>

            {/* Tile 2: View Tasks (Soft Purple Tile) */}
            <button
              onClick={() => onNavigate('tasks')}
              className="p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-purple-700 dark:text-purple-300 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-purple-200/60 dark:bg-purple-900/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <List className="w-4.5 h-4.5 text-purple-700 dark:text-purple-300" />
              </div>
              <span className="text-xs font-bold leading-tight">View Tasks</span>
            </button>

            {/* Tile 3: Add Course (Soft Green Tile) */}
            <button
              onClick={() => onNavigate('courses')}
              className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-200/60 dark:bg-emerald-900/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-4.5 h-4.5 text-emerald-700 dark:text-emerald-300" />
              </div>
              <span className="text-xs font-bold leading-tight">Add Course</span>
            </button>

            {/* Tile 4: Start Study Session (Soft Pink/Purple Tile) */}
            <button
              onClick={() => onNavigate('pomodoro')}
              className="p-4 rounded-2xl bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/40 text-pink-700 dark:text-pink-300 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-pink-200/60 dark:bg-pink-900/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Timer className="w-4.5 h-4.5 text-pink-700 dark:text-pink-300" />
              </div>
              <span className="text-xs font-bold leading-tight">Start Study Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Deadlines, Productivity Summary Chart, Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Deadlines (Bottom Left Card - Image 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Upcoming Deadlines</h2>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.course}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
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

        {/* Productivity & Study Summary (Bottom Center Card - Image 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Productivity & Study Summary</h2>
              <select className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Study Sessions</p>

            {/* Weekly Study Session Bar Chart */}
            <div className="h-32 flex items-end justify-between gap-2 px-2 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              {[
                { day: 'Mon', height: '60%' },
                { day: 'Tue', height: '75%' },
                { day: 'Wed', height: '45%' },
                { day: 'Thu', height: '90%' },
                { day: 'Fri', height: '80%' },
                { day: 'Sat', height: '95%' },
                { day: 'Sun', height: '50%' },
              ].map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[20px] bg-blue-100 dark:bg-blue-950 rounded-t-sm h-full flex items-end overflow-hidden">
                    <div className="w-full bg-blue-600 rounded-t-sm transition-all duration-500" style={{ height: b.height }} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{b.day}</span>
                </div>
              ))}
            </div>

            {/* Bottom 3 Study Summary Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-center text-blue-600 mb-1">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">12h 30m</p>
                <p className="text-[10px] text-slate-400">Total Study Time</p>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-center text-blue-600 mb-1">
                  <Target className="w-4 h-4" />
                </div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">6</p>
                <p className="text-[10px] text-slate-400">Sessions Completed</p>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-center text-orange-500 mb-1">
                  <Flame className="w-4 h-4" />
                </div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">4</p>
                <p className="text-[10px] text-slate-400">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Overview List (Bottom Right Card - Image 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Course Overview</h2>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {courseOverviewList.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0 shadow-sm">
                      {course.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{course.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{course.tasksCount}</p>
                      {/* Course progress bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{course.progress}%</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
