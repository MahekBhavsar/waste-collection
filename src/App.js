import React, { useState } from "react";
import "./styles.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [collections, setCollections] = useState([]);

  return (
    <div className="container">
      {/* Main Content Area */}
      <main>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Find out your waste collection day</h1>
        <p>Check when your waste will be collected.</p>

        <div className="search-section">
          <PostcodeForm onSearch={handleSearch} />
          {addresses.length > 0 && (
            <AddressSelect addresses={addresses} onSelect={handleSelect} />
          )}
        </div>

        {collections.length > 0 && (
          <>
            <h3 style={{ marginTop: '30px' }}>Your next collections</h3>
            <ResultCards collections={collections} />
          </>
        )}
      </main>

      {/* Sidebar - Related Content */}
      <aside className="sidebar">
        <h3>Related content</h3>
        <ul>
          <li><a href="#calendar">Add to your calendar</a></li>
          <li><a href="#print">View and download printable schedule</a></li>
        </ul>
      </aside>

      {/* Footer Navigation */}
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