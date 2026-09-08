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
  CheckCircle2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';

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

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setSubmitting(true);
      await register(name, email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[18px] shadow-sm overflow-hidden min-h-[560px]">
        
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
                Join TaskPulse today.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create an account to streamline your course tasks, deadlines, and study schedule.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-6 border-t border-slate-800 z-10 text-xs text-slate-300">
            <p className="font-semibold text-slate-200 mb-1">Password Requirements:</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${password.length >= 6 ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>At least 6 characters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${password && password === confirmPassword ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Passwords match</span>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="space-y-1 mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Create Account</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Start organizing your academic workload in minutes.</p>
            </div>

            {error && (
              <div className="p-3.5 mb-5 rounded-[10px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 flex items-center gap-2.5 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <Input
                label="Full Name"
                type="text"
                icon={User}
                placeholder="Ajay Waghmare"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    icon={Lock}
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <Input
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full h-11 mt-4" isLoading={submitting}>
                Create Account
              </Button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
