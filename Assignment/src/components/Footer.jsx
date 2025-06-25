export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-6 px-6 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 select-none">
          © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
        </p>
        <div className="mt-3 text-sm space-x-4">
          <a
            href="#"
            className="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <a
            href="#"
            className="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
