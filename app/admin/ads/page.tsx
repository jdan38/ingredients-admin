import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const users = await prisma.user.count();

  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Box 1: PROFIT */}
        <div className="flex flex-col justify-between bg-white shadow-md rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-600 tracking-wide">
              PROFIT
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center text-3xl font-bold text-gray-800 py-8">
            $3,450
          </div>
          <div className="h-3 bg-green-500/70" />
        </div>

        {/* Box 2: REVENUE */}
        <div className="flex flex-col justify-between bg-white shadow-md rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-600 tracking-wide">
              REVENUE
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center text-3xl font-bold text-gray-800 py-8">
            $34.7K
          </div>
          <div className="h-3 bg-blue-500/70" />
        </div>

        {/* Box 3: MEMBERS */}
        <div className="flex flex-col justify-between bg-white shadow-md rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-600 tracking-wide">
              MEMBERS
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center text-3xl font-bold text-gray-800 py-8">
            {users}
          </div>
          <div className="h-3 bg-purple-500/70" />
        </div>

        {/* Box 4: VISITORS */}
        <div className="flex flex-col justify-between bg-white shadow-md rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-600 tracking-wide">
              VISITORS
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center text-3xl font-bold text-gray-800 py-8">
            1,207
          </div>
          <div className="h-3 bg-orange-500/70" />
        </div>
      </div>
    </div>
  );
}
