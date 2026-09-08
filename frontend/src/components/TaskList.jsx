import React from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  Plus,
  Kanban as KanbanIcon,
  List as ListIcon,
  CheckCircle2,
  Trash2,
  Edit2
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { Input, Select } from './ui/Input';
import EmptyState from './ui/EmptyState';

const TaskList = ({
  tasks = [],
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
  onOpenTaskModal,
  onSwitchView,
  filterCourse,
  setFilterCourse,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  courses = [],
}) => {
  const getPriorityBadge = (priority) => {
    const p = (priority || 'MEDIUM').toUpperCase();
    if (p === 'HIGH') return <Badge variant="danger">High</Badge>;
    if (p === 'MEDIUM') return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="success">Low</Badge>;
  };

  const getStatusBadge = (status) => {
    const s = (status || 'TODO').toUpperCase();
    if (s === 'COMPLETED') return <Badge variant="success">Completed</Badge>;
    if (s === 'IN_PROGRESS') return <Badge variant="primary">In Progress</Badge>;
    if (s === 'REVIEW') return <Badge variant="warning">Review</Badge>;
    return <Badge variant="default">To Do</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            Tasks
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your academic workload and track upcoming assignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-[10px] border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSwitchView && onSwitchView('list')}
              className="p-1.5 rounded-md bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSwitchView && onSwitchView('kanban')}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              title="Kanban View"
            >
              <KanbanIcon className="w-4 h-4" />
            </button>
          </div>

          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenTaskModal}>
            Create Task
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            placeholder="Search tasks..."
            icon={Search}
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />

          <Select
            value={filterStatus || ''}
            onChange={(e) => setFilterStatus && setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </Select>

          <Select
            value={filterPriority || ''}
            onChange={(e) => setFilterPriority && setFilterPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </Select>

          <Select
            value={filterCourse || ''}
            onChange={(e) => setFilterCourse && setFilterCourse(e.target.value)}
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {/* Desktop List Table & Mobile Cards */}
      {tasks.length === 0 ? (
        <EmptyState
          icon={CalendarIcon}
          title="No tasks found"
          description="Create your first task to start organizing your workload."
          actionLabel="Create Task"
          onAction={onOpenTaskModal}
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Task Name</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {tasks.map((task) => (
                  <tr key={task.id} className="h-16 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-5 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {task.title}
                      {task.description && (
                        <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">{task.description}</p>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                      {task.courseName || task.course?.name || 'General'}
                    </td>
                    <td className="py-3 px-4">{getPriorityBadge(task.priority)}</td>
                    <td className="py-3 px-4">{getStatusBadge(task.status)}</td>
                    <td className="py-3 px-4 text-slate-500 font-medium">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date'}
                    </td>
                    <td className="py-3 px-5 text-right space-x-2">
                      <button
                        onClick={() => onUpdateStatus(task.id, task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED')}
                        className={`p-1.5 rounded-lg transition-colors ${
                          task.status === 'COMPLETED'
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={task.status === 'COMPLETED' ? 'Mark incomplete' : 'Mark complete'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditTask(task)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit task"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {task.courseName || task.course?.name || 'General'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{task.title}</h4>
                  </div>
                  {getStatusBadge(task.status)}
                </div>
                {task.description && (
                  <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(task.priority)}
                    <span className="text-slate-400">Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateStatus(task.id, task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED')}
                      className="p-1.5 text-slate-400 hover:text-emerald-600"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEditTask(task)} className="p-1.5 text-slate-400 hover:text-blue-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDeleteTask(task.id)} className="p-1.5 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TaskList;
