import { Menu, Sun, Moon, Shield, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header({ onMenuClick }) {
  const { role, darkMode, setRole, toggleDarkMode } = useApp();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700/60 flex items-center justify-between px-4 md:px-6 shrink-0 transition-colors duration-300">
      {/* Left: hamburger + page context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Welcome back! 👋
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Role Switcher */}
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setRole('admin')}
            title="Switch to Admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              role === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
          <button
            onClick={() => setRole('viewer')}
            title="Switch to Viewer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              role === 'viewer'
                ? 'bg-gray-600 text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Viewer</span>
          </button>
        </div>

        {/* Role badge */}
        <span
          className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
            role === 'admin'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {role === 'admin' ? <Shield className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {role === 'admin' ? 'Full Access' : 'Read Only'}
        </span>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
