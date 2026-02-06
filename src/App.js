import React, { useState } from "react";
import "./styles.css";
import PostcodeForm from "./PostcodeForm";
import AddressSelect from "./AddressSelect";
import ResultCards from "./ResultCards";
import { getAddresses, getCollections } from "./apiService";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (postcode) => {
    setLoading(true);
    const data = await getAddresses(postcode);
    setAddresses(data.addressList || []); // Adjust based on actual API key
    setCollections([]);
    setHasSearched(false);
    setLoading(false);
  };

  const handleSelect = async (uprn) => {
    const data = await getCollections(uprn);
    setCollections(data);
    setHasSearched(true);
  };

  const handleClear = () => {
    setAddresses([]);
    setCollections([]);
    setHasSearched(false);
  };

  return (
    <div className="container">
      <main className="main-content">
        <h1>Find out your waste collection day</h1>
        <p className="intro-text">Check when your waste will be collected.</p>

        <div className="search-section">
          <PostcodeForm onSearch={handleSearch} />
          
          {addresses.length > 0 && (
            <AddressSelect 
              addresses={addresses} 
              onSelect={handleSelect} 
              onClear={handleClear} 
            />
          )}
        </div>

        {/* The "No collections" message from your first image */}
        {hasSearched && collections.length === 0 && (
          <div className="status-message">
            <span className="icon">!</span>
            <p>There are no upcoming collections scheduled for the above address.</p>
          </div>
        )}

        {collections.length > 0 && (
          <>
            <h3 className="results-heading">Your next collections</h3>
            <ResultCards collections={collections} />
          </>
        )}
      </main>

      <aside className="sidebar">
        <h3>Related content</h3>
        <ul>
          <li><a href="#">Add to your calendar</a></li>
          <li><a href="#">View and download printable schedule</a></li>
        </ul>
      </aside>

      <footer className="footer-nav">
        <a href="#help">Help</a>
        <a href="#cookies">Cookies</a>
        <a href="#contact">Contact</a>
        <a href="#accessibility">Accessibility Statement</a>
        <a href="#privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default App;