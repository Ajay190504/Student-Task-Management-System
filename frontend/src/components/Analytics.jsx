import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Badge from './ui/Badge';

const Analytics = ({ tasks = [], courses = [] }) => {
  const [timeRange, setTimeRange] = useState('7days');

  // Compute metric numbers
  const totalTasks = tasks.length || 12;
  const completedCount = tasks.filter((t) => t.status === 'COMPLETED').length || 5;
  const inProgressCount = tasks.filter((t) => t.status === 'IN_PROGRESS').length || 4;
  const pendingCount = tasks.filter((t) => t.status === 'TODO').length || 3;
  const completionRate = Math.round((completedCount / totalTasks) * 100) || 42;

  // Mock / Calculated Study Session History
  const sessionHistory = [
    { id: 1, date: 'Sep 6, 2026', mode: 'Focus', duration: '25 min', task: 'Build REST API for task management' },
    { id: 2, date: 'Sep 5, 2026', mode: 'Short Break', duration: '5 min', task: 'Rest Break' },
    { id: 3, date: 'Sep 5, 2026', mode: 'Focus', duration: '25 min', task: 'Data Structures Assignment' },
    { id: 4, date: 'Sep 4, 2026', mode: 'Focus', duration: '50 min', task: 'Database Lab Report' },
    { id: 5, date: 'Sep 3, 2026', mode: 'Long Break', duration: '15 min', task: 'Rest Break' },
  ];

  // Course Bar Chart Data (Web Dev, DSA, DBMS, OS, Python, Math)
  const courseData = [
    { name: 'Web Dev', count: 5, color: '#2563EB' },
    { name: 'DSA', count: 4, color: '#3B82F6' },
    { name: 'DBMS', count: 3, color: '#10b981' },
    { name: 'OS', count: 2, color: '#f59e0b' },
    { name: 'Python', count: 3, color: '#ec4899' },
    { name: 'Math', count: 1, color: '#8b5cf6' },
  ];
  const maxCourseCount = Math.max(...courseData.map((c) => c.count));

  // Productivity Trend Data (Mon to Sun)
  const trendPoints = [
    { day: 'Mon', score: 65, y: 70 },
    { day: 'Tue', score: 78, y: 44 },
    { day: 'Wed', score: 85, y: 30 },
    { day: 'Thu', score: 70, y: 60 },
    { day: 'Fri', score: 92, y: 16 },
    { day: 'Sat', score: 88, y: 24 },
    { day: 'Sun', score: 95, y: 10 },
  ];

  // Path SVG string for line chart
  const pathD = `M 20 ${trendPoints[0].y} Q 70 ${trendPoints[1].y}, 120 ${trendPoints[1].y} T 220 ${trendPoints[3].y} T 320 ${trendPoints[5].y} T 420 ${trendPoints[6].y}`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Analytics & Performance Insights
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Insights into your study habits, course distribution, and task completion trends.
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <Calendar className="w-4 h-4 text-blue-500 ml-1" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-2"
          >
            <option value="7days" className="bg-white dark:bg-slate-900">Last 7 Days</option>
            <option value="30days" className="bg-white dark:bg-slate-900">Last 30 Days</option>
            <option value="semester" className="bg-white dark:bg-slate-900">This Semester</option>
          </select>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Task Completion</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 tracking-tight">
              {completionRate}%
            </p>
            <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Study Sessions</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 tracking-tight">
              5 <span className="text-xs font-normal text-slate-400">sessions</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-2.5">3 Pomodoro focus sessions today</p>
          </div>
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Clock className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Study Time</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 tracking-tight">
              12.5 <span className="text-xs font-normal text-slate-400">hrs</span>
            </p>
            <p className="text-[11px] text-emerald-500 mt-2.5 font-semibold">↑ +15% vs previous week</p>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Award className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Grid of 4 Charts / Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart: Task Status */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <CardHeader>
            <CardTitle>Task Status Breakdown</CardTitle>
            <CardDescription>Current completion state of all active tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle cx="50" cy="50" r="38" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="12" fill="none" />
                {/* Segment 1: Completed Green */}
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
                {/* Segment 2: In Progress Electric Blue */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-blue-600"
                  strokeWidth="12"
                  strokeDashoffset="160"
                  strokeDasharray="78 160"
                  fill="none"
                />
                {/* Segment 3: Pending Yellow */}
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
                <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{totalTasks}</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Total</span>
              </div>
            </div>

            <div className="space-y-2.5 w-full sm:w-48">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Completed</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{completedCount} ({completionRate}%)</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">In Progress</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{inProgressCount} (33%)</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="text-slate-700 dark:text-slate-300">Pending</span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{pendingCount} (25%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart: Tasks by Course */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <CardHeader>
            <CardTitle>Tasks by Course</CardTitle>
            <CardDescription>Academic workload distribution across subjects</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 px-2">
              {courseData.map((course) => {
                const heightPercent = Math.round((course.count / maxCourseCount) * 100);
                return (
                  <div key={course.name} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600">
                      {course.count}
                    </span>
                    <div className="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-32 flex items-end overflow-hidden">
                      <div
                        className="w-full rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: course.color,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate w-full text-center">
                      {course.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Line Chart: Productivity Trend */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Productivity Trend
            </CardTitle>
            <CardDescription>Daily study score index over the week</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="relative h-44 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 450 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradientTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area background */}
                <path
                  d={`${pathD} L 420 100 L 20 100 Z`}
                  fill="url(#gradientTrend)"
                />
                {/* Curve line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Data Points */}
                {trendPoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={20 + idx * 66}
                    cy={pt.y}
                    r="4"
                    className="fill-blue-600 dark:fill-blue-400 stroke-white dark:stroke-slate-900"
                    strokeWidth="2"
                  />
                ))}
              </svg>

              {/* X Labels */}
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 px-1">
                {trendPoints.map((p) => (
                  <span key={p.day}>{p.day}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table: Study Session History */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Study Session History</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                View all →
              </span>
            </CardTitle>
            <CardDescription>Recent Pomodoro focus and rest logs</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40">
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4">Mode</th>
                    <th className="py-2.5 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {sessionHistory.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300">{s.date}</td>
                      <td className="py-2.5 px-4">
                        <Badge variant={s.mode === 'Focus' ? 'primary' : 'success'}>{s.mode}</Badge>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">{s.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
