import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col gap-4 border-r border-gray-200 bg-gray-50">
      <div className="bg-blue-600 px-4 py-4 text-center">
        <Link href="/dashboard" className="text-4xl font-black tracking-tight text-white font-mono">
          Chefora
        </Link>
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <NavLinks />
      </nav>

      <div className="mt-auto px-4 pb-4 text-xs text-gray-400">
        Signed in as demo user
      </div>
    </aside>
  );
}
