import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const PomodoroTimer = ({ tasks }) => {
  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const durations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
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
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

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

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <Timer className="w-6 h-6 text-indigo-400" /> Focus Pomodoro Timer
        </h2>
        <p className="text-xs text-slate-400 mt-1">Boost study productivity by working in focused intervals with scheduled rest breaks.</p>
      </div>

      <div className="glass-panel rounded-3xl p-8 border border-slate-800 text-center space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl max-w-sm mx-auto border border-slate-800">
          <button
            onClick={() => switchMode('work')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${mode === 'work' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Study (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${mode === 'longBreak' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Timer Display */}
        <div className="py-6">
          <span className="text-7xl font-extrabold tracking-tight font-mono gradient-text">
            {formatTime(secondsLeft)}
          </span>
        </div>

        {/* Target Task Selector */}
        <div className="max-w-md mx-auto">
          <label className="block text-xs font-semibold text-slate-400 mb-1">Focus Target Task</label>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="">-- General Study Session --</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>{task.title}</option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-3 rounded-2xl text-sm font-bold text-white flex items-center gap-2 shadow-xl transition-all ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                : 'gradient-btn shadow-indigo-500/30'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isActive ? 'Pause Session' : 'Start Focus'}
          </button>

          <button
            onClick={resetTimer}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-2xl border border-slate-800 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
