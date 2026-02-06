import React from "react";

export default function ResultCards({ collections }) {
  // Matches the exact colors from your reference image
  const getBinClass = (type) => {
    if (!type) return "bin-default";
    const name = type.toLowerCase();
    if (name.includes("garden")) return "bin-green";
    if (name.includes("recycling")) return "bin-orange";
    if (name.includes("domestic") || name.includes("refuse")) return "bin-black";
    if (name.includes("sharps") || name.includes("medical")) return "bin-yellow";
    return "bin-default";
  };

  return (
    <div className="results-grid">
      {collections.map((item, index) => (
        <div key={index} className={`bin-card ${getBinClass(item.serviceName)}`}>
          <div className="card-top">
            <p className="service-label">{item.serviceName}</p>
            <h2 className="collection-date">{item.nextCollectionDate || "TBA"}</h2>
          </div>
          
          <div className="card-bottom">
            <p className="follow-up">followed by {item.nextCollectionDate || "next week"}</p>
            <p className="footer-label">{item.serviceName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}