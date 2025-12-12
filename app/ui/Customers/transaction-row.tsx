'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import type { CustomerTransaction } from "@/app/lib/data";
import InvoiceStatus from "@/app/ui/Invoices/status";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount); 
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
  customerEmail: string;
  status: 'paid' | 'pending';
  totalAmount: number;
  totalInvoices: number;
  showDate?: boolean;
  customerName?: string;
  customerImage?: string | null;
  showCustomerInfo?: boolean;
};

export default function TransactionRow({ 
  customerEmail, 
  status, 
  totalAmount, 
  totalInvoices, 
  showDate = false,
  customerName,
  customerImage,
  showCustomerInfo = false
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [transactions, setTransactions] = useState<CustomerTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setTransactions([]);
    }
  }, [expanded]);

  useEffect(() => {
    if (expanded && transactions.length === 0 && !loading) {
      setLoading(true);
      fetch(`/api/customers/transactions?email=${encodeURIComponent(customerEmail)}&status=${status}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            setTransactions(data);
          } else {
            setTransactions([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching transactions:', err);
          setTransactions([]);
          setLoading(false);
        });
    }
  }, [expanded, customerEmail, status]);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="py-4 pl-6 pr-3">
          {showCustomerInfo && customerName && (
            <div className="flex items-center gap-3">
              {customerImage ? (
                <Image
                  src={customerImage}
                  alt={customerName}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {customerName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-xs font-medium text-gray-800">
                {customerName}
              </span>
            </div>
          )}
        </td>
        <td className="px-3 py-4">
          {showCustomerInfo && (
            <span className="text-xs text-gray-500">{customerEmail}</span>
          )}
        </td>
        {showDate && <td className="px-3 py-4"></td>}
        <td className="px-3 py-4 text-center">
          <InvoiceStatus status={status} />
        </td>
        <td className="px-3 py-4 text-right text-xs font-medium text-gray-800">
          {totalInvoices}
        </td>
        <td className="py-4 pl-3 pr-6">
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs font-semibold text-gray-900">
              {formatCurrency(totalAmount)}
            </span>
            {totalInvoices > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label={expanded ? "Hide transactions" : "Show transactions"}
              >
                {expanded ? (
                  <ChevronUpIcon className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                )}
              </button>
            )}
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={showDate ? 6 : 5} className="px-6 py-4 bg-gray-50">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-700 mb-3">
                Individual Invoices ({status}) - {transactions.length} {transactions.length === 1 ? 'invoice' : 'invoices'}
              </h4>
              {loading ? (
                <div className="text-xs text-gray-500">Loading invoices...</div>
              ) : transactions.length === 0 ? (
                <div className="text-xs text-gray-500">No invoices found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead className="bg-white border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-2 text-left text-gray-600 font-medium">Invoice ID</th>
                        <th className="px-3 py-2 text-left text-gray-600 font-medium">Customer</th>
                        <th className="px-3 py-2 text-left text-gray-600 font-medium">Date Paid</th>
                        <th className="px-3 py-2 text-right text-gray-600 font-medium">Amount Paid</th>
                        <th className="px-3 py-2 text-center text-gray-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transactions.map((transaction) => (
                        <tr key={transaction.invoice_id} className="bg-white hover:bg-gray-50">
                          <td className="px-3 py-2 text-gray-700 font-medium">#{transaction.invoice_id}</td>
                          <td className="px-3 py-2 text-gray-700">
                            <div>
                              <div className="font-medium">{transaction.customer_name}</div>
                              <div className="text-gray-500 text-xs">{transaction.customer_email}</div>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-gray-600">{formatDate(transaction.date)}</td>
                          <td className="px-3 py-2 text-right font-semibold text-gray-900">
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="px-3 py-2 text-center">
                            <InvoiceStatus status={transaction.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                      <tr>
                        <td colSpan={3} className="px-3 py-2 text-right font-semibold text-gray-700">
                          Total ({transactions.length} {transactions.length === 1 ? 'invoice' : 'invoices'}):
                        </td>
                        <td className="px-3 py-2 text-right font-bold text-gray-900">
                          {formatCurrency(transactions.reduce((sum, t) => sum + t.amount, 0))}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

