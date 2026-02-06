import React, { useState } from "react";

export default function PostcodeForm({ onSearch }) {
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postcode.trim()) onSearch(postcode);
  };

  return (
    <div className="form-group">
      <label>Enter a postcode</label>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input 
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g. NP18 2LE"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}