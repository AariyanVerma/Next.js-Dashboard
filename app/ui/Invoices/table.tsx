import InvoiceStatus from "./status";
import type { InvoiceWithCustomer } from "@/app/lib/data";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount / 100); 
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type Props = {
  invoices: InvoiceWithCustomer[];
};

export default function InvoicesTable({ invoices }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Invoice
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Customer
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Email
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Date
            </th>
            <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Amount
            </th>
            <th className="py-3 pl-3 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-xs font-medium text-gray-700">
                #{invoice.id}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-800">
                {invoice.customer_name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                {invoice.customer_email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                {formatDate(invoice.date)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-right text-xs font-medium text-gray-800">
                {formatCurrency(invoice.amount)}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-6 text-right">
                <InvoiceStatus status={invoice.status} />
              </td>
            </tr>
          ))}

          {invoices.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-8 text-center text-sm text-gray-500"
              >
                No invoices found for this search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
