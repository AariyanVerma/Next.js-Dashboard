"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  placeholder?: string;
};

export default function CustomersSearch({
  placeholder = "Search customers…",
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
      params.set("page", "1"); 
    } else {
      params.delete("query");
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder={placeholder}
      defaultValue={searchParams.get("query") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

