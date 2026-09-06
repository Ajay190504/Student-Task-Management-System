import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Plus, LogOut, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ onOpenTaskModal, searchQuery, setSearchQuery, onToggleMobileMenu, activeTab }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  const tabTitles = {
    dashboard: 'Workspace / Dashboard',
    kanban: 'Tasks / Kanban Board',
    list: 'Tasks / Directory List',
    courses: 'Academic / Courses & Modules',
    sessions: 'Security / Active Devices',
    pomodoro: 'Productivity / Focus Timer',
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile menu trigger button */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title / Breadcrumb */}
        <div className="hidden sm:block">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {tabTitles[activeTab] || 'Workspace / Dashboard'}
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="relative max-w-md w-full ml-0 sm:ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-2">
        {/* New Task Action Button */}
        <button
          onClick={onOpenTaskModal}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all saas-focus"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Profile Popover */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Student'}`}
              alt={user?.name}
              className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/30"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 saas-card bg-white dark:bg-slate-900 p-2 shadow-2xl z-50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {user?.department || 'Computer Science'}
                </span>
              </div>

              <button
                onClick={logout}
                className="w-full text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 p-2 rounded-xl flex items-center gap-2 font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
