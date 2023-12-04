import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
// import { useNavigate } from "react-router-dom";

// const pages = ["Tools", "Discuss", "About"];

// const settings = ["Profile", "Account", "Logout"];

function Footer() {

  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const navigate = useNavigate();

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

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
