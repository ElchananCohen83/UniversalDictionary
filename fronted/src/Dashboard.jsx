import * as React from "react";
import Header from ".//components/Header";
import Footer from ".//components/Footer";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TranslationResult from "./TranslationResult";
import VirtualizationTable from "./VirtualizationTable";
import { useState } from 'react';


export default function Dashboard() {
  const [translations, setTranslations] = React.useState(null);

  const [word, setWord] = useState("");

  const handleSearch = async (searchTerm) => {
    const translationsData = await fetchTranslationsFromDB(searchTerm);

    setTranslations(translationsData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      original: word,
    };

    try {
      const response = await api.post("api/words/findWord", data);
      setErrors("");
      setSuccess(response.data.message);
    } catch (error) {
      setErrors(error.response.data.message);
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
              m: "30px",
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              backgroundColor: "#F6C927",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                color: "#F6C927",
                backgroundColor: "#21213E",
              }}
              placeholder="  Search for word"
              inputProps={{ "aria-label": "  search for word" }}
              endAdornment={<React.Fragment />}
              onChange={(e) => setWord(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleSubmit}
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="#4F4A45"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </div>
        <div>
          <VirtualizationTable
          data= {data} />
        </div>
        {/* <TranslationResult translations={translations} /> */}
      </div>
      <Footer />
    </div>
  );
}
