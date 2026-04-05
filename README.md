# FinTrack — Finance Dashboard UI

> **Live Demo → [https://gunjan-d.github.io/Finance-Dashboard-UI/](https://gunjan-d.github.io/Finance-Dashboard-UI/)**

A clean, responsive, and interactive finance dashboard built with **React 18 + Vite + Tailwind CSS + Recharts**.  
Built as part of the Zorvyn Frontend Developer Intern assignment evaluation.

---

## Screenshots

| Dashboard | Transactions | Insights |
|---|---|---|
| Summary cards, trend chart, spending donut | Paginated table with filters & sort | Monthly comparison, category breakdown |

---

## Features at a Glance

###  Dashboard Overview
- **4 Summary Cards** — Total Balance, Total Income, Total Expenses, Savings Rate
- **Balance Trend Line Chart** — visualises income, expenses and net savings across 6 months (Oct 2025 – Mar 2026)
- **Spending Breakdown Donut Chart** — categorised expense distribution at a glance
- **Recent Transactions** — quick-access list of the 5 latest entries with category colour coding

###  Transactions
- **Paginated table** — 10 rows per page with date, description, category, type and amount
- **Multi-field filtering** — keyword search, transaction type (Income / Expense), category dropdown, date range (From / To)
- **Active filter chips** — visible tags with one-click removal per filter
- **Sortable columns** — click Date, Category or Amount headers to toggle ascending / descending order
- **Admin-only actions** — Add, Edit, Delete buttons appear only for the Admin role

###  Role-Based UI (Simulated)

| Feature | Admin | Viewer |
|---|---|---|
| View all data | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |

Switch roles instantly using the **Admin / Viewer toggle** in the top header bar. No login required — role state is persisted in `localStorage`.

###  Insights
- **Top Spending Category** — name, total amount, and percentage of all expenses
- **Savings Rate** — compared against the recommended 20% threshold
- **Monthly Income vs Expenses Bar Chart** — side-by-side comparison per month
- **Category Breakdown Table** — all categories with colour-coded progress bars and percentages
- **Auto-Generated Observations** — dynamic bullet points covering savings health, MoM expense changes, and best-savings month

###  UX & Quality
- **Dark Mode** — toggled with the moon/sun icon; preference saved across sessions
- **Data Persistence** — all transactions and role are stored in `localStorage`; changes survive page refresh
- **Responsive Design** — collapsible sidebar on mobile, fluid grid layout
- **Empty States** — charts and tables show helpful messages when no data matches filters
- **Accessible Modals** — Escape key closes forms, ARIA roles applied
- **Smooth Animations** — fade-in, slide-in and scale-in transitions

---

## Tech Stack

| Technology | Role |
|---|---|
| **React 18** | UI component framework |
| **Vite 5** | Dev server & production build tool |
| **Tailwind CSS 3** | Utility-first styling with dark mode support |
| **Recharts 2** | Line, Bar and Pie/Donut charts |
| **React Router 6** | Client-side routing (3 pages) |
| **Lucide React** | Consistent icon set |
| **React Context + useReducer** | State management — no external library needed |
| **localStorage** | Zero-dependency data persistence |

---

## Getting Started Locally

```bash
# 1. Clone the repo
git clone https://github.com/Gunjan-D/Finance-Dashboard-UI.git
cd Finance-Dashboard-UI

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server at localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
src/
├── main.jsx                    # React entry point
├── App.jsx                     # Router + AppProvider wrapper
├── index.css                   # Tailwind base + reusable component classes
│
├── data/
│   └── mockData.js             # 75+ realistic transactions (Oct 2025 – Mar 2026)
│
├── utils/
│   └── finance.js              # Pure helpers: formatCurrency, getMonthlyData,
│                               #   getCategoryBreakdown, getSavingsRate, etc.
│
├── context/
│   └── AppContext.jsx          # Global state — useReducer + Context API
│                               #   transactions, role, darkMode, filters, modal
│
├── components/
│   ├── Layout/
│   │   ├── Layout.jsx          # App shell: sidebar + header + <Outlet />
│   │   ├── Sidebar.jsx         # Navigation links (Dashboard / Transactions / Insights)
│   │   └── Header.jsx          # Role switcher + dark mode toggle
│   │
│   ├── Dashboard/
│   │   ├── SummaryCards.jsx    # 4 KPI stat cards
│   │   ├── BalanceTrend.jsx    # Recharts LineChart — 6-month trend
│   │   └── SpendingBreakdown.jsx # Recharts PieChart — expense categories
│   │
│   ├── Transactions/
│   │   ├── TransactionFilters.jsx  # Search, type, category, date, sort controls
│   │   ├── TransactionList.jsx     # Paginated sortable table + empty state
│   │   └── TransactionForm.jsx     # Add / Edit modal with validation
│   │
│   └── Insights/
│       └── InsightsPanel.jsx   # Stat cards, bar chart, breakdown, observations
│
└── pages/
    ├── DashboardPage.jsx
    ├── TransactionsPage.jsx
    └── InsightsPage.jsx
```

---

## State Management

State is managed with **React Context + `useReducer`** — a scalable built-in pattern that avoids prop drilling without adding Redux or Zustand overhead.

```
AppContext (global)
├── transactions[]    ←→  localStorage  (CRUD via dispatch)
├── role              ←→  localStorage  ('admin' | 'viewer')
├── darkMode          ←→  localStorage  (synced to <html class="dark">)
├── filters           →   in-memory     (search, type, category, dateFrom, dateTo, sortBy, sortOrder)
└── modal             →   in-memory     (isOpen, editingTransaction)

Derived state:
└── filteredTransactions  ←  useMemo(transactions + filters)
```

Actions are dispatched from helper functions exposed on the context value (`addTransaction`, `deleteTransaction`, `setRole`, `toggleDarkMode`, `setFilters`, etc.) keeping components free of dispatch boilerplate.

---

## Mock Data

**75+ realistic transactions** across 6 months (October 2025 – March 2026) covering 12 categories:

| Income Categories | Expense Categories |
|---|---|
| Salary | Food & Dining |
| Freelance | Transport |
| Investment Returns | Entertainment |
| Other Income | Shopping |
| | Bills & Utilities |
| | Healthcare |
| | Education |
| | Other |

Data is seeded from `src/data/mockData.js` and stored in `localStorage` on first load, so users can add/edit/delete without losing data on refresh.

---

## Deployment

This project is deployed to **GitHub Pages** via a GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`).

Every push to `main` automatically:
1. Installs dependencies (`npm ci`)
2. Runs `npm run build`
3. Publishes the `dist/` folder to GitHub Pages

Live URL: **https://gunjan-d.github.io/Finance-Dashboard-UI/**

---

## Assumptions

- All monetary values are in **USD**.
- Role switching is **front-end only** — no backend authentication.
- The app is fully functional **offline** using mock data.
- "Current date" context is April 2026 for insight calculations.

---
/////////////////////////////////////////////////////////
