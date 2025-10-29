'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  Menu,
  X,
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  Image as ImageIcon,
} from "lucide-react";

type NavItem = { name: string; href: string; icon: React.ElementType };

const NAV: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Billing", href: "/admin/billing", icon: CreditCard },
  { name: "Ads", href: "/admin/ads", icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop collapsed

  // Close mobile drawer on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 text-white">
      {/* Top header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-700 bg-black px-4 py-3">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3">
          {/* Mobile: hamburger toggles drawer */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800 lg:hidden"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop: collapse/expand button */}
          <button
            className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="text-lg font-bold tracking-[0.35em]">ADMIN</div>
        </div>

        {/* Right: Search + Icons + User */}
        <div className="flex items-center gap-3">
          <form className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-64 rounded-full border border-gray-600 bg-gray-900 px-3 text-sm text-white placeholder-gray-400 outline-none transition focus:border-gray-400"
            />
          </form>

          <button
            type="button"
            aria-label="Notifications"
            className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 transition"
          >
            <Bell className="h-4 w-4 text-gray-300" />
          </button>
          <button
            type="button"
            aria-label="Messages"
            className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 transition"
          >
            <Mail className="h-4 w-4 text-gray-300" />
          </button>
          <div className="ml-1 select-none text-sm font-medium text-gray-200">Admin User</div>
        </div>
      </header>

      {/* Shell: sidebar + page */}
      <div className="relative flex">
        {/* ---- Desktop sidebar ---- */}
        <aside
          className={[
            "hidden lg:flex lg:flex-col lg:shadow-md lg:bg-black lg:border-r lg:border-gray-800 transition-[width] duration-200 ease-in-out",
            collapsed ? "lg:w-[76px]" : "lg:w-[220px]",
          ].join(" ")}
        >
          <nav className="p-3 space-y-1">
            {NAV.map(({ name, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  ].join(" ")}
                  title={collapsed ? name : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0 text-gray-300" />
                  <span className={["truncate transition-opacity", collapsed ? "opacity-0 w-0" : "opacity-100"].join(" ")}>
                    {name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ---- Mobile drawer ---- */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden
            />
            <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-black shadow-xl border-r border-gray-800 p-4 lg:hidden">
              <h2 className="mb-4 text-xl font-bold tracking-wide">ADMIN</h2>
              <nav className="space-y-1">
                {NAV.map(({ name, href, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={[
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4 text-gray-300" />
                      <span className="truncate">{name}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </>
        )}

        {/* ---- Page content ---- */}
        <main className="flex-1 p-6 text-black">{children}</main>
      </div>
    </div>
  );
}
