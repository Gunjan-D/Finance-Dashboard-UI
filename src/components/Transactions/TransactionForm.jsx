import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/mockData';
import { generateId } from '../../utils/finance';

const DEFAULT_FORM = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  category: '',
  type: 'expense',
  amount: '',
};

export default function TransactionForm({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useApp();
  const isEdit = Boolean(transaction);

  const [form, setForm] = useState(isEdit ? { ...transaction, amount: String(transaction.amount) } : DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const set = (field, value) => {
    setForm(f => {
      const next = { ...f, [field]: value };
      // Reset category when type changes
      if (field === 'type') next.category = '';
      return next;
    });
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.date)             errs.date        = 'Required';
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.category)         errs.category    = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
                                errs.amount      = 'Enter a positive number';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      ...form,
      id:     isEdit ? transaction.id : generateId(),
      amount: Number(form.amount),
    };

    if (isEdit) editTransaction(payload);
    else        addTransaction(payload);

    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? 'Edit transaction' : 'Add transaction'}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Type toggle */}
          <div>
            <label className="label">Type</label>
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
              {['income', 'expense'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('type', t)}
                  className={`flex-1 py-2 text-sm font-semibold capitalize transition-all duration-200 ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label" htmlFor="tf-desc">Description</label>
            <input
              id="tf-desc"
              type="text"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="e.g. Monthly Salary"
              className={`input ${errors.description ? 'border-red-400 focus:ring-red-400' : ''}`}
              maxLength={80}
              autoFocus
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="label" htmlFor="tf-cat">Category</label>
            <select
              id="tf-cat"
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className={`select w-full ${errors.category ? 'border-red-400 focus:ring-red-400' : ''}`}
            >
              <option value="">Select category…</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="label" htmlFor="tf-amount">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input
                  id="tf-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={e => set('amount', e.target.value)}
                  placeholder="0.00"
                  className={`input pl-7 ${errors.amount ? 'border-red-400 focus:ring-red-400' : ''}`}
                />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="label" htmlFor="tf-date">Date</label>
              <input
                id="tf-date"
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className={`input ${errors.date ? 'border-red-400 focus:ring-red-400' : ''}`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 justify-center font-semibold py-2 px-4 rounded-xl text-white transition-all duration-200 ${
                form.type === 'income'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
