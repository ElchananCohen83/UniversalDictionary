import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import api from "./services/api";
import ReactVirtualizedTable from "./components/VirtualizationTable";
import Search from "./components/Search";
import LetterSearch from "./components/LetterSearch";

export default function Dashboard() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [result, setResult] = useState(null);
  const [SearchByLetter, setSearchByLetter] = useState(null);
  const [wordNotFound, setWordNotFound] = useState(false);
  const [searchedWord, setSearchedWord] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [data, setData] = useState(false);


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


  const handleSearchDataReceived = async (ReqByValue) => {
    if (ReqByValue) {
      try {
        let response;
        if (!SearchByLetter) {
          response = await api.get(`/api/words/findWord?original=${ReqByValue.original}`);
        } else if (SearchByLetter) {
          response = await api.get(`/api/words/findLetter?original=${ReqByValue.original}`);
          setSearchByLetter(null)
        }

        setSuccess(response.data.message);
        setResult(response.data.data);
        setErrors("");

        if (response.data.message === "Word not found") {
          setSearchedWord(response.data.data.original);
          setWordNotFound(true);
          setIsSearchClicked(false); // Set isSearchClicked to true when data is received
        } else {
          setWordNotFound(false);
          setIsSearchClicked(true); // Set isSearchClicked to true when data is received
        }

      } catch (error) {
        setResult("");
        setErrors(error.response.data.errors.join(", "));
        setSuccess("");
      }
    } else {

      handleSearchDataReceived(data)
    }
  };

  const handleSelectLetter = (event, reason) => {
    setSearchByLetter(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1, backgroundColor: "#21213E" }}>
        <div>
          <LetterSearch
            onDataReceived={(data) => {
              setData(data);
              handleSearchDataReceived(data);
              handleSelectLetter();
            }}
          />
        </div>

        <div>
          <Search onDataReceived={handleSearchDataReceived} />
        </div>

        <div>{isSearchClicked && <ReactVirtualizedTable props={result} />}</div>

        {/* if wordNotFound */}
        <div>
          {wordNotFound && (
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
                מצטערים המילה '<span style={{ color: "red" }}>{searchedWord}</span>' לא נמצאה במילון
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

