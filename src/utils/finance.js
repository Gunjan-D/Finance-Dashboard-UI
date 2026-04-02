import { CATEGORY_COLORS } from '../data/mockData';

// ─── Formatting ──────────────────────────────────────────────────────────────

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

export const formatShortDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
};

// ─── Aggregate helpers ────────────────────────────────────────────────────────

export const getTotals = (transactions) => {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
};

/** Returns array of { month, income, expense, net } sorted chronologically */
export const getMonthlyData = (transactions) => {
  const map = {};

  for (const t of transactions) {
    const [y, m] = t.date.split('-');
    const key = `${y}-${m}`;
    if (!map[key]) map[key] = { key, month: '', income: 0, expense: 0 };

    const label = new Date(Number(y), Number(m) - 1, 1)
      .toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    map[key].month = label;

    if (t.type === 'income')  map[key].income  += t.amount;
    else                       map[key].expense += t.amount;
  }

  return Object.values(map)
    .sort((a, b) => a.key < b.key ? -1 : 1)
    .map(({ key, ...rest }) => ({ ...rest, net: rest.income - rest.expense }));
};

/** Returns array of { name, value, color } for expense categories */
export const getCategoryBreakdown = (transactions) => {
  const map = {};
  for (const t of transactions.filter(t => t.type === 'expense')) {
    map[t.category] = (map[t.category] || 0) + t.amount;
  }
  return Object.entries(map)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#9ca3af' }))
    .sort((a, b) => b.value - a.value);
};

/** Returns highest-spending category { name, amount, percentage } */
export const getTopCategory = (transactions) => {
  const breakdown = getCategoryBreakdown(transactions);
  if (!breakdown.length) return null;
  const totalExpense = breakdown.reduce((s, c) => s + c.value, 0);
  const top = breakdown[0];
  return { ...top, percentage: Math.round((top.value / totalExpense) * 100) };
};

/** Returns savings rate as percentage */
export const getSavingsRate = (transactions) => {
  const { income, expense } = getTotals(transactions);
  if (!income) return 0;
  return Math.max(0, Math.round(((income - expense) / income) * 100));
};

/** Generates a unique ID for new transactions */
export const generateId = () =>
  `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
