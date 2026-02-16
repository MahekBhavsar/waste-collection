import React, { useState, useMemo } from "react";

export default function AddressSelect({
  addresses = [],
  onSelect,
  onClearAll,
  onClearCollections,
}) {
  const [search, setSearch] = useState("");

  // filter addresses based on search text
  const filteredAddresses = useMemo(() => {
    return addresses.filter((a) =>
      (a.FULL_ADDRESS || a.address || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [addresses, search]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      onClearCollections();
    } else {
      onSelect(value);
    }
  };

  return (
    <div className="address-select">
      <label htmlFor="address-search">Search address</label>

      {/* SEARCH INPUT */}
      <input
        id="address-search"
        type="text"
        className="gov-input"
        placeholder="Type to filter address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* DROPDOWN */}
      <select
        className="gov-select"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="">Choose address...</option>

        {filteredAddresses.map((a, i) => (
          <option key={i} value={a.UPRN || a.uprn}>
            {a.FULL_ADDRESS || a.address}
          </option>
        ))}
      </select>

      {/* RESET BUTTON */}
      <button
        type="button"
        className="btn-clear"
        onClick={onClearAll}
      >
        Clear address and start again
      </button>
    </div>
  );
}
