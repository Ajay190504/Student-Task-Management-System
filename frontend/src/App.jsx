import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskKanban from './components/TaskKanban';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import CourseManager from './components/CourseManager';
import SessionManager from './components/SessionManager';
import PomodoroTimer from './components/PomodoroTimer';
import Login from './pages/Login';
import Register from './pages/Register';
import api from './services/api';
import confetti from 'canvas-confetti';

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;
      if (filterCourse) params.courseId = filterCourse;
      if (searchQuery) params.search = searchQuery;

      const res = await api.get('/tasks', { params });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, filterStatus, filterPriority, filterCourse, searchQuery]);

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/status?status=${newStatus}`);
      if (newStatus === 'COMPLETED') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      }
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData.id) {
        await api.put(`/tasks/${taskData.id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      fetchTasks();
      fetchCourses();
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleOpenNewTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTaskModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        onOpenTaskModal={handleOpenNewTaskModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'kanban' && (
            <TaskKanban
              tasks={tasks}
              onUpdateStatus={handleUpdateStatus}
              onEditTask={handleEditTaskModal}
              onDeleteTask={handleDeleteTask}
              onOpenTaskModal={handleOpenNewTaskModal}
            />
          )}
          {activeTab === 'list' && (
            <TaskList
              tasks={tasks}
              onUpdateStatus={handleUpdateStatus}
              onEditTask={handleEditTaskModal}
              onDeleteTask={handleDeleteTask}
              filterCourse={filterCourse}
              setFilterCourse={setFilterCourse}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              courses={courses}
            />
          )}
          {activeTab === 'courses' && <CourseManager courses={courses} onRefreshCourses={fetchCourses} />}
          {activeTab === 'sessions' && <SessionManager />}
          {activeTab === 'pomodoro' && <PomodoroTimer tasks={tasks} />}
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSaveTask={handleSaveTask}
        initialTask={editingTask}
        courses={courses}
      />
    </div>
  );
}

function App() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return authView === 'login' ? (
      <Login onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return <MainApp />;
}

export default App;
