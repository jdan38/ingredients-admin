// app/admin/layout.tsx
// Left-side sidebar + light content area, dark header/sidebar (#242222)

import './admin.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Bell, Mail, Search } from 'lucide-react';
import NavItems from './NavItems';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-white bg-[#111]">
      {/* Header (full width) */}
      <header className="sticky top-0 z-40 w-full border-b border-[#2c2a2a] bg-[#242222]">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="text-lg font-semibold tracking-widest">
            ADMIN
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <div className="flex items-center gap-2 rounded-full border border-[#3a3838] bg-[#1d1b1b] px-3 py-1.5">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  placeholder="Search..."
                  className="w-56 bg-transparent text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-full border border-[#3a3838] bg-[#1d1b1b] hover:bg-[#3a3838]">
              <Bell className="h-4 w-4" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full border border-[#3a3838] bg-[#1d1b1b] hover:bg-[#3a3838]">
              <Mail className="h-4 w-4" />
            </button>
            <div className="ml-2 rounded-full bg-[#1d1b1b] px-3 py-1.5 text-sm">
              Admin User
            </div>
          </div>
        </div>
      </header>

      {/* Left sidebar + right content (full width grid) */}
      <div className="grid grid-cols-1 md:grid-cols-[240px,1fr]">
        {/* LEFT Sidebar (flush to viewport edge) */}
        <aside className="min-h-[calc(100vh-56px)] border-r border-[#2c2a2a] bg-[#242222]">
          <div className="p-3">
            <NavItems base="" />
          </div>
        </aside>

        {/* RIGHT Content */}
        <main className="min-h-[calc(100vh-56px)] bg-[#f4f4f4] p-6 text-black">
          {children}
        </main>
      </div>
    </div>
  );
}
