import InsightsPanel from '../components/Insights/InsightsPanel';

export default function InsightsPage() {
  return (
    <div className="space-y-5 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Insights</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Understand your spending patterns and financial health
        </p>
      </div>
      <InsightsPanel />
    </div>
  );
}
