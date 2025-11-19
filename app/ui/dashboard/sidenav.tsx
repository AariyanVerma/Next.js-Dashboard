import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col gap-4 border-r border-gray-200 bg-gray-50 p-4">
      <div className="text-lg font-semibold tracking-tight">
        <Link href="/dashboard">Next.js Dashboard</Link>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLinks />
      </nav>

      <div className="mt-auto text-xs text-gray-400">
        Signed in as demo user
      </div>
    </aside>
  );
}
