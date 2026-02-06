import React from "react";

export default function ResultCards({ collections }) {
  // Check if data exists at all
  if (!collections || collections.length === 0) {
    return (
      <div style={{ padding: "20px", color: "#666" }}>
        No collections found for this address.
      </div>
    );
  }

  // LOG THE DATA: Open your browser console (F12) to see this!
  console.log("Data received in ResultCards:", collections);

  return (
    <div className="results-grid">
      {collections.map((item, i) => {
        // Fallback logic in case the API uses different names
        const type = item.binType || item.serviceName || "Waste";
        const color = item.binColor || "#6f777b"; // Gray if color is missing
        const day = item.collectionDay || item.nextCollectionDate || "Unknown Date";
        const following = item.followingDay || "Not available";

        return (
          <div key={i} className="card" style={{ backgroundColor: color }}>
            <div className="top-section">
              <p className="type-label">{type} collection</p>
              <div className="date-main">{day}</div>
            </div>

            <div className="bottom-section">
              <div className="date-sub">followed by {following}</div>
              <p className="footer-label">{type} collection</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}