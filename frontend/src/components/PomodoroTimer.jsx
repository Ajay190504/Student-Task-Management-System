import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Badge from './ui/Badge';

const PomodoroTimer = ({ tasks = [] }) => {
  const { addToast } = useToast();
  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('1');

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

  // Session History Data matching Screen 9 in reference image
  const historyLogs = [
    { id: 1, date: 'Sep 6, 2026', mode: 'Focus', duration: '25 min' },
    { id: 2, date: 'Sep 6, 2026', mode: 'Short Break', duration: '5 min' },
    { id: 3, date: 'Sep 5, 2026', mode: 'Focus', duration: '25 min' },
    { id: 4, date: 'Sep 5, 2026', mode: 'Long Break', duration: '15 min' },
  ];

  return (
    <div className="space-y-6">
      {/* Header (Page 9) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Timer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Study Session
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Focus on your goals, one session at a time.
          </p>
        </div>
      </div>

      {/* Main Grid: Timer & Current Task Selector (Page 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Circular Focus Timer */}
        <Card className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 text-center flex flex-col items-center justify-center space-y-6">
          {/* Mode Selector Pills */}
          <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl max-w-sm w-full border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => switchMode('work')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'work'
                  ? 'bg-indigo-600 text-white shadow-md'
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
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Long Break
            </button>
          </div>

          {/* SVG Circular Timer (Page 9 Circle) */}
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
                className="text-indigo-600 dark:text-indigo-500 stroke-current transition-all duration-1000 ease-linear"
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
              variant={isActive ? 'warning' : 'primary'}
              size="lg"
              icon={isActive ? Pause : Play}
              onClick={() => setIsActive(!isActive)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-full shadow-lg"
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
        </Card>

        {/* Right Side: Current Task & Sessions Counter */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Task Selector Card */}
          <Card className="bg-white dark:bg-slate-900 p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Current Task
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Build REST API for task management
              </h3>
              <p className="text-xs text-indigo-500 font-medium mt-0.5">Web Dev</p>
            </div>
          </Card>

          {/* Sessions Today Counter Card */}
          <Card className="bg-white dark:bg-slate-900 p-5 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Sessions Today</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">3 / 4</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-[11px] text-slate-400">Great focus! 1 session left to hit daily goal.</p>
          </Card>
        </div>
      </div>

      {/* Session History Table (Bottom Section of Page 9) */}
      <Card className="bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Session History</CardTitle>
          <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">View all →</span>
        </CardHeader>
        <CardContent className="p-0">
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
                      <Badge variant={log.mode === 'Focus' ? 'primary' : 'success'}>{log.mode}</Badge>
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">{log.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
