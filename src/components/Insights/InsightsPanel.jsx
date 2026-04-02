import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import {
  getMonthlyData,
  getCategoryBreakdown,
  getTopCategory,
  getTotals,
  getSavingsRate,
  formatCurrency,
} from '../../utils/finance';
import { TrendingUp, TrendingDown, Trophy, PiggyBank, Lightbulb } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function InsightsPanel() {
  const { transactions } = useApp();

  const monthly     = useMemo(() => getMonthlyData(transactions),    [transactions]);
  const breakdown   = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const topCategory = useMemo(() => getTopCategory(transactions),    [transactions]);
  const { income, expense } = useMemo(() => getTotals(transactions), [transactions]);
  const savingsRate = useMemo(() => getSavingsRate(transactions),    [transactions]);

  // Best month by net savings
  const bestMonth = useMemo(() => {
    if (!monthly.length) return null;
    return monthly.reduce((best, m) => (m.net > (best?.net ?? -Infinity) ? m : best), null);
  }, [monthly]);

  // Month-over-month expense change (last two months)
  const momChange = useMemo(() => {
    if (monthly.length < 2) return null;
    const last   = monthly[monthly.length - 1];
    const before = monthly[monthly.length - 2];
    if (!before.expense) return null;
    return Math.round(((last.expense - before.expense) / before.expense) * 100);
  }, [monthly]);

  // Observations
  const observations = useMemo(() => {
    const obs = [];
    if (topCategory) {
      obs.push(`${topCategory.name} is your top expense category at ${topCategory.percentage}% of total spending.`);
    }
    if (savingsRate >= 30) obs.push(`Great job! You have a ${savingsRate}% savings rate — well above the recommended 20%.`);
    else if (savingsRate >= 20) obs.push(`Your savings rate of ${savingsRate}% meets the recommended 20% threshold.`);
    else obs.push(`Your savings rate is ${savingsRate}%. Consider reducing discretionary spending to improve it.`);

    if (momChange !== null) {
      if (momChange > 10) obs.push(`Expenses rose ${momChange}% compared to the previous month — worth reviewing.`);
      else if (momChange < -10) obs.push(`Expenses dropped ${Math.abs(momChange)}% vs last month. Keep it up!`);
      else obs.push(`Expenses remained relatively stable month-over-month (${momChange > 0 ? '+' : ''}${momChange}%).`);
    }

    if (bestMonth) obs.push(`Your best savings month was ${bestMonth.month} with net ${formatCurrency(bestMonth.net)}.`);
    return obs;
  }, [topCategory, savingsRate, momChange, bestMonth]);

  const statCards = [
    {
      label: 'Top Spending Category',
      value: topCategory?.name ?? '—',
      sub:   topCategory ? `${formatCurrency(topCategory.value)} · ${topCategory.percentage}% of expenses` : '',
      icon: Trophy,
      color: 'text-orange-500',
      bg:   'bg-orange-100 dark:bg-orange-900/30 text-orange-500',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      sub:   savingsRate >= 20 ? 'Above recommended 20%' : 'Below recommended 20%',
      icon: PiggyBank,
      color: savingsRate >= 20 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500',
      bg:   'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Total Income',
      value: formatCurrency(income),
      sub:   `Across ${monthly.length} months`,
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg:   'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(expense),
      sub:   `Across ${monthly.length} months`,
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bg:   'bg-red-100 dark:bg-red-900/30 text-red-600',
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <p className={`text-xl font-bold truncate ${color}`}>{value}</p>
                {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly comparison bar chart */}
      <div className="card">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Monthly Income vs Expenses</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Side-by-side comparison per month</p>
        </div>
        {monthly.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">No data</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthly} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={v => `$${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`}
                tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
              <Bar dataKey="income"  name="Income"  fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Category breakdown table */}
      <div className="card">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Expense Category Details</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sorted by highest spending</p>
        </div>
        {breakdown.length === 0 ? (
          <p className="text-gray-400 text-sm">No expense data available.</p>
        ) : (
          <div className="space-y-2.5">
            {breakdown.map(({ name, value, color }) => {
              const pct = expense ? Math.round((value / expense) * 100) : 0;
              return (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">{formatCurrency(value)}</span>
                      <span className="text-gray-400 dark:text-gray-500 w-9">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Key observations */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Key Observations</h2>
        </div>
        <ul className="space-y-2.5">
          {observations.map((obs, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              {obs}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
