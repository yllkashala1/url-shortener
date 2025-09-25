import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import { redirectUrl } from "./controllers/urlController.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello from URL Shortener 🚀");
});

app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener Backend is running 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
