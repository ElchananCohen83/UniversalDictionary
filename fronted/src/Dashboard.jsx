import React, { useState } from "react";
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
  const [wordNotFound, setWorfNotFound] = useState(false);
  const [searchedWord, setSearchedWord] = useState("");

  const handleSearchDataReceived = async (ReqByValue) => {
    try {
      let response;

      if (!SearchByLetter) {
        response = await api.get(
          `/api/words/findWord?original=${ReqByValue.original}`
        );
      } else if (SearchByLetter) {
        response = await api.get(
          `/api/words/findLetter?original=${ReqByValue.original}`
        );
      }

      setSuccess(response.data.message);

      setResult(response.data.data);

      if (response.data.message === "Word not found") {
        setSearchedWord(response.data.data.original);
        setWorfNotFound(true);
      } else {
        setErrors("");
        setIsSearchClicked(true); // Set isSearchClicked to true when data is received
      }
    } catch (error) {
      setResult("");
      setErrors(error.response.data.errors.join(", "));
      setSuccess("");
    }
  };

  const handleSelectLetter = (event, reason) => {
    setSearchByLetter(true);
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          backgroundColor: "#21213E",
          height: "90vh",
        }}
      >
        <div>
          <Search onDataReceived={handleSearchDataReceived} />
        </div>

        <div>
          <LetterSearch
            onDataReceived={(data) => {
              handleSearchDataReceived(data);
              handleSelectLetter();
            }}
          />
        </div>

        <div>{isSearchClicked && <ReactVirtualizedTable props={result} />}</div>
        <div>
          {wordNotFound && (
            <div
              style={{
                margin: "auto",
                width: "90%",
                maxWidth: "500px",
                overflowX: "auto",
                marginTop: "15px",
                backgroundColor: "#F6C927",
              }}
            >
              <p>
                the word <span style={{ color: "red" }}>{searchedWord}</span> is
                not found
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}