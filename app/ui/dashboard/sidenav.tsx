import Link from 'next/link';

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col gap-4 border-r border-gray-200 bg-gray-50 p-4">
      <div className="text-lg font-semibold tracking-tight">
        <Link href="/dashboard">Next.js Dashboard</Link>
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        <Link
          href="/dashboard"
          className="rounded-md px-3 py-2 hover:bg-gray-100"
        >
          Overview
        </Link>
        <Link
          href="/dashboard/customers"
          className="rounded-md px-3 py-2 hover:bg-gray-100"
        >
          Customers
        </Link>
        <Link
          href="/dashboard/invoices"
          className="rounded-md px-3 py-2 hover:bg-gray-100"
        >
          Invoices
        </Link>
      </nav>

      <div className="mt-auto text-xs text-gray-400">
        Signed in as demo user
      </div>
    </aside>
  );
}
