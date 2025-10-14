import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main(){
const hash = await bcrypt.hash('admin123',10);
await prisma.user.upsert({ where:{email:'admin@example.com'}, update:{}, create:{ email:'admin@example.com', name:'Admin', passwordHash:hash } });
}
main().finally(()=>prisma.$disconnect());