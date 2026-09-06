import React from 'react';
import { Calendar, CheckSquare, Plus, Edit2, Trash2, Tag, Clock } from 'lucide-react';

const TaskKanban = ({ tasks, onUpdateStatus, onEditTask, onDeleteTask, onOpenTaskModal }) => {
  const columns = [
    { id: 'TODO', title: 'To Do', color: 'border-slate-700 bg-slate-900/40', badge: 'bg-slate-800 text-slate-300' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'border-amber-500/30 bg-amber-950/10', badge: 'bg-amber-500/20 text-amber-300' },
    { id: 'COMPLETED', title: 'Completed', color: 'border-emerald-500/30 bg-emerald-950/10', badge: 'bg-emerald-500/20 text-emerald-300' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'MEDIUM': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default: return 'bg-slate-700/50 text-slate-400 border-slate-600/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Task Kanban Board</h2>
          <p className="text-xs text-slate-400">Drag or click status quick-switches to move tasks across lifecycle stages.</p>
        </div>
        <button
          onClick={onOpenTaskModal}
          className="gradient-btn text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
        >
          <Plus className="w-3.5 h-3.5" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className={`glass-panel rounded-2xl p-4 border ${col.color} flex flex-col min-h-[500px]`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-200">{col.title}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${col.badge}`}>
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.map((task) => {
                  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length || 0;
                  const totalSubtasks = task.subtasks?.length || 0;
                  const subtaskPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

                  return (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl glass-card border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-200 leading-snug line-clamp-2">{task.title}</h4>
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                          <button
                            onClick={() => onEditTask(task)}
                            className="p-1 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {task.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{task.description}</p>
                      )}

                      {/* Course Badge & Priority */}
                      <div className="flex items-center gap-2 flex-wrap text-[10px]">
                        {task.course && (
                          <span
                            className="px-2 py-0.5 rounded-md font-semibold text-slate-200 border"
                            style={{ backgroundColor: `${task.course.colorCode}20`, borderColor: `${task.course.colorCode}50`, color: task.course.colorCode }}
                          >
                            {task.course.code}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-md font-semibold border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="px-2 py-0.5 rounded-md font-medium text-slate-400 bg-slate-800/60">
                          {task.category}
                        </span>
                      </div>

                      {/* Subtask progress */}
                      {totalSubtasks > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <CheckSquare className="w-3 h-3 text-indigo-400" /> Subtasks
                            </span>
                            <span>{completedSubtasks}/{totalSubtasks}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full transition-all"
                              style={{ width: `${subtaskPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Footer & Due Date */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px]">
                        <span className={`flex items-center gap-1 ${task.isOverdue ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                          <Calendar className="w-3 h-3" />
                          {task.dueDate ? task.dueDate : 'No Due Date'}
                        </span>

                        {/* Status Switcher Buttons */}
                        <div className="flex items-center gap-1">
                          {col.id !== 'TODO' && (
                            <button
                              onClick={() => onUpdateStatus(task.id, 'TODO')}
                              className="px-1.5 py-0.5 text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                            >
                              Todo
                            </button>
                          )}
                          {col.id !== 'IN_PROGRESS' && (
                            <button
                              onClick={() => onUpdateStatus(task.id, 'IN_PROGRESS')}
                              className="px-1.5 py-0.5 text-[9px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded"
                            >
                              Progress
                            </button>
                          )}
                          {col.id !== 'COMPLETED' && (
                            <button
                              onClick={() => onUpdateStatus(task.id, 'COMPLETED')}
                              className="px-1.5 py-0.5 text-[9px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded"
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
                  <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-500">No tasks in {col.title}</p>
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
