import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ label, options, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };


  return (
    <div ref={dropdownRef}>
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          padding: "5px",
          border: "1px solid",
          backgroundColor: "#f0e9a5",
        }}>
        {label}
      </div>

      {isDropdownOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            cursor: "pointer",
            position: "absolute",
            zIndex: 9999,
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
            maxHeight: "300px", // Set the maximum height as needed
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          {/* Use Webkit-specific styles to hide the scrollbar */}
          <style>
            {`
                ::-webkit-scrollbar {
                  width: 0 !important;
                }
              `}
          </style>

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

export default CustomDropdown;