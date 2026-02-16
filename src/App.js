import React, { useState } from "react";
import { getAddresses, getCollections } from "./api";
import PostcodeForm from "./components/PostcodeForm";
import AddressSelect from "./components/AddressSelect";
import ResultCards from "./components/ResultCards";
import "./styles.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedUPRN, setSelectedUPRN] = useState("");

  const [postcodeError, setPostcodeError] = useState("");
  const [collectionError, setCollectionError] = useState(false);
  const [loading, setLoading] = useState(false);

  // SEARCH POSTCODE
  const onSearch = async (postcode) => {
    if (!postcode) return;

    setLoading(true);
    setPostcodeError("");
    setCollectionError(false);
    setAddresses([]);
    setCollections([]);
    setSelectedUPRN("");

    try {
      const data = await getAddresses(postcode);
      const result = data?.ADDRESS || [];

      if (result.length === 0) {
        setPostcodeError("No addresses found for this postcode");
      } else {
        setAddresses(result);
      }
    } catch {
      setPostcodeError("Unable to find postcode. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // SELECT ADDRESS
  const onSelectAddress = async (uprn) => {
    if (!uprn) return;

    setLoading(true);
    setCollectionError(false);
    setCollections([]);

    try {
      const data = await getCollections(uprn);
      setCollections(data || []);
      setCollectionError(!data || data.length === 0);
    } catch {
      setCollectionError(true);
    } finally {
      setLoading(false);
    }
  };

  // CLEAR ONLY COLLECTIONS
  const clearCollections = () => {
    setCollections([]);
    setCollectionError(false);
    setSelectedUPRN("");
  };

  // RESET ALL
  const resetAll = () => {
    setAddresses([]);
    setCollections([]);
    setSelectedUPRN("");
    setPostcodeError("");
    setCollectionError(false);
  };

  return (
    <div className="container">
      <div className="main-layout">

        <main className="main-content">
          <h1 className="gov-h1">Find out your waste collection day</h1>
          <p className="intro-text">Check when your waste will be collected.</p>

          <div className="search-box">
            <PostcodeForm onSearch={onSearch} error={postcodeError} />

            {addresses.length > 0 && (
              <AddressSelect
                addresses={addresses}
                value={selectedUPRN}
                onChange={(uprn) => {
                  setSelectedUPRN(uprn);

                  if (!uprn) {
                    clearCollections();
                  } else {
                    onSelectAddress(uprn);
                  }
                }}
                onClearAll={resetAll}
                onClearCollections={clearCollections}
              />
            )}
          </div>

          {loading && <div className="loading">Loading...</div>}

          {collectionError && !loading && (
            <div className="status-message">
              <div className="status-icon">!</div>
              <p>There are no upcoming collections scheduled for this address.</p>
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
