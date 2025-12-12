'use client';

import { useState } from 'react';

export default function RevenueChart({
  revenue,
}: {
  revenue: { id: number; month: string; revenue: number }[];
}) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  if (!revenue || revenue.length === 0) return null;

  const maxRevenue = Math.max(...revenue.map((r) => r.revenue));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-700">Recent Revenue</h2>
        <span className="text-xs text-gray-400">Last 12 months</span>
      </div>

      <div className="mt-6 w-full overflow-x-auto overflow-y-visible">
        <div className="flex h-80 items-end gap-2 sm:gap-3 md:gap-4 min-w-fit" style={{ paddingTop: '40px' }}>
          {revenue.map((item) => {
            const isHovered = hoveredBar === item.id;
            const barHeight = `${(item.revenue / maxRevenue) * 100}%`;
            
            return (
              <div
                key={item.id}
                className="flex h-full flex-col items-center justify-end flex-shrink-0 relative"
                onMouseEnter={() => setHoveredBar(item.id)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {isHovered && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded shadow-xl whitespace-nowrap z-[100]">
                    {formatCurrency(item.revenue)}
                  </div>
                )}
                <div
                  className={`w-4 sm:w-5 md:w-6 rounded-md transition-colors duration-200 ${
                    isHovered ? 'bg-blue-600' : 'bg-blue-200'
                  }`}
                  style={{
                    height: barHeight,
                  }}
                />
                <span className="mt-2 text-xs text-gray-500 whitespace-nowrap">
                  {item.month.slice(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
