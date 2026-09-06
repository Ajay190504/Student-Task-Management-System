import React from 'react';

const Badge = ({ children, variant = 'default', className = '', style }) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-wide border';

  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    primary: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    info: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`} style={style}>
      {children}
    </span>
  );
};

export default Badge;
