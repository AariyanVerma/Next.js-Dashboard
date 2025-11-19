export default function LatestInvoices({
  invoices,
}: {
  invoices: {
    id: number;
    amount: number;
    customer: string;
    email: string;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-medium text-gray-700">Latest Invoices</h2>

      <div className="space-y-4">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {inv.customer}
              </p>
              <p className="text-xs text-gray-500">{inv.email}</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              ${inv.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400">Updated just now</p>
    </div>
  );
}
