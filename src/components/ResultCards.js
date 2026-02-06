import React from "react";

export default function ResultCards({ collections }) {
  // 1. Handle the "No Collections" state shown in your screenshot
  if (!collections || collections.length === 0) {
    return (
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>⚠️</span>
        <strong>There are no upcoming collections scheduled for the above address.</strong>
      </div>
    );
  }

  // 2. Definitive Color Map based on your requirements
  const getColor = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("garden")) return "#4ead00";   // Bright Green
    if (t.includes("recycling")) return "#f4821f"; // Orange
    if (t.includes("domestic") || t.includes("refuse") || t.includes("household")) return "#000000"; // Black
    if (t.includes("sharps") || t.includes("medical")) return "#eeee00"; // Bright Yellow
    return "#6f777b"; // Default Gray
  };

  return (
    <div className="results-grid">
      {collections.map((item, i) => {
        const title = item.binType || item.serviceName || "Waste";
        const bgColor = getColor(title);

        return (
          <div 
            key={i} 
            className="card" 
            style={{ 
              backgroundColor: bgColor,
              color: bgColor === "#eeee00" ? "#000" : "#fff" // Black text only for yellow bin
            }}
          >
            <div className="top-section">
              <p className="type-label">{title} collection</p>
              <div className="date-main">{item.collectionDay || item.nextCollectionDate}</div>
            </div>

            <div className="bottom-section">
              <div className="date-sub">followed by {item.followingDay || "next schedule"}</div>
              <p className="footer-label">{title} collection</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}