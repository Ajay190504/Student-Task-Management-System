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
  CheckSquare,
  BarChart3,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#F0F4F8] dark:bg-slate-950 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header Link */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-2 px-2">
        <div className="flex items-center gap-2.5 lg:hidden">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Task<span className="text-blue-600 dark:text-blue-400">Pulse</span>
          </span>
        </div>
        <div className="ml-auto text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
          <span>Already have an account?</span>
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 transition-all"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container Card (Image 3 Split Screen) */}
      <div className="w-full max-w-7xl mx-auto my-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden min-h-[640px]">
          
          {/* Left Hero Panel (Image 3 Left Side) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-10 bg-[#0B132B] text-white relative overflow-hidden">
            {/* Background Ambient Layer */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/40 via-slate-900 to-[#0B132B]" />

            {/* Top Brand Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 border border-blue-400/30">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Task<span className="text-blue-500">Pulse</span>
                </span>
              </div>
            </div>

            {/* Hero Main Heading & Bullet Features */}
            <div className="relative z-10 my-auto py-6 space-y-6">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Build Better Habits,<br />
                  Achieve <span className="relative text-blue-400 underline decoration-blue-500 decoration-4 underline-offset-8">Bigger Goals</span>
                </h1>
                <p className="text-xs text-slate-300 mt-3.5 leading-relaxed max-w-md">
                  TaskPulse helps you manage your academic workload, track progress, and make the most of your study time — all in one place.
                </p>
              </div>

              {/* 3 Feature Highlights (Image 3 Features) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Organize Tasks</h3>
                    <p className="text-[11px] text-slate-400">Keep track of your assignments, deadlines and priorities.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Track Progress</h3>
                    <p className="text-[11px] text-slate-400">Monitor your academic journey with real-time insights.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Study Focused</h3>
                    <p className="text-[11px] text-slate-400">Use Pomodoro and study sessions to stay consistent.</p>
                  </div>
                </div>
              </div>

              {/* Books Stack Visual */}
              <div className="pt-4 flex items-end gap-3">
                <div className="space-y-1 text-center font-bold text-[10px]">
                  <div className="px-3.5 py-1.5 rounded-lg bg-blue-900/90 border border-blue-700/60 text-blue-200 shadow-md">
                    Data Structures
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-700/60 text-cyan-200 shadow-md">
                    Web Development
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/60 text-slate-300 shadow-md">
                    System Design
                  </div>
                </div>
              </div>
            </div>

            {/* Left Bottom Footer */}
            <p className="text-[11px] text-slate-400 font-medium relative z-10">
              © {new Date().getFullYear()} TaskPulse Academic Edition
            </p>
          </div>

          {/* Right Form Card Panel (Image 3 Right Side) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-9 shadow-xl border border-slate-100 dark:border-slate-800 space-y-5">
              
              {/* Card Header & Logo */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
                    <GraduationCap className="w-5.5 h-5.5 text-white" />
                  </div>
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                    Task<span className="text-blue-600 dark:text-blue-400">Pulse</span>
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    Create your account
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Join TaskPulse and start managing your academic goals today.
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
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
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Requirements Box (Image 3 Feature) */}
                  <div className="mt-2 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Password requirements:</span>
                    </div>
                    <p className="pl-5 text-[10px] text-slate-500">• At least 8 characters &nbsp;• One uppercase letter &nbsp;• One number</p>
                  </div>
                </div>

                {/* Confirm Password */}
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
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Checkbox Terms */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="terms-agree"
                    type="checkbox"
                    required
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                  />
                  <label htmlFor="terms-agree" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                    I agree to the <a href="#terms" className="text-blue-600 font-bold hover:underline">Terms of Service</a> and <a href="#privacy" className="text-blue-600 font-bold hover:underline">Privacy Policy</a>
                  </label>
                </div>

                {/* Primary Blue Create Account Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-xs tracking-wide disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider absolute">
                  OR
                </span>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Bottom Switch Account Link */}
              <div className="text-center pt-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex justify-center inline-flex items-center gap-1 transition-all"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;

