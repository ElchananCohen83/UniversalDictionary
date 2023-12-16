import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import CustomDropdown from "./CustomDropdown";

function SearchByLetter({ onDataReceived }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const handleSubmit = async (onSelect) => {
    onDataReceived(onSelect);
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
      <div>
        <p style={{ textAlign: "center", fontSize: "1rem", fontWeight: "bold" }}>
          dictionary by letter:
        </p>
      </div>

      <div
        style={{
          padding: "5px",
          border: "1px solid",
          backgroundColor: "#f0e9a5",
        }}
      >
        {/* Use Webkit-specific styles to hide the scrollbar */}
        <style>
        {`
            ::-webkit-scrollbar {
                width: 5px;
            }

            ::-webkit-scrollbar-thumb {
              background-color: #888;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        }
        `}
        </style>
        <CustomDropdown
          label="Eng to Heb"
          options={englishLetters}
          onSelect={handleSubmit}
        />
      </div>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <div
        style={{
          padding: "5px",
          border: "1px solid",
          backgroundColor: "#f0e9a5",
        }}
      >
        <CustomDropdown
          label="Heb to Eng"
          options={hebrewLetters}
          onSelect={handleSubmit}
        />
      </div>

      <div>
        <p style={{ textAlign: "center", fontSize: "1rem", fontWeight: "bold" }}>
          :מילון לפי אות
        </p>
      </div>
    </div>
  );
}

export default SearchByLetter;