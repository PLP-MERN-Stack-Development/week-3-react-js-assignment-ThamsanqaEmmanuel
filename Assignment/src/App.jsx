import './App.css';
import ApiPosts from "@/components/ApiPosts";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskManager from '@/components/TaskManager';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Task Manager + Side Content (responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-4 sm:p-6">
          <div>
            <TaskManager />
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 sm:p-6 h-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Instructions</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Use the Task Manager to add, mark, delete, and filter your tasks.
              Try toggling the light/dark theme using the button in the navbar!
            </p>
          </div>
        </div>

        {/* API Data */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-4 sm:p-6">
          <ApiPosts />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
