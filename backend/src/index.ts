import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import apiRouter from "./routes/index";

// Load configurations
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet());

// Cross Origin Resource Sharing configuration
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Payload limit parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Basic rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: "Too many requests from this IP. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Mount API routes
app.use("/api", apiRouter);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 404 Route handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "API route not found." });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled exception caught:", err);
  res.status(500).json({ error: "Internal server error." });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 AI Dark Pattern Detector API Server is active!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`⚙️ Env: ${process.env.NODE_ENV || "development"}`);
  console.log(`=================================================`);
});
