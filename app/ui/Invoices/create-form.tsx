"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createInvoice, State } from "@/app/lib/action";

type Customer = {
  id: string;
  name: string;
  email?: string;
};

type CreateInvoiceFormProps = {
  customers: Customer[];
};

const initialState: State = {
  errors: {},
  message: null,
};

export default function CreateInvoiceForm({ customers }: CreateInvoiceFormProps) {
const [state, formAction] = useActionState<State, FormData>(
  createInvoice,
  initialState
);

  return (
    <form
  action={formAction}
  className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 space-y-6"
>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Create Invoice</h1>
        <Link
          href="/invoices"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-black hover:bg-gray-100"
        >
          Cancel
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="customer" className="text-sm font-medium text-black">
          Customer
        </label>

        <select
          id="customer"
          name="customerId"
          defaultValue=""
          required
          aria-describedby="customer-error"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select a customer
          </option>

          {customers.map((customer) => (
            <option value={customer.id} key={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        {state.errors?.customerId && (
          <p id="customer-error" className="text-sm text-red-600">
            {state.errors.customerId.join(", ")}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-sm font-medium text-black">
          Amount
        </label>

        <input
          id="amount"
          name="amount"
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter amount"
          aria-describedby="amount-error"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {state.errors?.amount && (
          <p id="amount-error" className="text-sm text-red-600">
            {state.errors.amount.join(", ")}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium text-black">
          Status
        </label>

        <select
          id="status"
          name="status"
          aria-describedby="status-error"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>

        {state.errors?.status && (
          <p id="status-error" className="text-sm text-red-600">
            {state.errors.status.join(", ")}
          </p>
        )}
      </div>

      {state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
      >
        Create Invoice
      </button>
    </form>
  );
}
