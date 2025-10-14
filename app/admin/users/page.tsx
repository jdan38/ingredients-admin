import { prisma } from '@/lib/prisma';
export default async function Users(){
const users = await prisma.user.findMany({ orderBy:{createdAt:'desc'}});
return (<div><h1 className="text-2xl font-semibold mb-4">Users</h1>
<ul className="bg-white rounded-xl shadow divide-y">
{users.map(u=>(<li key={u.id} className="p-3 flex justify-between"><span>{u.email}</span><span>{u.status}</span></li>))}
</ul></div>);
}