import Link from 'next/link';

type NavLink = {
  name: string;
  href: string;
};

const links: NavLink[] = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Customers', href: '/dashboard/customers' },
  { name: 'Invoices', href: '/dashboard/invoices' },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
