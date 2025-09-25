import React from "react";

function UrlList({ links, onDelete }) {
  return (
    <div className="url-list">
      {links.map((link, i) => (
        <div key={i} className="url-item">
          <a href={link.shortUrl} target="_blank" rel="noreferrer">
            {link.shortUrl}
          </a>
          <button onClick={() => onDelete(link.shortUrl)}>🗑</button>
        </div>
      ))}
    </div>
  );
}

export default UrlList;
