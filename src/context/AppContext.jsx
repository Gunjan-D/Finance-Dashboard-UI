import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

// ─── localStorage helpers ─────────────────────────────────────────────────────

const load = (key, def) => {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : def;
  } catch {
    return def;
  }
};

const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
};

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState = {
  transactions: load('fd_transactions', initialTransactions),
  role:         load('fd_role', 'admin'),     // 'admin' | 'viewer'
  darkMode:     load('fd_darkMode', false),
  filters: {
    search:    '',
    category:  'all',
    type:      'all',           // 'all' | 'income' | 'expense'
    sortBy:    'date',          // 'date' | 'amount' | 'category'
    sortOrder: 'desc',          // 'asc' | 'desc'
    dateFrom:  '',
    dateTo:    '',
  },
  modal: {
    isOpen:             false,
    editingTransaction: null,
  },
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };

    case 'OPEN_MODAL':
      return { ...state, modal: { isOpen: true, editingTransaction: action.payload ?? null } };

    case 'CLOSE_MODAL':
      return { ...state, modal: { isOpen: false, editingTransaction: null } };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist state slices
  useEffect(() => save('fd_transactions', state.transactions), [state.transactions]);
  useEffect(() => save('fd_role', state.role),                 [state.role]);
  useEffect(() => {
    save('fd_darkMode', state.darkMode);
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  // Apply dark mode on first render
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived: filtered + sorted transactions ──────────────────────────────
  const filteredTransactions = useMemo(() => {
    const { search, category, type, sortBy, sortOrder, dateFrom, dateTo } = state.filters;
    let result = [...state.transactions];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') result = result.filter(t => t.category === category);
    if (type !== 'all')      result = result.filter(t => t.type === type);
    if (dateFrom)            result = result.filter(t => t.date >= dateFrom);
    if (dateTo)              result = result.filter(t => t.date <= dateTo);

    result.sort((a, b) => {
      let av = sortBy === 'amount' ? a.amount : a[sortBy];
      let bv = sortBy === 'amount' ? b.amount : b[sortBy];
      if (av < bv) return sortOrder === 'asc' ? -1 : 1;
      if (av > bv) return sortOrder === 'asc' ?  1 : -1;
      return 0;
    });

    return result;
  }, [state.transactions, state.filters]);

  // ── Action helpers ───────────────────────────────────────────────────────
  const value = {
    ...state,
    filteredTransactions,
    dispatch,
    addTransaction:    (tx)   => dispatch({ type: 'ADD_TRANSACTION',    payload: tx }),
    editTransaction:   (tx)   => dispatch({ type: 'EDIT_TRANSACTION',   payload: tx }),
    deleteTransaction: (id)   => dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
    setRole:           (role) => dispatch({ type: 'SET_ROLE',           payload: role }),
    toggleDarkMode:    ()     => dispatch({ type: 'TOGGLE_DARK_MODE' }),
    setFilters:        (f)    => dispatch({ type: 'SET_FILTERS',        payload: f }),
    resetFilters:      ()     => dispatch({ type: 'RESET_FILTERS' }),
    openModal:         (tx)   => dispatch({ type: 'OPEN_MODAL',         payload: tx }),
    closeModal:        ()     => dispatch({ type: 'CLOSE_MODAL' }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
