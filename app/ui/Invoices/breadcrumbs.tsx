import Link from 'next/link';
import clsx from 'clsx';

type Crumb = {
  label: string;
  href: string;
  active?: boolean;
};

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-300">/</span>}
            <Link
              href={crumb.href}
              className={clsx(
                'hover:text-gray-900',
                crumb.active && 'font-semibold text-gray-900',
              )}
              aria-current={crumb.active ? 'page' : undefined}
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
