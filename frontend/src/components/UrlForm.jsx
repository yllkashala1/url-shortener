import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const OPTIONS = [
  { label: "1 minute", value: 1 },
  { label: "5 minutes", value: 5 },
  { label: "30 minutes", value: 30 },
  { label: "1 hour", value: 60 },
  { label: "5 hours", value: 300 },
];

function UrlForm({ setLinks }) {
  const [url, setUrl] = useState("");
  const [expiration, setExpiration] = useState(null);
  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);

  const selected = OPTIONS.find((o) => o.value === expiration);
  const label = selected ? selected.label : "Add expiration date";

  useEffect(() => {
    const onDocClick = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    try {
      const res = await axios.post("http://localhost:4000/api/url/shorten", {
        originalUrl: url,
        expirationMinutes: expiration ?? 60,
      });
      setLinks((prev) => [
        ...prev,
        { shortUrl: res.data.shortUrl, originalUrl: url, clicks: 0 },
      ]);
      setUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  const pick = (val) => {
    setExpiration(val);
    setOpen(false);
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        className="url-input"
        type="text"
        placeholder="Paste the URL to be shortened"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="dropdown" ref={ddRef}>
        <button
          type="button"
          className="dropdown-toggle"
          onClick={() => setOpen((s) => !s)}
        >
          <span>{label}</span>
          <span className="caret">▾</span>
        </button>

        {open && (
          <div className="exp-panel" onClick={(e) => e.stopPropagation()}>
            <div className="exp-options">
              {OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.value}
                  className={"exp-btn" + (expiration === o.value ? " active" : "")}
                  onClick={() => pick(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="shorten-btn">Shorten URL</button>
    </form>
  );
}

export default UrlForm;
