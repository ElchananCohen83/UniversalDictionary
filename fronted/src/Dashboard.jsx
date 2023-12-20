import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import api from "./services/api";
import ReactVirtualizedTable from "./components/VirtualizationTable";
import Search from "./components/Search";
import SearchByLetter from "./components/SearchByLetter";

export default function Dashboard() {
  const [isSmallScreen, setIsSmallScreen] = useState(null);
  const [isWordFound, setIsWordFound] = useState(null);
  const [result, setResult] = useState(null);
  const [SearchLetter, setSearchLetter] = useState(null);
  const [onSelect, setOnSelect] = useState(null);


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleSearchDataReceived = async (value) => {
    try {
      let response;

      if (!SearchLetter) {
        response = await api.get(`/api/words/findWord?original=${value.original}`);
      } else if (SearchLetter) {
        response = await api.get(`/api/words/findLetter?original=${value}`);
        setSearchLetter(null)
      }

      setIsWordFound(true);
      setResult(response.data.data);

      if (response.data.message === "Word not found") {
        setResult(response.data.data.original);
        setIsWordFound(false); // Set isSearchClicked to true when data is received
      }

    } catch (error) {
      setResult(null);
    }
  };

  const handleSelectLetter = async (onSelect) => {
    setSearchLetter(true);
    setOnSelect(onSelect)
  };

  useEffect(() => {
    if (SearchLetter === true) {
      handleSearchDataReceived(onSelect)
    }
  }, [SearchLetter]); // useEffect will be called whenever SearchByLetter changes


  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1, backgroundColor: "#21213E" }}>
        <div>
          <SearchByLetter
            onDataReceivedSearchByLetter = {handleSelectLetter}
          />
        </div>
        <div>
          <Search onDataReceivedSearch = {handleSearchDataReceived} />
        </div>

        <div>{isWordFound && <ReactVirtualizedTable props={result} />}</div>

        <div>
          { !isWordFound && result && (
            <div
              style={{
                borderRadius: '5px',
                backgroundColor: "#F6C927",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                margin: "auto",
                width: isSmallScreen ? "92%" : "508px",
                overflowX: "auto",
                marginTop: "15px",
              }}
            >
              <p style={{ direction: "rtl" }}>
                מצטערים המילה '<span style={{ color: "red" }}>{result}</span>' לא נמצאה במילון
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
