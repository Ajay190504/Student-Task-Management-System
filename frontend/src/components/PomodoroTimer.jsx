import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';

const PomodoroTimer = ({ tasks = [] }) => {
  const { addToast } = useToast();
  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const durations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      addToast('Focus session completed! Great job! 🎉', 'success');
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, addToast]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setSecondsLeft(durations[newMode]);
    setIsActive(false);
  };

  const resetTimer = () => {
    setSecondsLeft(durations[mode]);
    setIsActive(false);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const totalDuration = durations[mode];
  const progressPercent = ((totalDuration - secondsLeft) / totalDuration) * 100;
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  // Session History Data
  const historyLogs = [
    { id: 1, date: 'Sep 6, 2026', mode: 'Focus', duration: '25 min' },
    { id: 2, date: 'Sep 6, 2026', mode: 'Short Break', duration: '5 min' },
    { id: 3, date: 'Sep 5, 2026', mode: 'Focus', duration: '25 min' },
    { id: 4, date: 'Sep 5, 2026', mode: 'Long Break', duration: '15 min' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-md">
            <Timer className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Study Session
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Focus on your goals, one Pomodoro session at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Timer & Current Task Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Circular Focus Timer */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center flex flex-col items-center justify-center space-y-6">
          {/* Mode Selector Pills */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl max-w-sm w-full border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => switchMode('work')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'work'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Focus
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'shortBreak'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'longBreak'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Long Break
            </button>
          </div>

          {/* SVG Circular Timer */}
          <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-slate-100 dark:text-slate-800 stroke-current"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-blue-600 stroke-current transition-all duration-1000 ease-linear"
                strokeWidth="5"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-100">
                {formatTime(secondsLeft)}
              </span>
            </div>
          </div>

          {/* Play/Pause & Reset Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant={isActive ? 'danger' : 'primary'}
              size="lg"
              icon={isActive ? Pause : Play}
              onClick={() => setIsActive(!isActive)}
              className="px-6 rounded-full shadow-lg"
            >
              {isActive ? 'Pause' : 'Start Focus'}
            </Button>
            <button
              onClick={resetTimer}
              className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Current Task & Sessions Counter */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Task Selector Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Current Task
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Build REST API for task management
              </h3>
              <p className="text-xs text-blue-600 font-bold mt-0.5">Web Development</p>
            </div>
          </div>

          {/* Sessions Today Counter Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Sessions Today</span>
              <span className="text-blue-600 font-extrabold text-sm">3 / 4</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-[11px] text-slate-400">Great focus! 1 session left to hit daily goal.</p>
          </div>
        </div>
      </div>

      {/* Session History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Session History</h3>
          <span className="text-xs text-blue-600 font-bold cursor-pointer hover:underline">View all →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40">
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Mode</th>
                <th className="py-2.5 px-4">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {historyLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300">{log.date}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${log.mode === 'Focus' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {log.mode}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">{log.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
