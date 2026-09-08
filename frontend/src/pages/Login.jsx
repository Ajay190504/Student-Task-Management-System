import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  CheckSquare,
  BarChart3,
  Timer
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Login = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('student@university.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email address and password');
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

  const handleDemoLogin = async () => {
    try {
      setSubmitting(true);
      await login('student@university.edu', 'password123');
    } catch (err) {
      setError('Demo login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[18px] shadow-sm overflow-hidden min-h-[540px]">
        
        {/* Left Side: Brand Panel */}
        <div className="md:col-span-5 bg-[#0F172A] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Task<span className="text-blue-500">Pulse</span>
              </span>
            </div>

            <div className="space-y-2 pt-6">
              <h2 className="text-2xl font-bold tracking-tight text-white leading-snug">
                Organize your academic workload with clarity.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Single workspace for tracking course tasks, Pomodoro focus sessions, and productivity insights.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-8 border-t border-slate-800 z-10">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <CheckSquare className="w-4 h-4 text-blue-400" />
              <span>Smart task prioritization</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Timer className="w-4 h-4 text-blue-400" />
              <span>Integrated Pomodoro focus sessions</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>Real-time workload analytics</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="space-y-1 mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Welcome back</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to continue your productivity journey.</p>
            </div>

            {error && (
              <div className="p-3.5 mb-5 rounded-[10px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 flex items-center gap-2.5 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="space-y-1">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    icon={Lock}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-[34px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500 cursor-pointer hover:underline">Forgot password?</span>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Quick Demo Login
                </button>
              </div>

              <Button type="submit" variant="primary" className="w-full h-11 mt-2" isLoading={submitting}>
                Sign In
              </Button>
            </form>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-blue-600 font-semibold hover:underline"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
