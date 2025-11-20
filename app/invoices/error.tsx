"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function InvoicesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Invoices section error:", error);
  }, [error]);

  return (
    <main className="px-8 py-8">
      <div className="max-w-3xl rounded-2xl bg-white shadow-lg border border-gray-200 px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong with Invoices
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          We couldn&apos;t load this invoices view right now. You can retry, or
          go back to the dashboard.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Try again
          </button>

        <a
          href="/dashboard"
          className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
        >
          Back to Dashboard
        </a>
        </div>
      </div>
    </main>
  );
}
