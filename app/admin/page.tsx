import { prisma } from '@/lib/prisma';
export default async function Dashboard(){
const users = await prisma.user.count();
return (<div><h1 className="text-2xl font-semibold mb-4">Dashboard</h1><p>Users: {users}</p></div>);
}