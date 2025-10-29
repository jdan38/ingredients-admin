'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
} from 'lucide-react';

type Props = { base?: string };

const nav = (base = '') => ([
  { label: 'Dashboard', href: `${base}/admin`,          icon: LayoutDashboard },
  { label: 'Users',     href: `${base}/admin/users`,    icon: Users },
  { label: 'Billing',   href: `${base}/admin/billing`,  icon: CreditCard },
  { label: 'Ads',       href: `${base}/admin/ads`,      icon: Package },
]);

export default function NavItems({ base = '' }: Props) {
  const pathname = usePathname();
  const items = nav(base);

  return (
    <nav className="space-y-1">
      {items.map(({ label, href, icon: Icon }) => {
        const active = pathname === href || pathname?.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={[
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition',
              active
                ? 'bg-[#3a3838] text-white'
                : 'text-gray-200 hover:bg-[#3a3838] hover:text-white',
            ].join(' ')}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
