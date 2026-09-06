import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

const Login = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide your email address and password');
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl saas-card bg-white dark:bg-slate-900 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* Left Side: Product Branding Banner */}
        <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">TaskPulse</span>
            </div>

            <div className="space-y-2 pt-8">
              <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
                Academic Task & Workload Platform
              </h2>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                Streamline course assignments, Kanban lifecycles, and focus pomodoro study sessions in one unified SaaS workspace.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 text-xs font-semibold text-indigo-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-300" /> Real-time Analytics & Productivity Index
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-300" /> Interactive Kanban & Structured Directory
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-300" /> Focus Pomodoro Timer & Session Security
              </div>
            </div>
          </div>

          <p className="text-[11px] text-indigo-200/60 font-medium relative z-10 pt-8">
            © {new Date().getFullYear()} TaskPulse Academic Edition
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="p-6 sm:p-8 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sign in to manage your academic workload and course deadlines.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-10 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 saas-focus"
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              isLoading={submitting}
              icon={ArrowRight}
            >
              Sign In to Workspace
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account yet?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
