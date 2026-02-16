import React from "react";
import Select from "react-select";

export default function AddressSelect({
  addresses = [],
  onSelect,
  onClearAll,
  onClearCollections,
}) {

  // convert addresses to react-select format
  const options = addresses.map((a) => ({
    value: a.UPRN || a.uprn,
    label: a.FULL_ADDRESS || a.address,
  }));

  const handleChange = (selected) => {
    if (!selected) {
      onClearCollections();   // user cleared selection
    } else {
      onSelect(selected.value);
    }
  };

  return (
    <div className="address-select">
      <label>Select an address</label>

      {/* SEARCHABLE DROPDOWN */}
      <Select
        options={options}
        placeholder="Choose address..."
        isClearable
        isSearchable
        className="gov-select"
        onChange={handleChange}
        noOptionsMessage={() => "No address found"}
      />

      {/* BUTTONS */}
      <div className="address-buttons">
        <button
          type="button"
          className="btn-secondary"
          onClick={onClearCollections}
        >
          Clear collections
        </button>

        <button
          type="button"
          className="btn-clear"
          onClick={onClearAll}
        >
          Reset address
        </button>
      </div>
    </div>
  );
}
