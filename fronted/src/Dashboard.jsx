import * as React from "react";
import Header from ".//components/Header";
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

export default function Dashboard() {
  const [translations, setTranslations] = React.useState(null);

  const handleSearch = async (searchTerm) => {
    const translationsData = await fetchTranslationsFromDB(searchTerm);

    setTranslations(translationsData);
  };
  return (
    <div
      style={{
        backgroundColor: "#21213E",
      }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h4" align="center" color="#F6F1EE">
          Hello, Elchanan!
        </Typography>
      </Container>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          backgroundColor: "#21213E",
        }}
      >
        <Paper
          component="form"
          sx={{
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
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
      <TranslationResult translations={translations} />
    </div>
  );
}
