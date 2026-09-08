import React from 'react';
import {
  Plus,
  Kanban as KanbanIcon,
  List as ListIcon,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Edit2,
  Trash2
} from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

const TaskKanban = ({
  tasks = [],
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
  onOpenTaskModal,
  onSwitchView,
}) => {
  const columns = [
    { id: 'TODO', title: 'To Do', badgeVariant: 'default' },
    { id: 'IN_PROGRESS', title: 'In Progress', badgeVariant: 'primary' },
    { id: 'REVIEW', title: 'Review', badgeVariant: 'warning' },
    { id: 'COMPLETED', title: 'Done', badgeVariant: 'success' },
  ];

  const getPriorityBadge = (priority) => {
    const p = (priority || 'MEDIUM').toUpperCase();
    if (p === 'HIGH') return <Badge variant="danger">High</Badge>;
    if (p === 'MEDIUM') return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="success">Low</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Kanban Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            Kanban Board
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize workload and drag/move cards across workflow columns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-[10px] border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSwitchView && onSwitchView('list')}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSwitchView && onSwitchView('kanban')}
              className="p-1.5 rounded-md bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
              title="Kanban View"
            >
              <KanbanIcon className="w-4 h-4" />
            </button>
          </div>

          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
            Add Task
          </Button>
        </div>
      </div>

      {/* Columns Container (Horizontally Scrollable on smaller viewports) */}
      <div className="flex gap-5 overflow-x-auto pb-4 items-start min-h-[600px]">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => (t.status || 'TODO').toUpperCase() === col.id);

          return (
            <div
              key={col.id}
              className="w-72 sm:w-80 shrink-0 bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-[16px] border border-slate-200/80 dark:border-slate-800 space-y-4"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{col.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={onOpenTaskModal}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Cards List */}
              <div className="space-y-3">
                {colTasks.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-[12px]">
                    <p className="text-xs text-slate-400 font-medium">No tasks in {col.title}</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <Card
                      key={task.id}
                      hover
                      className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 truncate">
                          {task.courseName || task.course?.name || 'General'}
                        </span>
                        {getPriorityBadge(task.priority)}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{task.title}</h4>
                        {task.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {col.id !== 'COMPLETED' && (
                            <button
                              onClick={() => onUpdateStatus(task.id, 'COMPLETED')}
                              className="p-1 text-slate-400 hover:text-emerald-600 rounded-md"
                              title="Mark Complete"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => onEditTask(task)}
                            className="p-1 text-slate-400 hover:text-blue-600 rounded-md"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-md"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))
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
