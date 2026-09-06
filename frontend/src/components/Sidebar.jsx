import React from 'react';
import { LayoutDashboard, Kanban, ListTodo, BookOpen, ShieldCheck, Timer, GraduationCap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'kanban', label: 'Kanban Board', icon: Kanban },
    { id: 'list', label: 'Task List', icon: ListTodo },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'sessions', label: 'Active Sessions', icon: ShieldCheck },
    { id: 'pomodoro', label: 'Focus Timer', icon: Timer },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950/80 flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base gradient-text tracking-wide">TaskPulse</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Enterprise Edition</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3.5 glass-card rounded-2xl border border-slate-800">
        <p className="text-[11px] font-semibold text-slate-300">Resume Tech Stack</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Spring Boot 3 + React + Aiven MySQL + JJWT</p>
      </div>
    </aside>
  );
};

export default Sidebar;
