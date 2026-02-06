export default function ResultCards({ collections }) {
  const getColor = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("garden")) return "#4ead00";
    if (t.includes("recycling")) return "#f4821f";
    if (t.includes("domestic") || t.includes("refuse")) return "#000000";
    if (t.includes("sharps")) return "#eeee00";
    return "#6f777b";
  };

  return (
    <div className="results-grid">
      {collections.map((item, i) => {
        const title = item.binType || item.serviceName || "Waste";
        const bg = getColor(title);
        return (
          <div key={i} className="card" style={{ backgroundColor: bg, color: bg === "#eeee00" ? "#000" : "#fff" }}>
            <div>
              <p className="type-label">{title} collection</p>
              <div className="date-main">{item.collectionDay || item.nextCollectionDate}</div>
            </div>
            <div>
              <div className="date-sub">followed by {item.followingDay || "next schedule"}</div>
              <p className="footer-label">{title} collection</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}