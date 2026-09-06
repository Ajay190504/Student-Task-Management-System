import React from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  AlertTriangle,
  Plus,
  Timer,
  BarChart3,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import Button from './ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Badge from './ui/Badge';

const Dashboard = ({ onNavigate, onOpenTaskModal, tasks = [], courses = [], stats = null }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Default metric values matching reference Page 3
  const totalTasks = stats?.totalTasks || tasks.length || 12;
  const completedTasks = stats?.completedTasks || tasks.filter((t) => t.status === 'COMPLETED').length || 5;
  const inProgressTasks = stats?.pendingTasks || tasks.filter((t) => t.status === 'IN_PROGRESS').length || 4;
  const pendingTasks = stats?.dueTodayTasks || tasks.filter((t) => t.status === 'TODO').length || 3;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100) || 42;

  // Upcoming Deadlines (Matching Image Screen 3)
  const upcomingDeadlines = [
    { title: 'Data Structures Assignment', course: 'DSA', dueDate: 'Tomorrow', priority: 'HIGH', priorityColor: 'danger' },
    { title: 'Web Development Project', course: 'Web Dev', dueDate: 'Sep 10', priority: 'MEDIUM', priorityColor: 'warning' },
    { title: 'Database Lab Report', course: 'DBMS', dueDate: 'Sep 12', priority: 'LOW', priorityColor: 'success' },
  ];

  // Recent Tasks (Matching Image Screen 3)
  const recentTasks = [
    { title: 'Build REST API for task management', course: 'Web Dev', tag: 'Top 10', progress: 80, status: 'IN_PROGRESS' },
    { title: 'Data Structures Assignment', course: 'DSA', tag: 'HW', progress: 40, status: 'TODO' },
  ];

  const statCards = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: Calendar,
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: AlertTriangle,
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Contextual Greeting Banner */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {getGreeting()}, Ajay! 👋
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Here's an overview of your academic productivity.
        </p>
      </div>

      {/* 4 Summary Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="relative overflow-hidden p-5 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{card.label}</span>
                <div className={`p-2.5 rounded-2xl border ${card.bg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2 tracking-tight">
                {card.value}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Middle Section: Task Progress Donut Chart & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Task Progress Donut Chart (Screen 3) */}
        <Card className="lg:col-span-6 bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            {/* SVG Donut Chart */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="12" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-emerald-500"
                  strokeWidth="12"
                  strokeDasharray="238"
                  strokeDashoffset="138"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-cyan-500"
                  strokeWidth="12"
                  strokeDasharray="78 160"
                  strokeDashoffset="160"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-amber-500"
                  strokeWidth="12"
                  strokeDasharray="60 178"
                  strokeDashoffset="220"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{completionPercentage}%</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3 w-full sm:w-48">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Completed</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{completedTasks}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">In Progress</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{inProgressTasks}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Pending</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{pendingTasks}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Total</span>
                <span className="text-slate-900 dark:text-slate-100 font-extrabold">{totalTasks}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Upcoming Deadlines List (Screen 3) */}
        <Card className="lg:col-span-6 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
              >
                View all →
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.course}</span>
                      <span>•</span>
                      <span>{item.dueDate}</span>
                    </div>
                  </div>
                  <Badge variant={item.priorityColor}>{item.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Bottom Section: Recent Tasks & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Tasks Card */}
        <Card className="lg:col-span-7 bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Tasks</CardTitle>
            <button
              onClick={() => onNavigate('tasks')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              View all →
            </button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTasks.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 gap-3"
              >
                <div className="space-y-1 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{t.title}</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <Badge variant="primary">{t.course}</Badge>
                    <span className="text-slate-400">• {t.progress}% Progress</span>
                  </div>
                </div>
                <div className="w-full sm:w-32 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${t.progress}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right: Quick Actions Card */}
        <Card className="lg:col-span-5 bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <button
              onClick={onOpenTaskModal}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-slate-50 dark:bg-slate-950/60 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 flex flex-col items-start gap-2 transition-all group"
            >
              <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Create Task</span>
            </button>

            <button
              onClick={() => onNavigate('courses')}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-slate-50 dark:bg-slate-950/60 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 flex flex-col items-start gap-2 transition-all group"
            >
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Add Course</span>
            </button>

            <button
              onClick={() => onNavigate('pomodoro')}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-slate-50 dark:bg-slate-950/60 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 flex flex-col items-start gap-2 transition-all group"
            >
              <Timer className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Start Study Session</span>
            </button>

            <button
              onClick={() => onNavigate('analytics')}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-slate-50 dark:bg-slate-950/60 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 flex flex-col items-start gap-2 transition-all group"
            >
              <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">View Analytics</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
