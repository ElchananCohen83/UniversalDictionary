import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";


function Footer() {

  return (
    <footer style={{ bottom: 0 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#F6C927",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: 74,
          }}
        >
          <p
            style={{
              color: "#21213E",
            }}
          >
            &copy; Copyright Universty Dictionary {new Date().getFullYear()}
          </p>
        </Container>
      </AppBar>
    </footer>
  );
}

export default Footer;
