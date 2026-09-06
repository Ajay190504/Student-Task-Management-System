import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Plus, Bell, Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';

const Navbar = ({ onOpenTaskModal, searchQuery, setSearchQuery, onToggleMobileMenu, activeTab, onNavigate }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (Matching Reference Header) */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks, courses..."
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
        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 saas-card bg-white dark:bg-slate-900 p-3 shadow-2xl z-50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Notifications</span>
                <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer">Mark read</span>
              </div>
              <div className="space-y-1.5">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-xs">
                  <p className="font-bold text-slate-900 dark:text-slate-100">Data Structures Assignment</p>
                  <p className="text-[10px] text-slate-500">Due tomorrow at 11:59 PM</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs">
                  <p className="font-bold text-slate-900 dark:text-slate-100">Pomodoro Target Reached</p>
                  <p className="text-[10px] text-slate-500">Completed 3 sessions today!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* User Profile Avatar (Matching Header in Image) */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Ajay'}`}
              alt={user?.name}
              className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-500/30 object-cover"
            />
            <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200">
              {user?.name || 'Ajay Waghmare'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 saas-card bg-white dark:bg-slate-900 p-2 shadow-2xl z-50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.name || 'Ajay Waghmare'}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email || 'student@university.edu'}</p>
              </div>

              <button
                onClick={() => { onNavigate('profile'); setProfileOpen(false); }}
                className="w-full text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-xl flex items-center gap-2 font-semibold transition-colors"
              >
                <User className="w-4 h-4 text-indigo-500" />
                Profile Settings
              </button>

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
