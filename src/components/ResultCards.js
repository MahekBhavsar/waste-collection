import React from "react";

export default function ResultCards({ collections }) {
  if (!collections || collections.length === 0) return null;

  const getColor = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("garden")) return "#4ead00";
    if (t.includes("recycling")) return "#f4821f";
    if (t.includes("domestic") || t.includes("refuse")) return "#000000";
    return "#6f777b"; // Default gray
  };

  return (
    <div className="results-grid">
      {collections.map((item, i) => (
        <div key={i} className="card" style={{ backgroundColor: item.binColor || getColor(item.binType || item.serviceName) }}>
          <p className="type-label">{item.binType || item.serviceName} collection</p>
          <div className="date-main">{item.collectionDay || item.nextCollectionDate}</div>
          <div className="date-sub">followed by {item.followingDay || "next schedule"}</div>
          <p className="footer-label">{item.binType || item.serviceName} collection</p>
        </div>
      ))}
    </div>
  );
}