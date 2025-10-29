// app/admin/users/new/page.tsx
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// ---- Server Action ----
async function createUser(formData: FormData) {
  'use server';

  const firstName   = (formData.get('firstName') ?? '').toString().trim();
  const lastName    = (formData.get('lastName') ?? '').toString().trim();
  const email       = (formData.get('email') ?? '').toString().trim().toLowerCase();
  const phoneNumber = (formData.get('phoneNumber') ?? '').toString().trim();
  const accessLevel = (formData.get('accessLevel') ?? '').toString().trim();
  const department  = (formData.get('department') ?? '').toString().trim();
  const idNumber    = (formData.get('idNumber') ?? '').toString().trim();

  if (!email) {
    throw new Error('Email is required.');
  }

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        accessLevel,
        department,
        idNumber: idNumber || null,
      },
    });
  } catch (err: any) {
    // Handle Prisma unique constraint (P2002) gracefully
    if (err?.code === 'P2002') {
      const fields = (err?.meta?.target as string[])?.join(', ') || 'field(s)';
      throw new Error(`A user with that ${fields} already exists.`);
    }
    throw new Error('Failed to create user.');
  }

  // Refresh list & go back to Users page
  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Create User</h1>
        <a
          href="/admin/users"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form action={createUser} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-400"
              placeholder="Jane"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-400"
              placeholder="Doe"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-400"
              placeholder="user@example.com"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-400"
              placeholder="(555) 555-5555"
            />
          </div>

          {/* Access Level */}
          <div className="flex flex-col gap-1">
            <label htmlFor="accessLevel" className="text-sm font-medium text-gray-700">
              Access level
            </label>
            <select
              id="accessLevel"
              name="accessLevel"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-400"
              defaultValue=""
            >
              <option value="" disabled>
                Select access…
              </option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          {/* Department */}
          <div className="flex flex-col gap-1">
            <label htmlFor="department" className="text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-400"
              placeholder="Operations"
            />
          </div>

          {/* ID Number */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="idNumber" className="text-sm font-medium text-gray-700">
              ID number
            </label>
            <input
              id="idNumber"
              name="idNumber"
              type="text"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-400"
              placeholder="EMP-000123"
            />
          </div>

          {/* Actions */}
          <div className="md:col-span-2 mt-2 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create User
            </button>
            <a
              href="/admin/users"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
