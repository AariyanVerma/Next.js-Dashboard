"use client";

import { useActionState } from "react";
import { updateInvoice, type State } from "@/app/lib/action";
import Link from "next/link";

type Customer = {
  id: string;
  name: string;
  email: string;
};

type Invoice = {
  id: string;
  customer_id: string;
  amount: number; 
  status: "pending" | "paid";
};

const initialState: State = {};

type Props = {
  invoice: Invoice;
  customers: Customer[];
};

export default function EditInvoiceForm({ invoice, customers }: Props) {
  const [state, formAction, isPending] = useActionState(
    (prevState: State, formData: FormData) =>
      updateInvoice(invoice.id, prevState, formData),
    initialState,
  );

  const amountInDollars = invoice.amount;

  return (
    <form
      action={formAction}
      className="mt-6 max-w-xl rounded-xl bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Edit Invoice
        </h2>
        <Link
          href="/invoices"
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Cancel
        </Link>
      </div>

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
            defaultValue={invoice.customer_id}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-invalid={state.errors?.customerId ? true : undefined}
            aria-describedby={
              state.errors?.customerId ? "customer-error" : undefined
            }
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {state.errors?.customerId && (
            <p
              id="customer-error"
              className="text-xs text-red-600"
            >
              {state.errors.customerId.join(", ")}
            </p>
          )}
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
            step="0.01"
            min="0"
            defaultValue={amountInDollars}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-invalid={state.errors?.amount ? true : undefined}
            aria-describedby={
              state.errors?.amount ? "amount-error" : undefined
            }
          />
          {state.errors?.amount && (
            <p id="amount-error" className="text-xs text-red-600">
              {state.errors.amount.join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">
          Status
        </span>
        <div className="flex gap-4 text-sm text-gray-900">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="pending"
              className="h-4 w-4"
              defaultChecked={invoice.status === "pending"}
              aria-invalid={state.errors?.status ? true : undefined}
              aria-describedby={
                state.errors?.status ? "status-error" : undefined
              }
            />
            <span>Pending</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="paid"
              className="h-4 w-4"
              defaultChecked={invoice.status === "paid"}
            />
            <span>Paid</span>
          </label>
        </div>
        {state.errors?.status && (
          <p id="status-error" className="text-xs text-red-600">
            {state.errors.status.join(", ")}
          </p>
        )}
      </div>

      {state.message && (
        <p className="mt-4 text-sm text-red-600">
          {state.message}
        </p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Link
          href="/invoices"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
