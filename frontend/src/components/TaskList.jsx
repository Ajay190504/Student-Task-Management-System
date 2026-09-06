import React from 'react';
import { Download, Filter, Calendar, Edit2, Trash2, CheckCircle2, Clock } from 'lucide-react';
import api from '../services/api';

const TaskList = ({ tasks, onUpdateStatus, onEditTask, onDeleteTask, filterCourse, setFilterCourse, filterPriority, setFilterPriority, filterStatus, setFilterStatus, courses }) => {

  const handleExportCsv = async () => {
    try {
      const response = await api.get('/tasks/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_tasks_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to export CSV:', err);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'URGENT': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'MEDIUM': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Export Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Structured Task Directory</h2>
          <p className="text-xs text-slate-400">Filter, search, and export task reports.</p>
        </div>

        <button
          onClick={handleExportCsv}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-indigo-400" /> Export CSV Report
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-3 rounded-2xl flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 pl-2">
          <Filter className="w-3.5 h-3.5 text-indigo-400" /> Filters:
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="URGENT">Urgent</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Course Filter */}
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Task Title</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">{task.title}</div>
                    {task.description && (
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{task.description}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {task.course ? (
                      <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] border" style={{ color: task.course.colorCode, borderColor: `${task.course.colorCode}40`, backgroundColor: `${task.course.colorCode}15` }}>
                        {task.course.code}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">General</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300 capitalize">{task.category?.toLowerCase().replace('_', ' ')}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] border ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={task.status}
                      onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[11px] ${task.isOverdue ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                      {task.dueDate || 'No Limit'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => onEditTask(task)}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {tasks.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-500 text-xs">
                    No matching tasks found. Adjust filters or create a new task.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
