// components/AdminHeader.tsx
"use client";
import { Bell, Mail, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface bg-opacity-80 backdrop-blur supports-[backdrop-filter]:bg-opacity-60 shadow-header border-b border-surface-border">
      <div className="container-page h-16 flex items-center justify-between">
        {/* Left: Brand + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-xl border border-surface-border hover:bg-surface-muted"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5 text-text-secondary" />
          </button>
          <Link href="/admin" className="font-semibold tracking-wider text-text-primary">
            <span className="inline-block rounded-pill bg-brand-600 text-white px-2.5 py-1 mr-2 text-xs">ADMIN</span>
            <span className="sr-only">Home</span>
          </Link>
        </div>

        {/* Middle: Search */}
        <div className="hidden md:flex flex-1 justify-center">
          <input className="input w-full max-w-md" placeholder="Search…" />
        </div>

        {/* Right: Icons + user */}
        <div className="flex items-center gap-2">
          <button className="btn-ghost h-10 w-10 justify-center p-0" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <button className="btn-ghost h-10 w-10 justify-center p-0" aria-label="Messages">
            <Mail className="h-5 w-5" />
          </button>
          <div className="ml-2 hidden sm:flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-600 to-accent-500" />
            <span className="text-sm text-text-secondary">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}
