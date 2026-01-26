
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Standard init relying on env var
const prisma = new PrismaClient();

async function main() {
  console.log('Resetting Admin credentials...');
  const email = 'admin@cadservice.com';
  const password = 'admin123';
  
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  
  await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash: hash,
        role: 'ADMIN',
      },
      create: {
        email,
        passwordHash: hash,
        fullName: 'Admin User',
        role: 'ADMIN',
      },
  });
  console.log('Admin user reset successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
