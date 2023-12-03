import React, { useState } from "react";

function SearchByLetter() {
  const [selectedHebrewLetter, setSelectedHebrewLetter] = useState("");
  const [selectedEnglishLetter, setSelectedEnglishLetter] = useState("");

  // Function to handle the change in the Hebrew to English select box
  const handleHebrewToEnglishChange = (event) => {
    setSelectedHebrewLetter(event.target.value);
  };

  // Function to handle the change in the English to Hebrew select box
  const handleEnglishToHebrewChange = (event) => {
    setSelectedEnglishLetter(event.target.value);
  };

  // Array of Hebrew letters (customize as needed)
  const hebrewLetters = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "כ",
    "ל",
    "מ",
    "נ",
    "ס",
    "ע",
    "פ",
    "צ",
    "ק",
    "ר",
    "ש",
    "ת",
  ];

  // Array of English letters (customize as needed)
  const englishLetters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  return (
    <div
      style={{
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
      <div>
        {/* <label htmlFor="hebrewToEnglish">Hebrew to English:</label> */}
        <select
          id="hebrewToEnglish"
          value={selectedHebrewLetter}
          onChange={handleHebrewToEnglishChange}
        >
          <option value="">Heb to Eng</option>
          {hebrewLetters.map((letter, index) => (
            <option key={index} value={letter}>
              {letter}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* <label htmlFor="englishToHebrew">English to Hebrew:</label> */}
        <select
          id="englishToHebrew"
          value={selectedEnglishLetter}
          onChange={handleEnglishToHebrewChange}
        >
          <option value="">Eng to Heb</option>
          {englishLetters.map((letter, index) => (
            <option key={index} value={letter}>
              {letter}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>:חיפוש לפי אות</p>
      </div>
    </div>
  );
}

export default SearchByLetter;
