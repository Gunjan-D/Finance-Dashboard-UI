import { Search, X, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALL_CATEGORIES } from '../../data/mockData';

export default function TransactionFilters() {
  const { filters, setFilters, resetFilters } = useApp();
  const { search, category, type, sortBy, sortOrder, dateFrom, dateTo } = filters;

  const hasActiveFilters =
    search || category !== 'all' || type !== 'all' || dateFrom || dateTo;

  return (
    <div className="card-sm">
      <div className="flex flex-wrap items-end gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[180px]">
          <label className="label">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setFilters({ search: e.target.value })}
              placeholder="Search transactions…"
              className="input pl-9"
            />
            {search && (
              <button
                onClick={() => setFilters({ search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Type */}
        <div className="min-w-[120px]">
          <label className="label">Type</label>
          <select
            value={type}
            onChange={e => setFilters({ type: e.target.value })}
            className="select w-full"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div className="min-w-[150px]">
          <label className="label">Category</label>
          <select
            value={category}
            onChange={e => setFilters({ category: e.target.value })}
            className="select w-full"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Date from */}
        <div className="min-w-[130px]">
          <label className="label">From</label>
          <input
            type="date"
            value={dateFrom}
            max={dateTo || undefined}
            onChange={e => setFilters({ dateFrom: e.target.value })}
            className="input"
          />
        </div>

        {/* Date to */}
        <div className="min-w-[130px]">
          <label className="label">To</label>
          <input
            type="date"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={e => setFilters({ dateTo: e.target.value })}
            className="input"
          />
        </div>

        {/* Sort */}
        <div className="min-w-[120px]">
          <label className="label">Sort by</label>
          <select
            value={sortBy}
            onChange={e => setFilters({ sortBy: e.target.value })}
            className="select w-full"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
        </div>

        {/* Sort order */}
        <div className="min-w-[110px]">
          <label className="label">Order</label>
          <select
            value={sortOrder}
            onChange={e => setFilters({ sortOrder: e.target.value })}
            className="select w-full"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <div className="self-end">
            <button onClick={resetFilters} className="btn-secondary gap-1.5" title="Clear filters">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Active filter summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          {search && (
            <FilterTag label={`"${search}"`} onRemove={() => setFilters({ search: '' })} />
          )}
          {type !== 'all' && (
            <FilterTag label={type} onRemove={() => setFilters({ type: 'all' })} />
          )}
          {category !== 'all' && (
            <FilterTag label={category} onRemove={() => setFilters({ category: 'all' })} />
          )}
          {dateFrom && (
            <FilterTag label={`From ${dateFrom}`} onRemove={() => setFilters({ dateFrom: '' })} />
          )}
          {dateTo && (
            <FilterTag label={`To ${dateTo}`} onRemove={() => setFilters({ dateTo: '' })} />
          )}
        </div>
      )}
    </div>
  );
}

function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
      {label}
      <button onClick={onRemove} className="ml-0.5 hover:text-blue-900 dark:hover:text-blue-100">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
