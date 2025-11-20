'use client';

import { createInvoice } from '@/app/lib/action';
import Link from 'next/link';

type Customer = {
  id: string;
  name: string;
  email?: string;
};

export default function CreateInvoiceForm({
  customers,
}: {
  customers: Customer[];
}) {
  return (
    <form
      action={createInvoice}
      className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="customer"
            className="text-sm font-medium text-gray-700"
          >
            Customer
          </label>
          <select
            id="customer"
            name="customerId"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="amount"
            className="text-sm font-medium text-gray-700"
          >
            Amount (USD)
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">Status</span>
        <div className="flex gap-4 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="pending"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span>Pending</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="paid"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span>Paid</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link
          href="/invoices"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Save invoice
        </button>
      </div>
    </form>
  );
}
