import React from "react";
import { Trash2 } from "lucide-react";
import QRCode from "react-qr-code";

function Sidebar({ links, setLinks }) {
  const handleDelete = (shortUrl) => {
    setLinks((prev) => prev.filter((link) => link.shortUrl !== shortUrl));
  };

  return (
    <div className="sidebar">
      <img
        src="https://anchorzup.com/wp-content/uploads/2024/08/AnchorzUp-Logo_Original-Colors.svg"
        alt="AnchorzUp Logo"
        className="logo"
      />
      <h3>My shortened URLs</h3>
      <ul className="links-list">
        {links.map((link, i) => (
          <li key={i} className="link-block">
            <div className="link-row">
              <a href={link.shortUrl} target="_blank" rel="noreferrer" className="link-text">
                {link.shortUrl}
              </a>
              <button
                onClick={() => handleDelete(link.shortUrl)}
                className="delete-btn"
              >
                <Trash2 size={22} color="#6b7280" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
