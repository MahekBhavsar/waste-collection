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
      <label htmlFor="postcode-input">Enter a postcode</label>
      <p className="example-text">For example SW1A 2AA</p>
      <form className="input-row" onSubmit={handleSubmit}>
        <input 
          id="postcode-input"
          type="text" 
          value={postcode} 
          onChange={(e) => setPostcode(e.target.value)} 
          placeholder="N21 3PY"
          className="gov-input"
        />
        <button className="btn-search" type="submit">Search</button>
      </form>
    </div>
  );
}