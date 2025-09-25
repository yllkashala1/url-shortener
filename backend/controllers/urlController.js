import Url from "../models/Url.js";
import shortid from "shortid";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, expirationMinutes } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const shortId = shortid.generate();
    const expiration = new Date(
      Date.now() + (expirationMinutes ? expirationMinutes : 60) * 60000
    );

    const url = new Url({ originalUrl, shortId, expiration });
    await url.save();

    return res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    if (url.expiration && url.expiration < new Date()) {
      return res.status(410).send("Link expired");
    }

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    await Url.findOneAndDelete({ shortId });
    return res.json({ message: "URL deleted successfully" });
  } catch (err) {
    return res.status(500).send("Error deleting URL");
  }
};

export const stats = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    return res.json({ clicks: url.clicks });
  } catch (err) {
    return res.status(500).send("Error retrieving stats");
  }
};
