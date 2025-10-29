// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // --- Admin user (example) ---
  const adminEmail = 'admin@example.com';
  const adminPwdHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPwdHash,
    },
  });

  // --- Ensure a slot exists on the "diet-page" at "sidebar" ---
  const slot = await prisma.adSlot.upsert({
    where: { pageKey_positionKey: { pageKey: 'diet-page', positionKey: 'sidebar' } },
    update: {
      active: true,                // NOTE: 'active' not 'isActive'
      description: 'Sidebar slot', // optional text label
    },
    create: {
      id: crypto.randomUUID(),
      pageKey: 'diet-page',
      positionKey: 'sidebar',
      active: true,
      description: 'Sidebar slot',
    },
  });

  // --- Seed a couple of ads pointing at that slot ---
  await prisma.ad.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        name: 'Meal Planner Pro',
        imageUrl: 'https://picsum.photos/seed/meal/600/300',
        clickUrl: 'https://example.com/meal-planner',
        placement: 'sidebar',
        slotId: slot.id,
        impressionsCount: 0,
        clicksCount: 0,
        weight: 60,
      },
      {
        id: crypto.randomUUID(),
        name: 'Budget Groceries',
        imageUrl: 'https://picsum.photos/seed/grocery/600/300',
        clickUrl: 'https://example.com/budget-groceries',
        placement: 'sidebar',
        slotId: slot.id,
        impressionsCount: 0,
        clicksCount: 0,
        weight: 40,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
