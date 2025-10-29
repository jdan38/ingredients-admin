// app/admin/users/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function UsersPage() {
  // Fetch all users with the new fields
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      accessLevel: true,
      department: true,
      idNumber: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-4">
      {/* Header + Create Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          + Create User
        </Link>
      </div>

      {/* Scrollable List Box */}
      <div
        className="
          w-full
          bg-white
          rounded-xl
          border border-gray-200 shadow-sm
          overflow-hidden
        "
        style={{
          height: 'calc(100dvh - var(--admin-header) - 2rem)',
        }}
      >
        <div className="h-full overflow-y-auto">
          {/* Table Header */}
          <div className="sticky top-0 z-10 grid grid-cols-7 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Access Level</div>
            <div>Department</div>
            <div>ID Number</div>
          </div>

          {/* Table Rows */}
          <ul className="divide-y divide-gray-200">
            {users.map((u) => (
              <li
                key={u.id}
                className="grid grid-cols-7 gap-4 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
              >
                <div>{u.firstName || '-'}</div>
                <div>{u.lastName || '-'}</div>
                <div className="truncate">{u.email || '-'}</div>
                <div>{u.phoneNumber || '-'}</div>
                <div>{u.accessLevel || '-'}</div>
                <div>{u.department || '-'}</div>
                <div>{u.idNumber || '-'}</div>
              </li>
            ))}

            {users.length === 0 && (
              <li className="px-4 py-12 text-center text-sm text-gray-500">
                No users yet. Click <span className="font-medium">Create User</span> to add one.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
