import React from "react";
import { Trash2 } from "lucide-react";

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
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.shortUrl} target="_blank" rel="noreferrer">
              {link.shortUrl}
            </a>
            <button onClick={() => handleDelete(link.shortUrl)} className="delete-btn">
              <Trash2 size={20} color="#6b7280" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
