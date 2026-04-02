import { useState } from 'react';
import { Pencil, Trash2, ChevronUp, ChevronDown, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/finance';
import TransactionForm from './TransactionForm';
import { CATEGORY_COLORS } from '../../data/mockData';

const PAGE_SIZE = 10;

export default function TransactionList() {
  const { filteredTransactions, role, deleteTransaction, filters, setFilters, openModal, modal, closeModal } = useApp();
  const [page, setPage] = useState(1);
  const isAdmin = role === 'admin';

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / PAGE_SIZE));
  const visible = filteredTransactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col) => {
    if (filters.sortBy === col) {
      setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilters({ sortBy: col, sortOrder: 'desc' });
    }
    setPage(1);
  };

  const SortIcon = ({ col }) => {
    if (filters.sortBy !== col) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return filters.sortOrder === 'asc'
      ? <ChevronUp className="w-4 h-4 text-blue-500" />
      : <ChevronDown className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredTransactions.length === 0
            ? 'No transactions found'
            : `${filteredTransactions.length} transaction${filteredTransactions.length !== 1 ? 's' : ''}`}
        </p>
        {isAdmin && (
          <button
            onClick={() => openModal(null)}
            className="btn-primary text-sm py-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card !p-0 overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <EmptyState isAdmin={isAdmin} onAdd={() => openModal(null)} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    {[
                      { label: 'Date',        col: 'date' },
                      { label: 'Description', col: null },
                      { label: 'Category',    col: 'category' },
                      { label: 'Type',        col: 'type' },
                      { label: 'Amount',      col: 'amount' },
                    ].map(({ label, col }) => (
                      <th
                        key={label}
                        className={`px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap ${col ? 'cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 select-none' : ''}`}
                        onClick={col ? () => handleSort(col) : undefined}
                      >
                        <div className="flex items-center gap-1">
                          {label}
                          {col && <SortIcon col={col} />}
                        </div>
                      </th>
                    ))}
                    {isAdmin && (
                      <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-300">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                  {visible.map((tx, i) => (
                    <tr
                      key={tx.id}
                      className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30 ${i % 2 === 0 ? '' : 'bg-gray-50/40 dark:bg-gray-800/20'}`}
                    >
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium max-w-[200px] truncate">
                        {tx.description}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${CATEGORY_COLORS[tx.category]}22`,
                            color: CATEGORY_COLORS[tx.category],
                          }}
                        >
                          {tx.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {tx.type === 'income' ? (
                          <span className="badge-income">
                            <TrendingUp className="w-3 h-3" />
                            Income
                          </span>
                        ) : (
                          <span className="badge-expense">
                            <TrendingDown className="w-3 h-3" />
                            Expense
                          </span>
                        )}
                      </td>
                      <td className={`px-4 py-3 font-semibold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal(tx)}
                              className="btn-edit"
                              aria-label={`Edit ${tx.description}`}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${tx.description}"?`)) {
                                  deleteTransaction(tx.id);
                                }
                              }}
                              className="btn-danger"
                              aria-label={`Delete ${tx.description}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Del</span>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn-secondary py-1 px-3 text-xs disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="btn-secondary py-1 px-3 text-xs disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <TransactionForm
          transaction={modal.editingTransaction}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

function EmptyState({ isAdmin, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
        <TrendingDown className="w-7 h-7 text-gray-400" />
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-semibold">No transactions found</p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
        Try adjusting your filters or add a new transaction.
      </p>
      {isAdmin && (
        <button onClick={onAdd} className="btn-primary mt-4 text-sm">
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      )}
    </div>
  );
}
