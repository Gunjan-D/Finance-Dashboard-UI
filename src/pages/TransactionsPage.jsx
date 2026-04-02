import TransactionFilters from '../components/Transactions/TransactionFilters';
import TransactionList from '../components/Transactions/TransactionList';
import { useApp } from '../context/AppContext';
import { Shield, Eye } from 'lucide-react';

export default function TransactionsPage() {
  const { role } = useApp();

  return (
    <div className="space-y-5 fade-in">
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Browse, filter and manage your transactions
          </p>
        </div>
        {/* Role context banner */}
        <span
          className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
            role === 'admin'
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
          }`}
        >
          {role === 'admin'
            ? <><Shield className="w-3.5 h-3.5" /> Admin — can add, edit & delete</>
            : <><Eye className="w-3.5 h-3.5" /> Viewer — read only</>}
        </span>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* List */}
      <TransactionList />
    </div>
  );
}
