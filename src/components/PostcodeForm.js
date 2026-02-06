import React, { useState } from "react";

export default function PostcodeForm({ onSearch }) {
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postcode.trim()) {
      onSearch(postcode);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="postcode">Enter a postcode</label>
      <p style={{ fontSize: '0.8rem', color: '#666' }}>For example SW1A 2AA</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
        <input 
          id="postcode"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="N21 3PY"
          style={{ padding: '8px', border: '1px solid #000' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
          Search
        </button>
      </form>
    </div>
  );
}