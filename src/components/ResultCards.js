import React from "react";

export default function ResultCards({ collections }) {
  if (!collections || collections.length === 0) return null;

  // Helper function to turn a bin type into a real CSS color
  const getColor = (type) => {
    if (!type) return "#6f777b"; // Default Gray
    const name = type.toLowerCase();
    if (name.includes("garden")) return "#4ead00";   // Green
    if (name.includes("recycling")) return "#f4821f"; // Orange
    if (name.includes("domestic") || name.includes("refuse")) return "#000000"; // Black
    if (name.includes("sharps") || name.includes("medical")) return "#eeee00";  // Yellow
    return "#6f777b"; // Fallback Gray
  };

  return (
    <div className="results-grid">
      {collections.map((item, i) => {
        // Use item.binColor if it exists, otherwise calculate it from binType
        const cardColor = item.binColor || getColor(item.binType || item.serviceName);
        
        // Ensure we have text even if keys are slightly different
        const displayType = item.binType || item.serviceName || "Waste";
        const day = item.collectionDay || item.nextCollectionDate || "TBC";
        const nextDay = item.followingDay || "Next Scheduled";

        return (
          <div 
            key={i} 
            className="card" 
            style={{ 
              backgroundColor: cardColor,
              color: cardColor === "#eeee00" ? "#000" : "#fff", // Black text on yellow
              padding: "20px",
              marginBottom: "10px",
              borderRadius: "4px"
            }}
          >
            <p className="type-label">{displayType} collection</p>
            <div className="date-main" style={{ fontSize: "24px", fontWeight: "bold" }}>
              {day}
            </div>
            <div className="date-sub" style={{ marginTop: "20px", opacity: 0.9 }}>
              followed by {nextDay}
            </div>
            <p className="footer-label" style={{ fontSize: "12px", marginTop: "10px" }}>
              {displayType} collection
            </p>
          </div>
        );
      })}
    </div>
  );
}