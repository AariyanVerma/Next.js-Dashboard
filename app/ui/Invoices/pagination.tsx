import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type Props = {
  currentPage: number;
  totalPages: number;
  query: string;
};

export default function InvoicesPagination({
  currentPage,
  totalPages,
  query,
}: Props) {
  if (totalPages <= 1) return null;

  const createPageLink = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (page > 1) params.set("page", String(page));
    return `/invoices?${params.toString()}`;
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-between pt-4">
      <Link
        href={prevDisabled ? "#" : createPageLink(currentPage - 1)}
        aria-disabled={prevDisabled}
        className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-medium ${
          prevDisabled
            ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </Link>

      <span className="text-xs text-gray-500">
        Page{" "}
        <span className="font-semibold text-gray-800">{currentPage}</span> of{" "}
        <span className="font-semibold text-gray-800">{totalPages}</span>
      </span>

      <Link
        href={nextDisabled ? "#" : createPageLink(currentPage + 1)}
        aria-disabled={nextDisabled}
        className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-medium ${
          nextDisabled
            ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
