import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReactVirtualizedTable from "./components/VirtualizationTable";
import Search from "./components/Search";
import SearchByLetter from "./components/SearchByLetter";
import useWindowSize from "./utils/useWindowSize";

export default function Dashboard() {
  const [isWordFound, setIsWordFound] = useState(null);
  const [result, setResult] = useState(null);

  const isSmallScreen = useWindowSize();

  const handleSearchDataReceived = async (response) => {
    try {
      setResult(response.data.data);
      setIsWordFound(true);

      if (response.data.message === "Word not found") {
        setResult(response.data.data.original);
        setIsWordFound(false); // Set isSearchClicked to true when data is received
      }

    } catch (error) {
      setResult(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1, backgroundColor: "#21213E" }}>
        <div>
          <SearchByLetter
            onDataReceivedSearchByLetter={handleSearchDataReceived}
          />
        </div>
        <div>
          <Search onDataReceivedSearch={handleSearchDataReceived} />
        </div>

        <div>{isWordFound && <ReactVirtualizedTable props={result} />}</div>

        <div>
          {!isWordFound && result && (
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
