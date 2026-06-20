import { Router, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import multer from "multer";
import prisma from "../config/db";
import { authenticateToken, requireRole, AuthenticatedRequest } from "../middleware/auth";
import { analyzeContent } from "../services/ai.service";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_buildathon_2026";

// Multer upload configurations (local fallback cache)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ==========================================
// 1. AUTHENTICATION ROUTERS
// ==========================================

// POST /api/auth/register
router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
    return res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/auth/login
router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/auth/me
router.get("/auth/me", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Fetch me error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// ==========================================
// 2. SCANS & REPORTS ROUTERS
// ==========================================

// POST /api/scans/url
router.post("/scans/url", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { url } = req.body;
    const userId = req.user?.id;

    if (!url || !userId) {
      return res.status(400).json({ error: "URL field is required." });
    }

    // Run crawler simulation + AI Audit parser
    console.log(`Starting scan audit on: ${url}`);
    const mockCrawlerText = `Simulating DOM structure crawl for ${url}. Analyzing page elements. Checkout items: Pre-checked newsletter subscription and hidden transport care charge.`;
    const auditReport = await analyzeContent(mockCrawlerText, true);

    const scan = await prisma.scan.create({
      data: {
        userId,
        url,
        score: auditReport.ethicalScore,
        status: auditReport.status,
      }
    });

    const report = await prisma.report.create({
      data: {
        scanId: scan.id,
        darkPatterns: auditReport.patterns,
        recommendations: auditReport.recommendations
      }
    });

    return res.status(201).json({ scan, report });
  } catch (error) {
    console.error("URL Scan error:", error);
    return res.status(500).json({ error: "Failed to audit target URL." });
  }
});

// GET /api/reports
router.get("/reports", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const scans = await prisma.scan.findMany({
      where: { userId },
      include: { report: true, images: true },
      orderBy: { createdAt: "desc" }
    });
    return res.status(200).json(scans);
  } catch (error) {
    console.error("Get reports error:", error);
    return res.status(500).json({ error: "Failed to read report histories." });
  }
});

// GET /api/reports/:id
router.get("/reports/:id", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const report = await prisma.report.findFirst({
      where: {
        id: req.params.id,
        scan: { userId: req.user?.id }
      },
      include: { scan: true }
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found or access denied." });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error("Get report detail error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// ==========================================
// 3. FILE UPLOADS & SCREENSHOT AUDIT ROUTERS
// ==========================================

// POST /api/upload
router.post("/upload", authenticateToken, upload.single("file"), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const file = req.file;
    const userId = req.user?.id;

    if (!file || !userId) {
      return res.status(400).json({ error: "File upload target missing." });
    }

    // Mock Cloudinary URL (Since Cloudinary requires credentials, we mock the upload and save)
    const mockCloudinaryUrl = `https://res.cloudinary.com/demo/image/upload/v12345678/mock_screenshot_${Date.now()}.png`;

    // Process visual segments (forced continuity + hidden fees)
    const ocrText = "Cart Checkout total: $69.99. Pre-checked Continuous billing VIP membership. Surcharge: Eco protection fee $3.99.";
    const auditReport = await analyzeContent(ocrText, false);

    const scan = await prisma.scan.create({
      data: {
        userId,
        url: "Uploaded Screenshot",
        score: auditReport.ethicalScore,
        status: auditReport.status,
      }
    });

    await prisma.report.create({
      data: {
        scanId: scan.id,
        darkPatterns: auditReport.patterns,
        recommendations: auditReport.recommendations
      }
    });

    const uploadedImage = await prisma.uploadedImage.create({
      data: {
        userId,
        scanId: scan.id,
        imageUrl: mockCloudinaryUrl
      }
    });

    return res.status(201).json({ scan, image: uploadedImage });
  } catch (error) {
    console.error("Upload audit error:", error);
    return res.status(500).json({ error: "Failed to upload and audit image." });
  }
});

// ==========================================
// 4. USER & DEVELOPER SETTINGS ROUTERS
// ==========================================

// GET /api/users/apikeys
router.get("/users/apikeys", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const keys = await prisma.apiKey.findMany({ where: { userId } });
    return res.status(200).json(keys);
  } catch (error) {
    console.error("Fetch API keys error:", error);
    return res.status(500).json({ error: "Failed to fetch keys." });
  }
});

// POST /api/users/apikeys
router.post("/users/apikeys", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ error: "Missing token metadata." });

    const key = `adpd_live_${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;
    const apiKey = await prisma.apiKey.create({
      data: { userId, key }
    });

    return res.status(201).json(apiKey);
  } catch (error) {
    console.error("Create API key error:", error);
    return res.status(500).json({ error: "Failed to generate key." });
  }
});

// ==========================================
// 5. ADMINISTRATIVE ROUTERS
// ==========================================

// GET /api/admin/stats
router.get("/admin/stats", authenticateToken, requireRole("ADMIN"), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalScans = await prisma.scan.count();
    const averageScore = await prisma.scan.aggregate({
      _avg: { score: true }
    });

    const statusCounts = await prisma.scan.groupBy({
      by: ["status"],
      _count: { id: true }
    });

    // Grouping by date (last 7 days counts)
    const scansHistory = await prisma.scan.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 50
    });

    return res.status(200).json({
      totalUsers,
      totalScans,
      averageScore: Math.round(averageScore._avg.score || 0),
      statusCounts,
      scansHistory
    });
  } catch (error) {
    console.error("Fetch admin stats error:", error);
    return res.status(500).json({ error: "Failed to read system status." });
  }
});

export default router;
