import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Flame,
  TrendingUp,
  BookOpen,
  Target,
  Award
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Badge from './ui/Badge';

const Analytics = ({ tasks = [], courses = [] }) => {
  const totalTasks = tasks.length || 12;
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length || 7;
  const completionRate = Math.round((completedTasks / totalTasks) * 100) || 58;

  const kpis = [
    { label: 'Completion Rate', value: `${completionRate}%`, icon: CheckCircle2, bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { label: 'Tasks Completed', value: completedTasks, icon: Target, bg: 'bg-blue-50 text-blue-600 border-blue-100' },
    { label: 'Study Hours', value: '18.5 hrs', icon: Clock, bg: 'bg-amber-50 text-amber-600 border-amber-100' },
    { label: 'Current Streak', value: '5 Days', icon: Flame, bg: 'bg-rose-50 text-rose-600 border-rose-100' },
  ];

  const weeklyTrend = [
    { day: 'Mon', completed: 3, goal: 4 },
    { day: 'Tue', completed: 5, goal: 4 },
    { day: 'Wed', completed: 2, goal: 4 },
    { day: 'Thu', completed: 6, goal: 4 },
    { day: 'Fri', completed: 4, goal: 4 },
    { day: 'Sat', completed: 7, goal: 4 },
    { day: 'Sun', completed: 3, goal: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          Analytics & Productivity Insights
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Evaluate workload distribution, completion trends, and study velocity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{kpi.label}</span>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {kpi.value}
                </p>
              </div>
              <div className={`p-3 rounded-[10px] border ${kpi.bg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Trend & Workload Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Completion Bar Visualizer */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <div>
              <CardTitle>Task Completion Trend</CardTitle>
              <CardDescription>Daily task output vs target baseline</CardDescription>
            </div>
            <Badge variant="success">Active Week</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100 dark:border-slate-800">
              {weeklyTrend.map((t, idx) => {
                const heightPercent = (t.completed / 8) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full bg-blue-100 dark:bg-slate-800 rounded-t-md h-full flex items-end overflow-hidden relative">
                      <div
                        className="w-full bg-blue-600 rounded-t-md transition-all duration-300 group-hover:bg-blue-500"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Avg 4.3 tasks / day</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+14% vs last week</span>
            </div>
          </CardContent>
        </Card>

        {/* Actionable Productivity Insights */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Productivity Insights</CardTitle>
              <CardDescription>Observations derived from your study habits</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3.5 rounded-[10px] bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400">
                <TrendingUp className="w-4 h-4" />
                <span>Peak Focus Window</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You complete 62% of your tasks between 9:00 AM and 1:00 PM. Schedule heavy assignments during this window.
              </p>
            </div>

            <div className="p-3.5 rounded-[10px] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Highest Course Velocity</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Web Development has the highest completion rate (75%). DBMS requires attention (only 33% complete).
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Analytics;
