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

  const handleSearchDataReceived = async (searchData) => {
    try {
      const response = await api.get(
        `/api/words/findWord?original=${searchData.original}`
      );
      setSuccess(response.data.message);
      setResult(response.data.data);
      setErrors("");
      setIsSearchClicked(true); // Set isSearchClicked to true when data is received
    } catch (error) {
      setResult("");
      setErrors(error.response.data.errors.join(", "));
      setSuccess("");
    }
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

        <div
        >
          <LetterSearch />
        </div>

        <div>{isSearchClicked && <ReactVirtualizedTable props={result} />}</div>
      </div>
      <Footer />
    </div>
  );
}