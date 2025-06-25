import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

/**
 * TaskManager component
 */
const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all duration-300">
      <h2 className="text-3xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100">
        Task Manager
      </h2>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors duration-300"
          />
          <Button
            type="submit"
            variant="primary"
            className="min-w-[120px] sm:min-w-[140px] transition-transform hover:scale-105 active:scale-95 duration-150"
          >
            Add Task
          </Button>
        </div>
      </form>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['all', 'active', 'completed'].map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(type)}
            className="transition-colors duration-300"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      {/* Task list */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-6 text-lg select-none">
            No tasks found
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg
                dark:border-gray-700
                hover:bg-gray-50 dark:hover:bg-gray-700
                transition-colors duration-300
                ${
                  task.completed
                    ? 'bg-gray-100 dark:bg-gray-900'
                    : 'bg-white dark:bg-gray-800'
                }
              `}
            >
              <div className="flex items-center gap-4 w-full">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-6 w-6 text-blue-600 rounded focus:ring-blue-500 transition duration-200"
                  aria-label={`Mark task "${task.text}" as completed`}
                />
                <span
                  className={`select-none break-words text-lg sm:text-xl ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-800 dark:text-gray-100'
                  } transition-colors duration-300`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="mt-3 sm:mt-0 transition-transform hover:scale-110 active:scale-90 duration-150"
                aria-label={`Delete task "${task.text}"`}
              >
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      {/* Task stats */}
      <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 select-none">
        <p>
          {tasks.filter((task) => !task.completed).length}{' '}
          {tasks.filter((task) => !task.completed).length === 1
            ? 'task'
            : 'tasks'}{' '}
          remaining
        </p>
      </div>
    </div>
  );
};

export default TaskManager;
