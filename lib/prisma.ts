import { PrismaClient } from '@prisma/client';
const globalForPrisma = global as any;
export const prisma: PrismaClient = globalForPrisma.prisma || new PrismaClient({ log: ['warn','error'] });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
