import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  BarChart3,
  Timer,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'pomodoro', label: 'Study Sessions', icon: Timer },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 bg-white dark:bg-slate-950">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                  TaskPulse
                </h1>
              </div>
            )}
          </div>

          {/* Desktop Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'tasks' && (activeTab === 'list' || activeTab === 'kanban'));
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id === 'tasks' ? 'list' : item.id);
                  setMobileOpen(false);
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                } ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
        {!collapsed && (
          <div
            onClick={() => { setActiveTab('profile'); setMobileOpen(false); }}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Ajay'}`}
                alt={user?.name}
                className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 flex-shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate leading-none">{user?.name || 'Ajay Waghmare'}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{user?.department || 'Student'}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 h-screen transition-all duration-200 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay (Page 11) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-xs bg-white dark:bg-slate-950 h-full shadow-2xl z-10 border-r border-slate-200 dark:border-slate-800">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
