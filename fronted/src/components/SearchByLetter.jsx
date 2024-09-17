import React from "react";
import Divider from "@mui/material/Divider";
import CustomDropdown from "./CustomDropdown";
import api from "../services/api.js";
import useWindowSize from "../utils/useWindowSize.js";

function SearchByLetter({ onDataReceivedSearchByLetter }) {

  const isSmallScreen = useWindowSize();

  const handleSubmit = async (onSelect) => {
    const response = await api.get(`/api/words/findLetter?word=${onSelect}`);
    onDataReceivedSearchByLetter(response);
  };


  const englishLetters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  const hebrewLetters = [
    "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס",
    "ע", "פ", "צ", "ק", "ר", "ש", "ת"
  ];

  return (

    <div
      style={{
        borderRadius: "5px",
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

      <p style={{ textAlign: "center", fontSize: "1rem", fontWeight: "bold" }}>dictionary by letter:</p>

      <CustomDropdown
        label="Eng to Heb"
        options={englishLetters}
        onSelect={handleSubmit}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <CustomDropdown
        label="Heb to Eng"
        options={hebrewLetters}
        onSelect={handleSubmit}
      />

      <p style={{ textAlign: "center", fontSize: "1rem", fontWeight: "bold" }}>:מילון לפי אות</p>

    </div>
  );
}

export default SearchByLetter;