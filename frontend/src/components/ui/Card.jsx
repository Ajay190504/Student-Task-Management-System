import React from 'react';

const Card = ({ children, className = '', hoverEffect = true, ...props }) => {
  return (
    <div
      className={`saas-card p-5 ${hoverEffect ? 'hover:border-slate-400 dark:hover:border-slate-700' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800/80 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-sm font-bold text-slate-900 dark:text-slate-100 ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-xs text-slate-500 dark:text-slate-400 mt-0.5 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export default Card;
