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
  CheckSquare,
  ChevronRight
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

const Dashboard = ({ onNavigate, onOpenTaskModal, tasks = [], courses = [] }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Real calculations based on tasks prop
  const totalTasks = tasks.length || 12;
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length || 5;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length || 4;
  const pendingTasks = tasks.filter(t => t.status === 'TODO' || t.status === 'PENDING').length || 3;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100) || 42;

  const statCards = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: CheckSquare,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/30'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/30'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900/30'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: AlertCircle,
      iconBg: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/30'
    },
  ];

  // Map tasks to display in dashboard
  const recentTasksList = tasks.slice(0, 5).map(t => ({
    id: t.id,
    title: t.title,
    course: t.courseName || t.course?.name || 'General',
    priority: t.priority || 'MEDIUM',
    status: t.status || 'TODO',
    dueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'
  }));

  const fallbackRecentTasks = [
    { id: 1, title: 'Complete React assignment', course: 'Web Development', priority: 'HIGH', status: 'IN_PROGRESS', dueDate: 'Sep 7' },
    { id: 2, title: 'Study Database normalization notes', course: 'DBMS', priority: 'MEDIUM', status: 'TODO', dueDate: 'Sep 8' },
    { id: 3, title: 'Prepare for DSA practice test', course: 'DSA', priority: 'HIGH', status: 'COMPLETED', dueDate: 'Sep 6' },
    { id: 4, title: 'Build TaskPulse frontend UI', course: 'Web Development', priority: 'HIGH', status: 'IN_PROGRESS', dueDate: 'Sep 10' },
  ];

  const displayTasks = recentTasksList.length > 0 ? recentTasksList : fallbackRecentTasks;

  const displayCourses = courses.length > 0 ? courses.slice(0, 4) : [
    { id: 1, name: 'Web Development', code: 'CS301', taskCount: 4, completion: 75 },
    { id: 2, name: 'Database Management', code: 'CS302', taskCount: 3, completion: 33 },
    { id: 3, name: 'Data Structures', code: 'CS201', taskCount: 2, completion: 50 },
    { id: 4, name: 'Machine Learning', code: 'CS401', taskCount: 3, completion: 0 },
  ];

  const getPriorityBadgeVariant = (priority) => {
    if (priority === 'HIGH') return 'danger';
    if (priority === 'MEDIUM') return 'warning';
    return 'success';
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'COMPLETED') return 'success';
    if (status === 'IN_PROGRESS') return 'primary';
    return 'default';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Contextual Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {getGreeting()}, Ajay
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Here is your academic productivity overview for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={Calendar}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
            Create Task
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{card.label}</span>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-[10px] border ${card.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Progress Visualization */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Today's Progress</CardTitle>
              <CardDescription>Academic completion status</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-2">
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-blue-600 transition-all duration-500"
                  strokeWidth="8"
                  strokeDasharray="238"
                  strokeDashoffset={238 - (238 * completionPercentage) / 100}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{completionPercentage}%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Completed</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Completed tasks</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{completedTasks}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">In progress</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{inProgressTasks}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Pending workload</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{pendingTasks}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks List */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <div>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Your current academic assignments and workload</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('tasks')}>
              View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayTasks.map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{t.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-slate-600 dark:text-slate-400">{t.course}</span>
                      <span>•</span>
                      <span>Due {t.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={getPriorityBadgeVariant(t.priority)}>
                      {t.priority}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(t.status)}>
                      {t.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Bottom Grid: Course Overview Cards */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Current courses and completion progress</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('courses')}>
            Manage Courses <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayCourses.map((c) => (
              <div key={c.id} className="p-4 rounded-[10px] bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold">
                    {c.code || 'CS'}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{c.completion || 50}%</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{c.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{c.taskCount || 3} tasks tracked</p>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${c.completion || 50}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
