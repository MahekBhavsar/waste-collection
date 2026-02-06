import React, { useState } from "react";
import { getAddresses, getCollections } from "./api";
import PostcodeForm from "./components/PostcodeForm";
import AddressSelect from "./components/AddressSelect";
import ResultCards from "./components/ResultCards";
import "./styles.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(false);

  // Triggered by PostcodeForm to find properties
  const onSearch = async (postcode) => {
    setError(false);
    const data = await getAddresses(postcode);
    setAddresses(data.ADDRESS || []);
    setCollections([]);
  };

  // Triggered by AddressSelect to get bin dates using UPRN
  const onSelectAddress = async (uprn) => {
    if (!uprn) return;
    const data = await getCollections(uprn);
    setCollections(data);
    setError(data.length === 0);
  };

  const resetAll = () => {
    setAddresses([]);
    setCollections([]);
    setError(false);
  };

  return (
    <div className="container">
      <h1>Find out your waste collection day</h1>
      
      <div className="main-layout">
        <div className="main-content">
          <p>Check when your waste will be collected.</p>
          
          <div className="search-box">
            <PostcodeForm onSearch={onSearch} />
            
            {addresses.length > 0 && (
              <AddressSelect 
                addresses={addresses} 
                onSelect={onSelectAddress} 
                onClear={resetAll} 
              />
            )}
          </div>

          {error && (
            <div className="error-banner">
              <strong>!</strong> There are no upcoming collections scheduled for the above address.
            </div>
          )}

          <ResultCards collections={collections} />
        </div>

        <aside className="sidebar">
          <h3>Related content</h3>
          <a href="#!">Add to your calendar</a>
          <a href="#!">View and download printable schedule</a>
        </aside>
      </div>
    </div>
  );
}

export default App;