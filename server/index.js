import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/db.js";
import { Status } from "./utils/statusCodes.js";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

//Route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);

// Basic-Routes
app.get("/test", (req, res) => {
  try {
    return res.status(Status.OK).json({
      success: true,
      message: "Blog backend is running...",
      uptime: process.uptime(), // seconds since server started
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    console.error("Root route error:", error); // log for backend devs
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// 404 — Not Found handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(` 
${"-".repeat(60)} 
🚀 Server is UP & RUNNING
🔗 URL      : http://localhost:${PORT}
🌐 MODE     : ${process.env.NODE_ENV}
🕒 Started  : ${new Date().toLocaleString()}
${"-".repeat(60)}
`)
);
