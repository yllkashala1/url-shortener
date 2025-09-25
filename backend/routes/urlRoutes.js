import express from "express";
import { createShortUrl, redirectUrl, deleteUrl, stats } from "../controllers/urlController.js"


const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortId", redirectUrl);
router.delete("/:shortId", deleteUrl);
router.get("/stats/:shortId", stats);

export default router;
