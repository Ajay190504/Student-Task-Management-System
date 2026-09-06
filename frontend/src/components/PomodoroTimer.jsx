import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';
import Card from './ui/Card';

const PomodoroTimer = ({ tasks }) => {
  const { addToast } = useToast();
  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');

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

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2 tracking-tight">
          <Timer className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Academic Focus Timer
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Boost academic performance by working in focused intervals with rest breaks.
        </p>
      </div>

      <Card className="text-center p-8 bg-white dark:bg-slate-900 shadow-xl rounded-3xl space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl max-w-sm mx-auto border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => switchMode('work')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              mode === 'work'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              mode === 'shortBreak'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Short Rest (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              mode === 'longBreak'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Long Rest (15m)
          </button>
        </div>

        {/* Circular SVG Timer Display */}
        <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-slate-100 dark:text-slate-800 stroke-current"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-indigo-600 dark:text-indigo-500 stroke-current transition-all duration-1000 ease-linear"
              strokeWidth="6"
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
              {mode === 'work' ? 'Study Mode' : 'Rest Break'}
            </span>
          </div>
        </div>

        {/* Target Task Selector */}
        <div className="max-w-md mx-auto">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Focus Target Task
          </label>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 saas-focus"
          >
            <option value="">-- General Study Session --</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant={isActive ? 'warning' : 'primary'}
            size="lg"
            icon={isActive ? Pause : Play}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Pause Session' : 'Start Focus'}
          </Button>

          <Button variant="outline" size="lg" icon={RotateCcw} onClick={resetTimer} title="Reset Timer" />
        </div>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
