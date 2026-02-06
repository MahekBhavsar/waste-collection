import React from "react";

export default function AddressSelect({ addresses, onSelect, onClear }) {
  return (
    <div className="address-select">
      <label>Select an address</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Choose address...</option>
        {addresses.map((a, index) => (
          <option key={index} value={a.UPRN}>{a.FULL_ADDRESS}</option>
        ))}
      </select>
      <button onClick={onClear} style={{ background: "red", marginTop: "10px" }}>Clear</button>
    </div>
  );
}