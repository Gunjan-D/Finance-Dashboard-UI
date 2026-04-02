// ─── Category Definitions ────────────────────────────────────────────────────

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Other',
];

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment Returns',
  'Other Income',
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const CATEGORY_COLORS = {
  'Food & Dining':    '#f97316',
  'Transport':        '#06b6d4',
  'Entertainment':    '#8b5cf6',
  'Shopping':         '#ec4899',
  'Bills & Utilities':'#64748b',
  'Healthcare':       '#10b981',
  'Education':        '#3b82f6',
  'Other':            '#9ca3af',
  'Salary':           '#22c55e',
  'Freelance':        '#14b8a6',
  'Investment Returns':'#f59e0b',
  'Other Income':     '#84cc16',
};

// ─── Mock Transactions (Oct 2025 – Mar 2026) ─────────────────────────────────

const d = (y, m, day) =>
  `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

let _id = 1;
const tx = (date, description, category, type, amount) => ({
  id: `tx_${_id++}`,
  date,
  description,
  category,
  type,   // 'income' | 'expense'
  amount,
});

export const initialTransactions = [
  // ── October 2025 ──────────────────────────────────────────────────────────
  tx(d(2025,10, 1), 'Monthly Salary',           'Salary',           'income',  5000),
  tx(d(2025,10, 2), 'Grocery Store',            'Food & Dining',    'expense',  120),
  tx(d(2025,10, 5), 'Electric Bill',            'Bills & Utilities','expense',   95),
  tx(d(2025,10, 7), 'Netflix Subscription',     'Entertainment',    'expense',   15),
  tx(d(2025,10, 8), 'Uber Ride',                'Transport',        'expense',   22),
  tx(d(2025,10,10), 'Freelance Project A',      'Freelance',        'income',   800),
  tx(d(2025,10,12), 'Pharmacy',                 'Healthcare',       'expense',   45),
  tx(d(2025,10,15), 'Online Shopping',          'Shopping',         'expense',  230),
  tx(d(2025,10,18), 'Restaurant Dinner',        'Food & Dining',    'expense',   85),
  tx(d(2025,10,20), 'Bus Pass',                 'Transport',        'expense',   35),
  tx(d(2025,10,22), 'Investment Dividend',      'Investment Returns','income',  250),
  tx(d(2025,10,25), 'Gym Membership',           'Healthcare',       'expense',   40),
  tx(d(2025,10,27), 'Coffee Shop',              'Food & Dining',    'expense',   30),
  tx(d(2025,10,29), 'Internet Bill',            'Bills & Utilities','expense',   60),

  // ── November 2025 ─────────────────────────────────────────────────────────
  tx(d(2025,11, 1), 'Monthly Salary',           'Salary',           'income',  5000),
  tx(d(2025,11, 3), 'Grocery Shopping',         'Food & Dining',    'expense',  145),
  tx(d(2025,11, 5), 'Water Bill',               'Bills & Utilities','expense',   40),
  tx(d(2025,11, 7), 'Movie Tickets',            'Entertainment',    'expense',   50),
  tx(d(2025,11, 8), 'Taxi',                     'Transport',        'expense',   28),
  tx(d(2025,11,12), 'Freelance Project B',      'Freelance',        'income',  1200),
  tx(d(2025,11,14), 'Doctor Visit',             'Healthcare',       'expense',  120),
  tx(d(2025,11,16), 'Black Friday Shopping',    'Shopping',         'expense',  450),
  tx(d(2025,11,18), 'Dinner Out',               'Food & Dining',    'expense',   95),
  tx(d(2025,11,20), 'Fuel',                     'Transport',        'expense',   65),
  tx(d(2025,11,22), 'Online Course',            'Education',        'expense',   99),
  tx(d(2025,11,25), 'Electric Bill',            'Bills & Utilities','expense',  110),
  tx(d(2025,11,28), 'Coffee & Snacks',          'Food & Dining',    'expense',   25),

  // ── December 2025 ─────────────────────────────────────────────────────────
  tx(d(2025,12, 1), 'Monthly Salary',           'Salary',           'income',  5000),
  tx(d(2025,12, 5), 'Christmas Shopping',       'Shopping',         'expense',  580),
  tx(d(2025,12, 7), 'Grocery Store',            'Food & Dining',    'expense',  180),
  tx(d(2025,12,10), 'Year-End Bonus',           'Salary',           'income',  1500),
  tx(d(2025,12,12), 'Netflix & Spotify',        'Entertainment',    'expense',   28),
  tx(d(2025,12,15), 'Flight Tickets',           'Transport',        'expense',  320),
  tx(d(2025,12,18), 'Holiday Dinner',           'Food & Dining',    'expense',  150),
  tx(d(2025,12,20), 'Freelance Project C',      'Freelance',        'income',   950),
  tx(d(2025,12,22), 'Electric Bill',            'Bills & Utilities','expense',  130),
  tx(d(2025,12,26), 'Post-Christmas Sales',     'Shopping',         'expense',  200),
  tx(d(2025,12,28), 'Investment Dividend',      'Investment Returns','income',  300),

  // ── January 2026 ──────────────────────────────────────────────────────────
  tx(d(2026, 1, 1), 'Monthly Salary',           'Salary',           'income',  5000),
  tx(d(2026, 1, 3), 'New Year Grocery',         'Food & Dining',    'expense',  130),
  tx(d(2026, 1, 5), 'Gym Annual Membership',    'Healthcare',       'expense',  400),
  tx(d(2026, 1, 8), 'Electric Bill',            'Bills & Utilities','expense',  105),
  tx(d(2026, 1,10), 'Online Course – React',    'Education',        'expense',  149),
  tx(d(2026, 1,12), 'Uber Rides',               'Transport',        'expense',   45),
  tx(d(2026, 1,15), 'Freelance Web Project',    'Freelance',        'income',  1500),
  tx(d(2026, 1,18), 'Clothing Purchase',        'Shopping',         'expense',  185),
  tx(d(2026, 1,20), 'Restaurant',               'Food & Dining',    'expense',   75),
  tx(d(2026, 1,22), 'Internet Bill',            'Bills & Utilities','expense',   60),
  tx(d(2026, 1,25), 'Movie & Popcorn',          'Entertainment',    'expense',   35),
  tx(d(2026, 1,28), 'Pharmacy',                 'Healthcare',       'expense',   28),

  // ── February 2026 ─────────────────────────────────────────────────────────
  tx(d(2026, 2, 1), 'Monthly Salary',           'Salary',           'income',  5000),
  tx(d(2026, 2, 3), 'Grocery Shopping',         'Food & Dining',    'expense',  110),
  tx(d(2026, 2, 5), "Valentine's Day Dinner",   'Food & Dining',    'expense',  180),
  tx(d(2026, 2, 8), 'Gift Shopping',            'Shopping',         'expense',  120),
  tx(d(2026, 2,10), 'Electric Bill',            'Bills & Utilities','expense',   90),
  tx(d(2026, 2,12), 'Investment Returns',       'Investment Returns','income',  350),
  tx(d(2026, 2,14), 'Uber Rides',               'Transport',        'expense',   38),
  tx(d(2026, 2,16), 'Freelance Design Work',    'Freelance',        'income',   700),
  tx(d(2026, 2,18), 'Book Purchase',            'Education',        'expense',   65),
  tx(d(2026, 2,20), 'Gym Membership',           'Healthcare',       'expense',   40),
  tx(d(2026, 2,22), 'Netflix',                  'Entertainment',    'expense',   15),
  tx(d(2026, 2,25), 'Coffee Shop',              'Food & Dining',    'expense',   40),
  tx(d(2026, 2,27), 'Internet Bill',            'Bills & Utilities','expense',   60),

  // ── March 2026 ────────────────────────────────────────────────────────────
  tx(d(2026, 3, 1), 'Monthly Salary',           'Salary',           'income',  5000),
  tx(d(2026, 3, 3), 'Grocery Store',            'Food & Dining',    'expense',  125),
  tx(d(2026, 3, 5), 'Electric Bill',            'Bills & Utilities','expense',   95),
  tx(d(2026, 3, 8), 'Online Shopping',          'Shopping',         'expense',  260),
  tx(d(2026, 3,10), 'Freelance Project D',      'Freelance',        'income',  1100),
  tx(d(2026, 3,12), 'Doctor Checkup',           'Healthcare',       'expense',   90),
  tx(d(2026, 3,15), 'Concert Tickets',          'Entertainment',    'expense',  120),
  tx(d(2026, 3,18), 'Fuel & Parking',           'Transport',        'expense',   80),
  tx(d(2026, 3,20), 'Restaurant Brunch',        'Food & Dining',    'expense',   65),
  tx(d(2026, 3,22), 'Investment Returns',       'Investment Returns','income',  280),
  tx(d(2026, 3,25), 'Coding Bootcamp',          'Education',        'expense',  299),
  tx(d(2026, 3,28), 'Internet Bill',            'Bills & Utilities','expense',   60),
  tx(d(2026, 3,30), 'Coffee & Lunch',           'Food & Dining',    'expense',   45),
];
