import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Award,
  Plus,
  Timer,
  Kanban,
  BarChart3
} from 'lucide-react';
import Button from './ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Badge from './ui/Badge';
import { CardSkeleton } from './ui/Skeleton';

const Dashboard = ({ onNavigate, onOpenTaskModal }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/analytics/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-96 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats?.totalTasks || 0,
      icon: Calendar,
      variant: 'primary',
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
    },
    {
      label: 'Completed',
      value: stats?.completedTasks || 0,
      icon: CheckCircle2,
      variant: 'success',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      label: 'In Progress',
      value: stats?.pendingTasks || 0,
      icon: Clock,
      variant: 'warning',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      label: 'Overdue',
      value: stats?.overdueTasks || 0,
      icon: AlertTriangle,
      variant: 'danger',
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Contextual Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Student'} 👋
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Here's an overview of your academic productivity and upcoming deadlines.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
            New Task
          </Button>
          <Button variant="outline" size="sm" icon={Kanban} onClick={() => onNavigate('kanban')}>
            Kanban Board
          </Button>
          <Button variant="ghost" size="sm" icon={Timer} onClick={() => onNavigate('pomodoro')}>
            Focus Timer
          </Button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{card.label}</span>
                <div className={`p-2 rounded-xl border ${card.bg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-3 tracking-tight">
                {card.value}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Analytics & Productivity Index */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Workload Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Category Workload Breakdown
              </CardTitle>
              <CardDescription>Tasks organized by academic activity type</CardDescription>
            </div>
            <Badge variant="primary">{stats?.completionRate || 0}% Completion Rate</Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            {stats?.tasksByCategory && Object.keys(stats.tasksByCategory).length > 0 ? (
              Object.entries(stats.tasksByCategory).map(([cat, count]) => {
                const percentage = stats.totalTasks > 0 ? Math.round((count / stats.totalTasks) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span className="capitalize">{cat.toLowerCase().replace('_', ' ')}</span>
                      <span>
                        {count} tasks ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">
                No category data available yet. Create tasks to view workload breakdown.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Productivity Index */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader className="border-b-0 pb-0">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                <Award className="w-4 h-4" />
                Productivity Index
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {stats?.productivityScore || 0}
                </span>
                <span className="text-sm font-semibold text-slate-400"> / 100</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Calculated in real-time based on on-time completion rates minus overdue task penalties.
              </p>
            </CardContent>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Due Today</span>
              <Badge variant={stats?.dueTodayTasks > 0 ? 'warning' : 'success'}>
                {stats?.dueTodayTasks || 0} Tasks
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {stats?.dueTodayTasks > 0
                ? 'You have urgent items scheduled for today. Check your Kanban board!'
                : 'Great job! No pending deadlines for today.'}
            </p>
          </div>
        </Card>
      </div>

      {/* Priority Distribution Grid */}
      {stats?.tasksByPriority && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Tasks Priority Spectrum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['URGENT', 'HIGH', 'MEDIUM', 'LOW'].map((prio) => {
                const count = stats.tasksByPriority[prio] || 0;
                const badges = {
                  URGENT: 'danger',
                  HIGH: 'warning',
                  MEDIUM: 'primary',
                  LOW: 'default',
                };
                return (
                  <div key={prio} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-center">
                    <Badge variant={badges[prio]}>{prio}</Badge>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">{count}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
