import React from 'react';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="saas-card p-5 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-8 rounded-xl" />
    </div>
    <Skeleton className="h-8 w-16" />
    <Skeleton className="h-3 w-36" />
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center justify-between py-3.5 px-4 border-b border-slate-200 dark:border-slate-800 space-x-4">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-4 w-1/6" />
    <Skeleton className="h-4 w-1/6" />
    <Skeleton className="h-6 w-16 rounded-lg" />
  </div>
);

export default Skeleton;
