
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to Prisma...");
    await prisma.$connect();
    console.log("Connected.");

    console.log("Fetching public articles...");
    // const page = 1;
    // const limit = 3;
    // const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.article.findMany({
        where: { isPublished: true },
        // removed relations
      }),
      prisma.article.count({ where: { isPublished: true } }),
    ]);

    console.log("Success!", { data, total });

  } catch (error) {
    console.error("CRITICAL ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
