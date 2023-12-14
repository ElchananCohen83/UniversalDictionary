import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function SearchByLetter({ onDataReceived }) {
  const [selectedHebrewLetter, setSelectedHebrewLetter] = useState(null);
  const [selectedEnglishLetter, setSelectedEnglishLetter] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

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

  const handleSubmit = async (selectedValue) => {

      const ReqByValue = { original: selectedValue };
      setSelectedEnglishLetter(null);
      setSelectedHebrewLetter(null);

    onDataReceived(ReqByValue);
  };

  // const handleSelectLetter = () => {
  //   // Your logic for handling select letter
  // };

  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
    handleSubmit(selectedValue);
    // handleSelectLetter();
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

      <div>
        <CustomDropdown
          label="Eng to Heb"
          options={englishLetters}
          selectedValue={selectedEnglishLetter}
          onSelect={handleSelect}
        />
      </div>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <div>
        <CustomDropdown
          label="Heb to Eng"
          options={hebrewLetters}
          selectedValue={selectedHebrewLetter}
          onSelect={handleSelect}
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

const CustomDropdown = ({ label, options, selectedValue, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        {label}
      </div>

      {isDropdownOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            cursor: "pointer",
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#fff",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchByLetter;