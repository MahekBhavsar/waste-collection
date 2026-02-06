export default function ResultCards({ collections }) {
  const getColor = (type) => {
    const t = type.toLowerCase();
    if (t.includes("garden")) return "#4ead00";
    if (t.includes("recycling")) return "#f4821f";
    if (t.includes("domestic")) return "#000000";
    if (t.includes("sharps")) return "#eeee00";
    return "#6f777b";
  };

  return (
    <div className="results-grid">
      {collections.map((item, i) => {
        const bg = getColor(item.binType);
        return (
          <div key={i} className="card" style={{ backgroundColor: bg, color: bg === "#eeee00" ? "#000" : "#fff" }}>
            <div>
              <p style={{ fontSize: '14px', margin: 0 }}>{item.binType} collection</p>
              <h2 style={{ fontSize: '24px', margin: '10px 0' }}>{item.collectionDay}</h2>
            </div>
            <div>
              <p style={{ fontSize: '13px', margin: 0 }}>followed by {item.followingDay}</p>
              <p style={{ fontSize: '12px', marginTop: '10px' }}>{item.binType} Collection</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}