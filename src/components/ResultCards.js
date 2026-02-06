import React from "react";

export default function ResultCards({ collections }) {
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
          <div className="bin-header">
            <span>{item.serviceName}</span>
          </div>
          <div className="bin-body">
            <h2>{item.nextCollectionDate}</h2>
            <p className="follow-up">followed by {item.nextCollectionDate}</p>
          </div>
          <div className="bin-footer">
            <span>{item.serviceName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}