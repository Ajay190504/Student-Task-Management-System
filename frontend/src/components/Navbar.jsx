import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, Plus, LogOut, ShieldCheck, User } from 'lucide-react';

const Navbar = ({ onOpenTaskModal, searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks, courses, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenTaskModal}
          className="gradient-btn text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors"
          >
            <img
              src={user?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Student"}
              alt={user?.name}
              className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-200 leading-tight">{user?.name}</p>
              <p className="text-[10px] text-indigo-400 font-medium">{user?.role === 'ROLE_INSTRUCTOR' ? 'Instructor' : 'Student'}</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                <p className="text-xs font-semibold text-slate-200">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {user?.department || 'Computer Science'}
                </span>
              </div>

              <button
                onClick={logout}
                className="w-full text-left text-xs text-rose-400 hover:bg-rose-500/10 p-2 rounded-xl flex items-center gap-2 font-medium transition-colors"
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
