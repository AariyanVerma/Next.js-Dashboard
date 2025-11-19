// app/ui/dashboard/nav-links.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Invoices", href: "/invoices", icon: DocumentDuplicateIcon },
  { name: "Customers", href: "/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
              active
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
