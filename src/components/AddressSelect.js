// components/AddressSelect.jsx
import React from "react";
import Select from "react-select";

export default function AddressSelect({
  addresses,
  value = null, // use null or object for react-select
  onChange,
  onClearAll,
  onClearCollections,
}) {
  const options = addresses.map((a) => ({
    value: a.UPRN,
    label: a.FULL_ADDRESS,
  }));

  return (
    <div className="address-select">
      <Select
        value={options.find((o) => o.value === value) || null}
        onChange={(selected) => onChange(selected ? selected.value : "")}
        options={options}
        isClearable
        placeholder="Choose address..."
      />

      <div className="address-actions" style={{ marginTop: 8 }}>
        <button type="button" onClick={onClearCollections}>
          Clear collections
        </button>
        <button type="button" onClick={onClearAll} style={{ marginLeft: 8 }}>
          Reset all
        </button>
      </div>
    </div>
  );
}
