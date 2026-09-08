import React from 'react';

export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative rounded-[10px]">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full h-11 ${Icon ? 'pl-10' : 'px-3.5'} pr-3.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 border ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500'
          } rounded-[10px] transition-all outline-none ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export const Select = React.forwardRef(({
  label,
  error,
  children,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`w-full h-11 px-3.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border ${
          error ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
        } rounded-[10px] transition-all outline-none cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export const Textarea = React.forwardRef(({
  label,
  error,
  rows = 3,
  className = '',
  id,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={`w-full p-3.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 border ${
          error ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
        } rounded-[10px] transition-all outline-none resize-y ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Input;
