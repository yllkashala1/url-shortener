import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import { redirectUrl } from "./controllers/urlController.js"; // ⬅️ Importo redirectUrl

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/hello", (req, res) => {
  res.send("Hello from URL Shortener 🚀");
});

// API routes
app.use("/api/url", urlRoutes);

// Redirect direkt nga shortId
app.get("/:shortId", redirectUrl);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { dbName: "urlshortener" })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
