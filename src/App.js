import React, { useState } from "react";
import "./styles.css";
import PostcodeForm from "./PostcodeForm";
import AddressSelect from "./AddressSelect";
import ResultCards from "./ResultCards";
import { getAddresses, getCollections } from "./api";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [noSchedule, setNoSchedule] = useState(false);

  // 🔹 POSTCODE SEARCH
  const handleSearch = async (postcode) => {
    setAddresses([]);
    setCollections([]);
    setNoSchedule(false);

    try {
      const res = await getAddresses(postcode);

      // ✅ REAL RESPONSE HANDLING
      if (res?.address && Array.isArray(res.address)) {
        setAddresses(res.address);
      } else {
        setAddresses([]);
      }
    } catch (e) {
      console.error(e);
      setAddresses([]);
    }
  };

  // 🔹 ADDRESS SELECT
  const handleSelect = async (uprn) => {
    setCollections([]);
    setNoSchedule(false);

    try {
      const data = await getCollections(uprn);

      // ✅ data IS ALREADY AN ARRAY (from backend)
      if (!Array.isArray(data) || data.length === 0) {
        setNoSchedule(true);
        return;
      }

      setCollections(data);
    } catch (e) {
      console.error(e);
      setNoSchedule(true);
    }
  };

  return (
    <>
      <div className="container">
        <main>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
            Find out your waste collection day
          </h1>
          <p>Check when your waste will be collected.</p>

          <div className="search-section">
            <PostcodeForm onSearch={handleSearch} />

            {addresses.length > 0 && (
              <AddressSelect
                addresses={addresses}
                onSelect={handleSelect}
              />
            )}
          </div>

          {/* ✅ NO SCHEDULE MESSAGE (NOW WORKS) */}
          {noSchedule && (
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>
              There are no upcoming collections scheduled for the above address.
            </p>
          )}

          {collections.length > 0 && (
            <>
              <h3 style={{ marginTop: "30px" }}>Your next collections</h3>
              <ResultCards collections={collections} />
            </>
          )}
        </main>

        <aside className="sidebar">
          <h3>Related content</h3>
          <ul>
            <li><a href="#calendar">Add to your calendar</a></li>
            <li><a href="#print">View and download printable schedule</a></li>
          </ul>
        </aside>
      </div>

      {/* ✅ FOOTER NOW ALWAYS VISIBLE */}
      <footer className="footer-nav">
        <a href="#help">Help</a>
        <a href="#cookies">Cookies</a>
        <a href="#contact">Contact</a>
        <a href="#accessibility">Accessibility Statement</a>
        <a href="#privacy">Privacy Policy</a>
      </footer>
    </>
  );
}

export default App;
