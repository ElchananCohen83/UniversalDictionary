import React, { useState } from "react";
import Divider from "@mui/material/Divider";


function SearchByLetter({ onDataReceived }) {

  const [selectedHebrewLetter, setSelectedHebrewLetter] = useState("");
  const [selectedEnglishLetter, setSelectedEnglishLetter] = useState("");


  const handleSubmit = async (event) => {

    let ReqByValue;

    if (selectedHebrewLetter) {

      ReqByValue = { original: selectedHebrewLetter };
      setSelectedEnglishLetter("")
      setSelectedHebrewLetter("")

    } else if (selectedEnglishLetter) {
      ReqByValue = { original: selectedEnglishLetter };
      setSelectedHebrewLetter("")
      setSelectedEnglishLetter("")
    }

    console.log(selectedEnglishLetter, selectedHebrewLetter);
    onDataReceived(ReqByValue);
  };


  // Function to handle the change in the Hebrew to English select box
  const handleHebrewToEnglishChange = (event) => {
    setSelectedHebrewLetter(event.target.value);
  };

  // Function to handle the change in the English to Hebrew select box
  const handleEnglishToHebrewChange = (event) => {
    setSelectedEnglishLetter(event.target.value);
  };

  // Array of English letters (customize as needed)
  const englishLetters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  // Array of Hebrew letters (customize as needed)
  const hebrewLetters = Array.from({ length: 27 }, (_, index) =>
    String.fromCharCode(1488 + index)
  );


  return (
    <div
      style={{
        borderRadius: '5px',
        backgroundColor: "#F6C927",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: "20px",
        margin: "auto",
        width: "90%",
        maxWidth: "500px",
        overflowX: "auto",
      }}
    >

      <label htmlFor="hebrewToEnglish" style={{ textAlign: "center", fontSize: "1rem" }}>dictionary by letter:</label>

      <div>
        <select
          id="englishToHebrew"
          value={selectedEnglishLetter}
          onChange={handleEnglishToHebrewChange}
          onClick={() => {
            handleSubmit(); // Assuming you want to handle submit on select click
            handleSelectLetter(); // Call handleSelectLetter on click
          }}

        >
          <option value="">Eng to Heb</option>
          {englishLetters.map((letter, index) => (
            <option
              key={index}
              value={letter}
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              {letter}
            </option>
          ))}
        </select>
      </div>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <div>
        <select
          id="hebrewToEnglish"
          value={selectedHebrewLetter}
          onChange={handleHebrewToEnglishChange}
          onClick={() => {
            handleSubmit(); // Assuming you want to handle submit on select click
            handleSelectLetter(); // Call handleSelectLetter on click
          }}
        >
          <option value="" >Heb to Eng</option>
          {hebrewLetters.map((letter, index) => (
            <option
              key={index}
              value={letter}
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              {letter}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p style={{ textAlign: "center", fontSize: "1rem", fontWeight: "bold" }} >:מילון לפי אות</p>
      </div>
    </div>
  );
}

export default SearchByLetter;
