import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number;
  type: "collected" | "pending" | "invoices" | "customers";
}) {
  const icon =
    type === "collected" ? (
      <ArrowUpCircleIcon className="h-6 w-6 text-green-500" />
    ) : type === "pending" ? (
      <ArrowDownCircleIcon className="h-6 w-6 text-amber-500" />
    ) : type === "invoices" ? (
      <ArrowUpCircleIcon className="h-6 w-6 text-sky-500" />
    ) : (
      <ArrowUpCircleIcon className="h-6 w-6 text-violet-500" />
    );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon}
      </div>

      <p className="mt-4 text-2xl font-semibold text-gray-900">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
