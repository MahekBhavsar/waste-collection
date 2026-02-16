import React from "react";

export default function AddressSelect({
  addresses = [],
  onSelect,
  onClearAll,
  onClearCollections,
}) {

  const handleChange = (e) => {
    const value = e.target.value;

    // If user selects placeholder -> clear collections only
    if (value === "") {
      onClearCollections();
    } else {
      onSelect(value);
    }
  };

  return (
    <div className="address-select">
      <label htmlFor="address-dropdown">Select an address</label>

      <select
        id="address-dropdown"
        className="gov-select"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="">Choose address...</option>

        {addresses.map((a, i) => (
          <option key={i} value={a.UPRN || a.uprn}>
            {a.FULL_ADDRESS || a.address}
          </option>
        ))}
      </select>

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
