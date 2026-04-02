import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  X,
  DollarSign,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/insights',     label: 'Insights',     icon: TrendingUp },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`
        fixed z-30 inset-y-0 left-0 w-64 bg-slate-900 dark:bg-slate-950
        transform transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:flex lg:flex-col
        flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none">FinTrack</p>
            <p className="text-slate-400 text-xs mt-0.5">Finance Dashboard</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
          Menu
        </p>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-slate-700/60">
        <p className="text-slate-500 text-xs text-center">
          © 2026 FinTrack · Built for Zorvyn
        </p>
      </div>
    </aside>
  );
}
