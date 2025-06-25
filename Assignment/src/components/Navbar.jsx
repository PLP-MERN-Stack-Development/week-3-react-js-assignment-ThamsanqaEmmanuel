import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          PLP Task Manager
        </h1>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:underline transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:underline transition-colors duration-300"
          >
            Tasks
          </a>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="transition-transform hover:scale-110 active:scale-90 duration-150"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
