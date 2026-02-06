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
          <div className="bin-top">
            <p className="bin-label">{item.serviceName}</p>
            <h2 className="bin-date">{item.nextCollectionDate}</h2>
          </div>
          <div className="bin-bottom">
            <p className="bin-followup">followed by {item.nextCollectionDate}</p>
            <p className="bin-footer">{item.serviceName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}