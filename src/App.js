import React, { useState } from "react";
import { getAddresses, getCollections } from "./api";
import PostcodeForm from './components/PostcodeForm.js';
import AddressSelect from "./components/AddressSelect";
import ResultCards from "./components/ResultCards";
import "./styles.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (postcode) => {
    setLoading(true);
    try {
      const data = await getAddresses(postcode);
      setAddresses(data.ADDRESS || []);
      setCollections([]);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const onSelectAddress = async (uprn) => {
    if (!uprn) return;
    try {
      const data = await getCollections(uprn);
      // Ensure we always set an array to avoid mapping errors
      setCollections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Collection fetch failed", err);
      setCollections([]);
    }
  };

  return (
    <div className="container">
      <h1>Waste Collection Finder</h1>
      <div className="search-box">
        <PostcodeForm onSearch={onSearch} />
        {loading && <p className="loading-text">Searching for addresses...</p>}
        {addresses.length > 0 && (
          <AddressSelect 
            addresses={addresses} 
            onSelect={onSelectAddress} 
            onClear={() => {setAddresses([]); setCollections([]);}} 
          />
        )}
      </div>
      {/* Only show cards if there is data to prevent blank screen errors */}
      {collections.length > 0 && <ResultCards collections={collections} />}
    </div>
  );
}

export default App;