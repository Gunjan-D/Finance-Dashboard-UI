import SummaryCards from '../components/Dashboard/SummaryCards';
import BalanceTrend from '../components/Dashboard/BalanceTrend';
import SpendingBreakdown from '../components/Dashboard/SpendingBreakdown';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/finance';
import { CATEGORY_COLORS } from '../data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardPage() {
  const { transactions } = useApp();

  // 5 most recent transactions
  const recent = [...transactions]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <div className="space-y-6 fade-in">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Overview of your financial activity
        </p>
      </div>

      {/* Summary cards */}
      <SummaryCards />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <BalanceTrend />
        </div>
        <div className="lg:col-span-2">
          <SpendingBreakdown />
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Latest 5 transactions</p>
          </div>
          <a
            href="/transactions"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View all →
          </a>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
            No transactions yet.
          </p>
        ) : (
          <div className="space-y-2">
            {recent.map(tx => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${CATEGORY_COLORS[tx.category]}22` }}
                  >
                    {tx.type === 'income'
                      ? <TrendingUp className="w-4 h-4" style={{ color: CATEGORY_COLORS[tx.category] }} />
                      : <TrendingDown className="w-4 h-4" style={{ color: CATEGORY_COLORS[tx.category] }} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {tx.category} · {formatDate(tx.date)}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-semibold shrink-0 ml-4 ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
