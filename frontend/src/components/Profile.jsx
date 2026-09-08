import React, { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  Palette,
  Camera,
  CheckCircle2,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState('personal');

  // Form State
  const [name, setName] = useState(user?.name || 'Ajay Waghmare');
  const [email, setEmail] = useState(user?.email || 'student@university.edu');
  const [department, setDepartment] = useState(user?.department || 'Computer Science');
  const [language, setLanguage] = useState('English');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications State
  const [emailReminders, setEmailReminders] = useState(true);
  const [dueDateAlerts, setDueDateAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const [saving, setSaving] = useState(false);

  const handleSavePersonal = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      const updatedUser = { ...user, name, email, department };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      addToast('Profile information saved successfully!', 'success');
      setSaving(false);
    }, 400);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addToast('New passwords do not match!', 'error');
      return;
    }
    addToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const subTabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'password', label: 'Change Password', icon: Lock },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Profile Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your account details, preferences, and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sub-navigation Bar */}
        <Card className="md:col-span-1 p-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs h-fit space-y-1">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* TAB 1: Personal Information */}
          {activeSubTab === 'personal' && (
            <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile photo and personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePersonal} className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="relative group cursor-pointer">
                      <img
                        src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                        alt={name}
                        className="w-16 h-16 rounded-2xl bg-[#0B132B] border-2 border-blue-500/40 object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{name}</h4>
                      <p className="text-xs text-slate-400">{department || 'Student'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Department / Major
                      </label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Language
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="Hindi">Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button type="submit" variant="primary" size="md" isLoading={saving}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* TAB 2: Change Password */}
          {activeSubTab === 'password' && (
            <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Ensure your account security with a strong password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md">
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* TAB 3: Notifications */}
          {activeSubTab === 'notifications' && (
            <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you receive alerts and deadline reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Email Deadline Reminders</p>
                    <p className="text-[11px] text-slate-400">Receive email alerts 24h prior to task deadline</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailReminders}
                    onChange={(e) => setEmailReminders(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Overdue Task Alerts</p>
                    <p className="text-[11px] text-slate-400">Instant notification when a task passes its due date</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={dueDateAlerts}
                    onChange={(e) => setDueDateAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Weekly Performance Digest</p>
                    <p className="text-[11px] text-slate-400">Summary email of your productivity score every Sunday</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 4: Appearance */}
          {activeSubTab === 'appearance' && (
            <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
              <CardHeader>
                <CardTitle>Appearance & Theme</CardTitle>
                <CardDescription>Customize the interface color mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-center space-y-3 ${
                      theme === 'light'
                        ? 'border-blue-600 bg-blue-500/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <Sun className="w-8 h-8 mx-auto text-amber-500" />
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Light Theme</p>
                    {theme === 'light' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>

                  <div
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-center space-y-3 ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <Moon className="w-8 h-8 mx-auto text-blue-400" />
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Dark Theme</p>
                    {theme === 'dark' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
