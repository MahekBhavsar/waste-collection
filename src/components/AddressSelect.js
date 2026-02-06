import React from "react";

export default function AddressSelect({ addresses, onSelect, onClear }) {
  return (
    <div className="address-select" style={{ marginTop: "20px" }}>
      <label htmlFor="address">Select an address</label>
      <div style={{ marginTop: "5px" }}>
        <select 
          id="address"
          onChange={(e) => onSelect(e.target.value)}
          style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
        >
          <option value="">Choose address...</option>
          {addresses.map((a, index) => (
            <option key={index} value={a.UPRN || a.uprn}>
              {a.FULL_ADDRESS || a.address}
            </option>
          ))}
        </select>
      </div>
      <button 
        onClick={onClear} 
        style={{ background: "none", border: "none", color: "#005ea5", textDecoration: "underline", cursor: "pointer", marginTop: "10px", padding: 0 }}
      >
        Clear address and start again
      </button>
    </div>
  );
}