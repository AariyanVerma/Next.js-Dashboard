"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <main className="px-8 py-8">
      <div className="max-w-3xl rounded-2xl bg-white shadow-lg border border-gray-200 px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong on the Dashboard
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Don&apos;t worry, this section is isolated so the rest of the app keeps
          working. You can try loading the dashboard again.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Try again
          </button>

          <button
            type="button"
            onClick={() => window.location.replace("/")}
            className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
          >
            Go home
          </button>
        </div>
      </div>
    </main>
  );
}
