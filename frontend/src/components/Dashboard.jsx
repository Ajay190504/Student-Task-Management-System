import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { CheckCircle2, Clock, AlertTriangle, Calendar, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Tasks', value: stats?.totalTasks || 0, icon: Calendar, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Completed', value: stats?.completedTasks || 0, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'In Progress / Pending', value: stats?.pendingTasks || 0, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Overdue Tasks', value: stats?.overdueTasks || 0, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Academic Overview</h2>
          <p className="text-xs text-slate-400">Track task metrics, productivity velocity, and upcoming assignment deadlines.</p>
        </div>
        <button
          onClick={() => onNavigate('kanban')}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 transition-all"
        >
          View Kanban Board <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`p-4 rounded-2xl glass-card border ${card.bg}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{card.label}</span>
                <div className={`p-2 rounded-xl ${card.bg}`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-100 mt-3">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Productivity Score & Velocity Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Category Breakdown
            </h3>
            <span className="text-xs text-indigo-400 font-semibold">{stats?.completionRate || 0}% Completion Rate</span>
          </div>

          <div className="space-y-4">
            {stats?.tasksByCategory && Object.keys(stats.tasksByCategory).length > 0 ? (
              Object.entries(stats.tasksByCategory).map(([cat, count]) => {
                const percentage = stats.totalTasks > 0 ? Math.round((count / stats.totalTasks) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span className="capitalize">{cat.replace('_', ' ')}</span>
                      <span>{count} tasks ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No category data available. Create tasks to see analytics.</p>
            )}
          </div>
        </div>

        {/* Productivity Score Card */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-2">
              <Award className="w-4 h-4" />
              Productivity Index
            </div>
            <h3 className="text-xl font-bold text-slate-100">{stats?.productivityScore || 0} / 100</h3>
            <p className="text-xs text-slate-400 mt-1">
              Calculated based on on-time completion rates minus overdue penalties.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
              <span>Due Today</span>
              <span className="text-amber-400">{stats?.dueTodayTasks || 0} Tasks</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {stats?.dueTodayTasks > 0
                ? 'You have urgent items scheduled for today. Check your Kanban board!'
                : 'Great job! No urgent deadlines remaining for today.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
