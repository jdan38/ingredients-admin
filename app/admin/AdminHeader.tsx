'use client';

import { Bell, Mail } from 'lucide-react';
import * as React from 'react';

type Props = {
  userName?: string;
  onSearch?: (q: string) => void;
};

export default function AdminHeader({ userName = 'Admin', onSearch }: Props) {
  const [q, setQ] = React.useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(q);
  }

  return (
    <header className="sticky top-0 z-30 h-14 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4">
        {/* Left: Title */}
        <div className="text-lg font-extrabold tracking-[0.35em] text-gray-800">
          ADMIN
        </div>

        {/* Right: Search + icons + name */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <form onSubmit={submit} className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="h-9 w-56 rounded-full border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-gray-400"
              aria-label="Search admin"
            />
          </form>

          {/* Bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
          >
            <Bell className="h-4 w-4 text-gray-700" />
          </button>

          {/* Mail */}
          <button
            type="button"
            aria-label="Messages"
            className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
          >
            <Mail className="h-4 w-4 text-gray-700" />
          </button>

          {/* Name */}
          <div className="ml-1 select-none text-sm font-medium text-gray-800">
            {userName}
          </div>
        </div>
      </div>
    </header>
  );
}
