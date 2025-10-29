// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@example.com';
  const adminPwdHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      // keep as-is or set profile fields if you want:
      firstName: 'Admin',
      lastName: 'User',
      accessLevel: 'admin',
      department: 'Operations',
      idNumber: 'A-0001',
      phoneNumber: null,
    },
    create: {
      email: adminEmail,
      passwordHash: adminPwdHash,
      firstName: 'Admin',
      lastName: 'User',
      accessLevel: 'admin',
      department: 'Operations',
      idNumber: 'A-0001',
      phoneNumber: null,
    },
  });

  console.log('Seeded admin user');
}

main().finally(() => prisma.$disconnect());
