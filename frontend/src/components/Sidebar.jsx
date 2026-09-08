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
  GraduationCap,
  Lightbulb,
  Settings
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
    <div className="flex flex-col justify-between h-full p-4 bg-[#0B132B] text-white">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            {!collapsed && (
              <h1 className="font-extrabold text-lg text-white tracking-tight leading-none">
                Task<span className="text-blue-500">Pulse</span>
              </h1>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Drawer Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'tasks' && (activeTab === 'list' || activeTab === 'kanban'));
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id === 'tasks' ? 'kanban' : item.id);
                  setMobileOpen(false);
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                } ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        {/* Lightbulb Quote Card (Image Reference Feature) */}
        {!collapsed && (
          <div className="p-4 rounded-2xl bg-[#15203D] border border-slate-800/80 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-inner">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-slate-200 leading-snug">
              Small steps every day lead to big results.
            </p>
            <div className="w-6 h-1 bg-blue-500 rounded-full" />
          </div>
        )}

        {/* Bottom Options: Settings & Logout */}
        <div className="space-y-1">
          <button
            onClick={() => { setActiveTab('profile'); setMobileOpen(false); }}
            title={collapsed ? 'Settings' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Settings className="w-4 h-4 flex-shrink-0 text-slate-400" />
            {!collapsed && <span>Settings</span>}
          </button>

          <button
            onClick={logout}
            title={collapsed ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0 text-slate-400" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Container */}
      <aside
        className={`hidden md:block bg-[#0B132B] sticky top-0 h-screen transition-all duration-200 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-xs bg-[#0B132B] h-full shadow-2xl z-10 border-r border-slate-800">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
