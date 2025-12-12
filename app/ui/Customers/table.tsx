'use client';

import React from "react";
import Image from "next/image";
import type { CustomerWithStats, RevenueTotals } from "@/app/lib/data";
import InvoiceStatus from "@/app/ui/Invoices/status";
import TransactionRow from "./transaction-row";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount); 
}

function formatDate(dateString: string | null) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type Props = {
  customers: CustomerWithStats[];
  showDate?: boolean;
  revenueTotals: RevenueTotals;
};

export default function CustomersTable({ customers, showDate = false, revenueTotals }: Props) {
  const groupedCustomers = customers.reduce((acc, customer) => {
    if (!acc[customer.email]) {
      acc[customer.email] = {
        customer,
        rows: []
      };
    }
    acc[customer.email].rows.push(customer);
    return acc;
  }, {} as Record<string, { customer: CustomerWithStats; rows: CustomerWithStats[] }>);

  const { totalPaid, totalPending, totalPaidInvoices, totalPendingInvoices } = revenueTotals;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Customer
            </th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              Email
            </th>
            {showDate && (
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>
            )}
            <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </th>
            <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Invoices
            </th>
            <th className="py-3 pl-3 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {Object.values(groupedCustomers).map((group, groupIndex) => {
            const paidRow = group.rows.find(r => r.status === 'paid');
            const pendingRow = group.rows.find(r => r.status === 'pending');
            const firstRow = group.rows[0];
            const hasMultipleStatuses = paidRow && pendingRow;
            
            return (
              <React.Fragment key={`${firstRow.email}-group`}>
                {hasMultipleStatuses && (
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {firstRow.image_url ? (
                          <Image
                            src={firstRow.image_url}
                            alt={firstRow.name}
                            className="rounded-full"
                            width={32}
                            height={32}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {firstRow.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="text-xs font-semibold text-gray-900">
                          {firstRow.name}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-700">
                      {firstRow.email}
                    </td>
                    {showDate && <td className="py-3"></td>}
                    <td className="py-3"></td>
                    <td className="py-3"></td>
                    <td className="py-3"></td>
                  </tr>
                )}
                
                {paidRow && (
                  <TransactionRow
                    key={`${firstRow.email}-paid`}
                    customerEmail={firstRow.email}
                    status="paid"
                    totalAmount={paidRow.total_amount}
                    totalInvoices={paidRow.total_invoices}
                    showDate={showDate}
                    customerName={firstRow.name}
                    customerImage={firstRow.image_url}
                    showCustomerInfo={!hasMultipleStatuses}
                  />
                )}
                
                {pendingRow && (
                  <TransactionRow
                    key={`${firstRow.email}-pending`}
                    customerEmail={firstRow.email}
                    status="pending"
                    totalAmount={pendingRow.total_amount}
                    totalInvoices={pendingRow.total_invoices}
                    showDate={showDate}
                    customerName={firstRow.name}
                    customerImage={firstRow.image_url}
                    showCustomerInfo={!hasMultipleStatuses && !paidRow}
                  />
                )}
              </React.Fragment>
            );
          })}

          {customers.length === 0 && (
            <tr>
              <td
                colSpan={showDate ? 6 : 5}
                className="py-8 text-center text-sm text-gray-500"
              >
                No customers found for this search.
              </td>
            </tr>
          )}
        </tbody>
        {(totalPaid > 0 || totalPending > 0) && (
          <tfoot className="bg-gray-50 border-t-2 border-gray-300">
            <tr>
              <td colSpan={showDate ? 3 : 2} className="py-4 pl-6 pr-3">
                <div className="text-sm font-semibold text-gray-900">Totals</div>
              </td>
              <td className="px-3 py-4">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-semibold text-green-600">Paid</div>
                  <div className="text-xs font-semibold text-yellow-600">Pending</div>
                </div>
              </td>
              <td className="px-3 py-4 text-right">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-semibold text-gray-700">{totalPaidInvoices}</div>
                  <div className="text-xs font-semibold text-gray-700">{totalPendingInvoices}</div>
                </div>
              </td>
              <td className="py-4 pl-3 pr-6 text-right">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-bold text-green-700">
                    {formatCurrency(totalPaid)}
                  </div>
                  <div className="text-sm font-bold text-yellow-700">
                    {formatCurrency(totalPending)}
                  </div>
                </div>
              </td>
            </tr>
            <tr className="bg-blue-50">
              <td colSpan={showDate ? 3 : 2} className="py-3 pl-6 pr-3">
                <div className="text-sm font-bold text-gray-900">Summary</div>
              </td>
              <td className="px-3 py-3">
                <div className="text-xs font-semibold text-gray-600">Total Revenue Generated</div>
              </td>
              <td className="px-3 py-3 text-right">
                <div className="text-xs font-semibold text-gray-600">
                  {totalPaidInvoices + totalPendingInvoices} invoices
                </div>
              </td>
              <td className="py-3 pl-3 pr-6 text-right">
                <div className="text-base font-bold text-blue-700">
                  {formatCurrency(totalPaid)}
                </div>
                <div className="text-xs font-semibold text-yellow-700 mt-1">
                  Pending: {formatCurrency(totalPending)}
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

