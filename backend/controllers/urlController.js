import shortid from "shortid";

let urls = [];

export const createShortUrl = (req, res) => {
  try {
    const { originalUrl, expirationMinutes } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const shortId = shortid.generate();
    const expiration = new Date(
      Date.now() + (expirationMinutes ?? 60) * 60000
    );

    const url = { originalUrl, shortId, expiration, clicks: 0 };
    urls.push(url);

    return res.json({
      shortUrl: `${process.env.BASE_URL || "http://localhost:4000"}/${shortId}`,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectUrl = (req, res) => {
  const { shortId } = req.params;
  const url = urls.find((u) => u.shortId === shortId);

  if (!url) {
    return res.status(404).send("URL not found");
  }

  if (url.expiration && url.expiration < new Date()) {
    return res.status(410).send("Link expired");
  }

  url.clicks += 1;
  return res.redirect(url.originalUrl);
};

export const deleteUrl = (req, res) => {
  const { shortId } = req.params;
  urls = urls.filter((u) => u.shortId !== shortId);
  return res.json({ message: "URL deleted successfully" });
};

export const stats = (req, res) => {
  const { shortId } = req.params;
  const url = urls.find((u) => u.shortId === shortId);

  if (!url) {
    return res.status(404).send("URL not found");
  }

  return res.json({ clicks: url.clicks });
};
