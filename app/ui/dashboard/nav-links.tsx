'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type NavLink = {
  name: string;
  href: string;
};

const links: NavLink[] = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Customers', href: '/dashboard/customers' },
  { name: 'Invoices', href: '/invoices' },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href || 
          (link.href === '/dashboard' && pathname === '/dashboard') ||
          (link.href !== '/dashboard' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'rounded-md px-3 py-2 text-sm transition-colors',
              {
                'bg-blue-600 font-medium text-white': isActive,
                'hover:bg-blue-100 text-gray-600': !isActive,
              }
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
