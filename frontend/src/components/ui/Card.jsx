import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-[14px] p-5 sm:p-6 shadow-sm ${
        hover ? 'hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-slate-800/60 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export default Card;
