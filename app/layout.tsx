import './globals.css';
export const metadata = { title: 'Ingredients Admin', description: 'Admin Console' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (<html lang="en"><body className="min-h-screen bg-gray-50">{children}</body></html>);
}