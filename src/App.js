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
  const [hasSelected, setHasSelected] = useState(false);

  const onSearch = async (postcode) => {
    setError(false);
    setHasSelected(false);
    const data = await getAddresses(postcode);
    setAddresses(data.ADDRESS || []);
    setCollections([]);
  };

  const onSelectAddress = async (uprn) => {
    if (!uprn) return;
    const data = await getCollections(uprn);
    const results = data || [];
    setCollections(results);
    setHasSelected(true);
    setError(results.length === 0);
  };

  const resetAll = () => {
    setAddresses([]);
    setCollections([]);
    setError(false);
    setHasSelected(false);
  };

  return (
    <div className="container">
      <div className="main-layout">
        <main className="main-content">
          <h1>Find out your waste collection day</h1>
          <p className="intro-text">Check when your waste will be collected.</p>
          
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

          {error && hasSelected && (
            <div className="status-message">
              <div className="status-icon">!</div>
              <p>There are no upcoming collections scheduled for the above address.</p>
            </div>
          )}

          {collections.length > 0 && (
            <div className="results-container">
              <h3 className="results-heading">Your next collections</h3>
              <ResultCards collections={collections} />
            </div>
          )}
        </main>

        <aside className="sidebar">
          <div className="sidebar-border"></div>
          <h3>Related content</h3>
          <ul>
            <li><a href="#!">Add to your calendar</a></li>
            <li><a href="#!">View and download printable schedule</a></li>
          </ul>
        </aside>
      </div>

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