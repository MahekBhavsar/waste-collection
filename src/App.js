import React, { useState } from "react";
import { getAddresses, getCollections } from "./api";
import PostcodeForm from "./components/PostcodeForm";
import AddressSelect from "./components/AddressSelect";
import ResultCards from "./components/ResultCards";
import "./styles.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (postcode) => {
    setLoading(true);
    const data = await getAddresses(postcode);
    setAddresses(data.ADDRESS || []);
    setCollections([]);
    setLoading(false);
  };

  const onSelectAddress = async (uprn) => {
    if (!uprn) return;
    const data = await getCollections(uprn);
    setCollections(data);
  };

  return (
    <div className="container">
      <h1>Waste Collection Finder</h1>
      <div className="search-box">
        <PostcodeForm onSearch={onSearch} />
        {loading && <p>Searching...</p>}
        {addresses.length > 0 && (
          <AddressSelect 
            addresses={addresses} 
            onSelect={onSelectAddress} 
            onClear={() => {setAddresses([]); setCollections([]);}} 
          />
        )}
      </div>
      <ResultCards collections={collections} />
    </div>
  );
}

export default App;