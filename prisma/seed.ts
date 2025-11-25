import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { role: 'ADMIN', hashedPassword },
    create: { email, role: 'ADMIN', hashedPassword, name: 'Admin' }
  });
  // 預設建立一個分類，方便測試
  await prisma.category.upsert({
    where: { slug: 'default' },
    update: {},
    create: { name: 'Default', slug: 'default' }
  });
  console.log('Seed finished. Admin:', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


