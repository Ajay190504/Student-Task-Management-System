import React from 'react';
import { Calendar, CheckSquare, Plus, Edit2, Trash2 } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

const TaskKanban = ({ tasks, onUpdateStatus, onEditTask, onDeleteTask, onOpenTaskModal }) => {
  const columns = [
    {
      id: 'TODO',
      title: 'To Do',
      color: 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40',
      badge: 'default',
    },
    {
      id: 'IN_PROGRESS',
      title: 'In Progress',
      color: 'border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/10',
      badge: 'warning',
    },
    {
      id: 'COMPLETED',
      title: 'Completed',
      color: 'border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/10',
      badge: 'success',
    },
  ];

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'URGENT': return 'danger';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Kanban Lifecycle Board
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize task progress across academic stages with quick-switch controls.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`saas-card rounded-2xl p-4 border ${col.color} flex flex-col min-h-[550px] bg-white dark:bg-slate-900/50`}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{col.title}</span>
                <Badge variant={col.badge}>{colTasks.length}</Badge>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.map((task) => {
                  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length || 0;
                  const totalSubtasks = task.subtasks?.length || 0;
                  const subtaskPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

                  return (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl saas-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all group shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                          {task.title}
                        </h4>
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                          <button
                            onClick={() => onEditTask(task)}
                            className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {task.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {/* Course Badge & Priority */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {task.course && (
                          <Badge
                            style={{
                              color: task.course.colorCode,
                              borderColor: `${task.course.colorCode}40`,
                              backgroundColor: `${task.course.colorCode}15`,
                            }}
                          >
                            {task.course.code}
                          </Badge>
                        )}
                        <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                        <span className="text-[10px] font-semibold text-slate-400 capitalize">
                          {task.category?.toLowerCase().replace('_', ' ')}
                        </span>
                      </div>

                      {/* Subtasks Progress */}
                      {totalSubtasks > 0 && (
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <CheckSquare className="w-3 h-3 text-indigo-500" /> Subtasks
                            </span>
                            <span>
                              {completedSubtasks}/{totalSubtasks}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                              style={{ width: `${subtaskPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Footer & Quick Status Switch */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[10px]">
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            task.isOverdue ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          {task.dueDate ? task.dueDate : 'No Date'}
                        </span>

                        <div className="flex items-center gap-1">
                          {col.id !== 'TODO' && (
                            <button
                              onClick={() => onUpdateStatus(task.id, 'TODO')}
                              className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                            >
                              Todo
                            </button>
                          )}
                          {col.id !== 'IN_PROGRESS' && (
                            <button
                              onClick={() => onUpdateStatus(task.id, 'IN_PROGRESS')}
                              className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded"
                            >
                              Progress
                            </button>
                          )}
                          {col.id !== 'COMPLETED' && (
                            <button
                              onClick={() => onUpdateStatus(task.id, 'COMPLETED')}
                              className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded"
                            >
                              Done
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400 dark:text-slate-500">No tasks in {col.title}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskKanban;
