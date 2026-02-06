import React from "react";

export default function ResultCards({ collections }) {
  // 1. Error/Empty state handling
  if (!collections || collections.length === 0) {
    return (
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <strong>⚠️ There are no upcoming collections scheduled for the above address.</strong>
      </div>
    );
  }

  // 2. Dynamic Color Mapping (Not hardcoded in the loop)
  const colors = {
    garden: "#4ead00",
    recycling: "#f4821f",
    domestic: "#000000",
    refuse: "#000000",
    sharps: "#eeee00",
    medical: "#eeee00"
  };

  return (
    <div className="results-grid">
      {collections.map((item, i) => {
        const title = item.binType || item.serviceName || "Waste";
        const typeKey = Object.keys(colors).find(key => title.toLowerCase().includes(key));
        const bgColor = colors[typeKey] || "#6f777b"; // Fallback to gray

        return (
          <div 
            key={i} 
            className="card" 
            style={{ 
              backgroundColor: bgColor, 
              color: bgColor === "#eeee00" ? "#000" : "#fff" 
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