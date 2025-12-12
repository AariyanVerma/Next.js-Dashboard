"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CustomersDateFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleDateChange = (date: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (date) {
      params.set("date", date);
      params.set("page", "1");
    } else {
      params.delete("date");
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="date-filter" className="text-xs text-gray-600 whitespace-nowrap">
        Filter by Date:
      </label>
      <input
        id="date-filter"
        type="date"
        defaultValue={searchParams.get("date") ?? ""}
        onChange={(e) => handleDateChange(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchParams.get("date") && (
        <button
          onClick={() => handleDateChange("")}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}

