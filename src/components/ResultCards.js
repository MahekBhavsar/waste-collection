import React from "react";

export default function ResultCards({ collections }) {
  const getBinClass = (type) => {
    if (!type) return "bin-default";
    const name = type.toLowerCase();
    if (name.includes("recycling")) return "bin-blue";
    if (name.includes("garden")) return "bin-green";
    if (name.includes("refuse") || name.includes("waste")) return "bin-black";
    return "bin-default";
  };

  return (
    <div className="results-list">
      {collections.map((item, index) => (
        <div key={index} className={`bin-card ${getBinClass(item.serviceName)}`}>
          <div className="bin-info">
            <h3>{item.serviceName}</h3>
            <p>Next Collection: <strong>{item.nextCollectionDate}</strong></p>
          </div>
          <div className="bin-icon">🗑️</div>
        </div>
      ))}
    </div>
  );
}