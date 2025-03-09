import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: crypto.randomUUID(), text: newTask.trim(), completed: false }
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Tracker</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
          </button>
        </div>

        <form onSubmit={addTask} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className={`flex-1 p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 focus:border-blue-500'
                  : 'bg-white border-gray-300 focus:border-blue-500'
              } outline-none transition-colors duration-200`}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
            >
              <FaPlusCircle size={20} />
              Add
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 transform hover:scale-[1.01] ${
                isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span
                className={`flex-1 ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-red-500'
                }`}
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className={`text-center py-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No tasks yet. Add one to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;