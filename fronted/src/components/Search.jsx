import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import api from "../services/api.js";

function Search({ onDataReceivedSearch }) {
    const [Word, setWord] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const searchWord = { original: Word };
        const response = await api.get(`/api/words/findWord?original=${searchWord.original}`);
        onDataReceivedSearch(response);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    function isHebrew(text) {
        const hebrewRegex = /[\u0590-\u05FF]/;
        return hebrewRegex.test(text);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#21213E",
            }}
        >
            <Paper
                component="form"
                sx={{
                    borderRadius: "5px",
                    m: "15px",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "500px",
                    height: "45px",
                    backgroundColor: "#F6C927",
                    "@media (max-width: 600px)": {
                        width: "90%", // Adjust width for smaller screens
                    },
                }}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        color: "#F6C927",
                        backgroundColor: "#21213E",
                    }}
                    placeholder=" Search for word"
                    inputProps={{ "aria-label": "search for word" }}
                    endAdornment={<React.Fragment />}
                    onChange={(e) => {
                        setWord(e.target.value);
                        e.target.dir = isHebrew(e.target.value) ? "rtl" : "ltr";
                    }}
                    onKeyDown={handleKeyPress}
                />

                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSubmit}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
}

export default Search;