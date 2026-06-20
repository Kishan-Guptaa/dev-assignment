import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing items to allow re-runs
  await prisma.apiKey.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.uploadedImage.deleteMany({});
  await prisma.scan.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Users
  const saltRounds = 10;
  const adminPassword = await bcrypt.hash("adminpassword123", saltRounds);
  const userPassword = await bcrypt.hash("userpassword123", saltRounds);

  const admin = await prisma.user.create({
    data: {
      name: "Agastya Admin",
      email: "admin@detector.io",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const standardUser = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "user@detector.io",
      password: userPassword,
      role: Role.USER,
    },
  });

  console.log("Users seeded successfully!");

  // 2. Create API Keys
  await prisma.apiKey.create({
    data: {
      userId: standardUser.id,
      key: "adpd_live_a89fd92bc9f20109ae9bc",
      hits: 142,
    },
  });

  // 3. Create Scan History for charts
  const scansData = [
    {
      url: "https://sneakycheckout-store.com",
      score: 35,
      status: "danger",
      userId: standardUser.id,
      patterns: [
        {
          category: "Forced Continuity",
          text: "Auto-bills $14.99 monthly subscription",
          severity: "high",
          explanation: "Hidden agreement checkbox pre-selected during checkout."
        },
        {
          category: "Hidden Costs",
          text: "$4.99 Package Care Surcharge",
          severity: "medium",
          explanation: "Unrevealed handling fee added late in order execution."
        }
      ],
      fixes: [
        { pattern: "Forced Continuity", fixAdvice: "Uncheck option by default and present clear toggle buttons." },
        { pattern: "Hidden Costs", fixAdvice: "Expose all handling surcharges early in the landing cart summary." }
      ]
    },
    {
      url: "https://travel-booking-traps.net",
      score: 55,
      status: "warning",
      userId: standardUser.id,
      patterns: [
        {
          category: "Confirmshaming CTA",
          text: "No, I hate saving polar bears",
          severity: "medium",
          explanation: "Guilt-inducing button label to dismiss newsletter promotion."
        }
      ],
      fixes: [
        { pattern: "Confirmshaming CTA", fixAdvice: "Make button labels objective: 'Subscribe' / 'Dismiss'." }
      ]
    },
    {
      url: "https://ethical-cart.org",
      score: 98,
      status: "safe",
      userId: standardUser.id,
      patterns: [],
      fixes: []
    },
    {
      url: "https://auto-renew-saas.com",
      score: 42,
      status: "danger",
      userId: standardUser.id,
      patterns: [
        {
          category: "Forced Continuity",
          text: "Billed annually at $120.00 after trial",
          severity: "high",
          explanation: "Cancellation button hidden behind 4 profile submenus."
        }
      ],
      fixes: [
        { pattern: "Forced Continuity", fixAdvice: "Provide a direct, one-click subscription management button." }
      ]
    }
  ];

  for (const item of scansData) {
    const scan = await prisma.scan.create({
      data: {
        userId: item.userId,
        url: item.url,
        score: item.score,
        status: item.status,
      },
    });

    await prisma.report.create({
      data: {
        scanId: scan.id,
        darkPatterns: item.patterns,
        recommendations: item.fixes,
      },
    });
  }

  console.log("Scans and reports seeded!");
  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
