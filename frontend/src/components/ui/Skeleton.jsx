import React from 'react';

const Skeleton = ({ className = '', variant = 'text' }) => {
  const base = 'animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md';

  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-2xl',
    button: 'h-11 w-24 rounded-xl',
  };

  return <div className={`${base} ${variants[variant] || ''} ${className}`} />;
};

export const SkeletonCard = () => (
  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="avatar" />
      <Skeleton className="w-16 h-5" />
    </div>
    <Skeleton variant="title" />
    <Skeleton variant="text" />
  </div>
);

export default Skeleton;
