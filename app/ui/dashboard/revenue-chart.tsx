// app/ui/dashboard/revenue-chart.tsx

export default function RevenueChart({
  revenue,
}: {
  revenue: { id: number; month: string; revenue: number }[];
}) {
  if (!revenue || revenue.length === 0) return null;

  const maxRevenue = Math.max(...revenue.map((r) => r.revenue));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-700">Recent Revenue</h2>
      </div>

      <div className="mt-6 flex h-56 items-end gap-4">
        {revenue.map((item) => (
          <div
            key={item.id}
            className="flex h-full flex-col items-center justify-end"
          >
            <div
              className="w-6 rounded-md bg-blue-200"
              style={{
                height: `${(item.revenue / maxRevenue) * 100}%`, // 👈 scale to full height
              }}
            />
            <span className="mt-2 text-xs text-gray-500">
              {item.month.slice(0, 3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
