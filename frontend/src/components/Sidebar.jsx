import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Kanban,
  BookOpen,
  BarChart3,
  Timer,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  GraduationCap,
  Settings,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      group: 'Workspace',
      items: [
        { id: 'tasks', label: 'Tasks', icon: CheckSquare },
        { id: 'kanban', label: 'Kanban Board', icon: Kanban },
        { id: 'courses', label: 'Courses', icon: BookOpen },
      ]
    },
    {
      group: 'Productivity',
      items: [
        { id: 'pomodoro', label: 'Pomodoro Timer', icon: Timer },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ]
    },
    {
      group: 'Account',
      items: [
        { id: 'profile', label: 'Profile & Settings', icon: User },
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 bg-[#0F172A] text-slate-100 select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-2 pb-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-extrabold text-lg text-white tracking-tight leading-none">
                  Task<span className="text-blue-500">Pulse</span>
                </h1>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">Academic Productivity</p>
              </div>
            )}
          </div>

          {/* Desktop Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Drawer Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grouped Navigation Links */}
        <div className="space-y-5">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (item.id === 'tasks' && activeTab === 'list');
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id === 'tasks' ? 'list' : item.id);
                      setMobileOpen(false);
                    }}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    } ${collapsed ? 'justify-center px-2' : ''}`}
                  >
                    <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar User Footer */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        {!collapsed && (
          <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-slate-900/80 border border-slate-800/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="overflow-hidden text-left">
                <p className="text-xs font-bold text-slate-200 truncate">{user?.name || 'Student User'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email || 'student@taskpulse.edu'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        {collapsed && (
          <button
            onClick={logout}
            title="Logout"
            className="w-full flex justify-center p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-800"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Container */}
      <aside
        className={`hidden md:block bg-[#0F172A] sticky top-0 h-screen transition-all duration-200 z-30 shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-xs bg-[#0F172A] h-full shadow-2xl z-10 border-r border-slate-800">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
