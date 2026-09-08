import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon, CheckCircle2 } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { Select } from './ui/Input';

const PomodoroTimer = ({ tasks = [] }) => {
  const [mode, setMode] = useState('focus'); // focus (25m), shortBreak (5m), longBreak (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [completedSessions, setCompletedSessions] = useState(4);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedSessions((prev) => prev + 1);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'focus') setTimeLeft(25 * 60);
    if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    if (newMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'focus') setTimeLeft(25 * 60);
    if (mode === 'shortBreak') setTimeLeft(5 * 60);
    if (mode === 'longBreak') setTimeLeft(15 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Pomodoro Focus Timer
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Boost your study efficiency with structured focus intervals.
        </p>
      </div>

      {/* Main Timer Card */}
      <Card className="p-8 text-center space-y-8 shadow-md">
        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-[10px] gap-1">
          <button
            onClick={() => handleModeChange('focus')}
            className={`px-4 py-2 rounded-[8px] text-xs font-bold transition-all ${
              mode === 'focus'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => handleModeChange('shortBreak')}
            className={`px-4 py-2 rounded-[8px] text-xs font-bold transition-all ${
              mode === 'shortBreak'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => handleModeChange('longBreak')}
            className={`px-4 py-2 rounded-[8px] text-xs font-bold transition-all ${
              mode === 'longBreak'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Big Display Clock */}
        <div className="py-6">
          <span className="text-7xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-mono">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={isRunning ? 'secondary' : 'primary'}
            size="lg"
            icon={isRunning ? Pause : Play}
            onClick={() => setIsRunning(!isRunning)}
            className="w-36"
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            icon={RotateCcw}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        {/* Current Task Selector */}
        <div className="max-w-md mx-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <Select
            label="Target Task for this Session"
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
          >
            <option value="">Select task (optional)...</option>
            {tasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {/* Session Summary Card */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-[10px] bg-blue-50 text-blue-600 dark:bg-blue-950/40">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Today's Sessions</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{completedSessions} completed</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40">
            <TimerIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Focus Time</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">1h 40m</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PomodoroTimer;
