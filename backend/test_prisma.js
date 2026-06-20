const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Testing Prisma connection to Neon...");
    const userCount = await prisma.user.count();
    console.log("Success! Connected to Neon. User count:", userCount);
  } catch (error) {
    console.error("Prisma connection error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
