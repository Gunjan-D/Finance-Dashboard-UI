import { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTotals, getSavingsRate, formatCurrency } from '../../utils/finance';

const Card = ({ label, value, sub, icon: Icon, color, trend }) => (
  <div className="card fade-in hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{label}</p>
        <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
        {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>}
      </div>
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ml-4 ${trend}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default function SummaryCards() {
  const { transactions } = useApp();
  const { income, expense, balance } = useMemo(() => getTotals(transactions), [transactions]);
  const savings = useMemo(() => getSavingsRate(transactions), [transactions]);

  const cards = [
    {
      label: 'Total Balance',
      value: formatCurrency(balance),
      sub: 'All time net',
      icon: Wallet,
      color: balance >= 0 ? 'text-gray-900 dark:text-gray-100' : 'text-red-600 dark:text-red-400',
      trend: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Total Income',
      value: formatCurrency(income),
      sub: 'All transactions',
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      trend: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(expense),
      sub: 'All transactions',
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      trend: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
    },
    {
      label: 'Savings Rate',
      value: `${savings}%`,
      sub: `$${formatCurrency(income - expense)} saved`,
      icon: PiggyBank,
      color: savings >= 20 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500',
      trend: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(card => (
        <Card key={card.label} {...card} />
      ))}
    </div>
  );
}
