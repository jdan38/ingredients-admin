import Link from 'next/link';
export default function AdminLayout({ children }:{children:React.ReactNode}){
return (
<div className="min-h-screen grid grid-cols-[220px_1fr]">
<aside className="bg-white p-4 shadow"><h2 className="font-semibold mb-4">Admin</h2>
<nav className="space-y-2">
<Link href="/admin">Dashboard</Link><br/>
<Link href="/admin/users">Users</Link><br/>
<Link href="/admin/billing">Billing</Link><br/>
<Link href="/admin/ads">Ads</Link>
</nav></aside>
<main className="p-6">{children}</main>
</div>
);
}