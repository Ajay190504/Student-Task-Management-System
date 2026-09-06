import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  BookOpen,
  Zap,
  ListTodo
} from 'lucide-react';
import Button from '../components/ui/Button';

const Register = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setSubmitting(true);
      await register(name, email, password, 'Computer Science');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your information.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-white dark:bg-slate-900 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Left Side: Split Screen Hero Banner (Page 2) */}
        <div className="hidden md:flex md:col-span-6 flex-col justify-between p-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-950 text-white relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">TaskPulse</span>
          </div>

          {/* Center Content */}
          <div className="relative z-10 space-y-6 my-auto pt-6 pb-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                Build Better Habits<br />Achieve More
              </h2>
              <p className="text-xs text-indigo-100/80 leading-relaxed max-w-sm">
                Join TaskPulse and take control of your academic journey.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 mt-0.5">
                  <ListTodo className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Manage Tasks</h4>
                  <p className="text-[11px] text-indigo-200/70">Stay on top of your assignments</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 mt-0.5">
                  <BookOpen className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Track Courses</h4>
                  <p className="text-[11px] text-indigo-200/70">Organize your study material</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 mt-0.5">
                  <Zap className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Boost Productivity</h4>
                  <p className="text-[11px] text-indigo-200/70">Use Pomodoro and study sessions</p>
                </div>
              </div>
            </div>

            {/* Artwork Card */}
            <div className="pt-4">
              <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-3.5 backdrop-blur-md shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white">Free Account Setup</p>
                    <p className="text-[10px] text-indigo-200/70">Unlimited tasks & course tags</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  Instant Access
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-indigo-200/60 font-medium relative z-10">
            © {new Date().getFullYear()} TaskPulse. All rights reserved.
          </p>
        </div>

        {/* Right Side: Form Panel */}
        <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get started with your Free account.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 py-2.5 text-xs font-bold mt-2"
              isLoading={submitting}
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 font-medium absolute">
              or continue with
            </span>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          <div className="text-center pt-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
