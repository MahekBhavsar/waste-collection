import React from "react";

export default function AddressSelect({ addresses, onSelect, onClear }) {
  return (
    <div className="address-select">
      <label htmlFor="address-dropdown">Select an address</label>
      <select 
        id="address-dropdown"
        className="gov-select"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Choose address...</option>
        {addresses.map((a, i) => (
          <option key={i} value={a.UPRN || a.uprn}>
            {a.FULL_ADDRESS || a.address}
          </option>
        ))}
      </select>
      <button className="btn-clear" onClick={onClear}>
        Clear address and start again
      </button>
    </div>
  );
}