import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
adapter: PrismaAdapter(prisma),
session: { strategy: 'jwt' },
secret: process.env.NEXTAUTH_SECRET,
providers: [
Credentials({
name: 'Credentials',
credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
async authorize(c) {
if (!c?.email || !c?.password) return null;
const user = await prisma.user.findUnique({ where: { email: c.email } });
if (!user?.passwordHash) return null;
const ok = await bcrypt.compare(c.password, user.passwordHash);
return ok ? { id: user.id, email: user.email, name: user.name } as any : null;
}
})
]
};