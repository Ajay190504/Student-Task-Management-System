import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'There are no items matching your criteria at this time.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-12 px-4 saas-card border-dashed border-2 border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-3">
      <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
        <Icon className="w-6 h-6" />
      </div>
      <div className="max-w-xs space-y-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
