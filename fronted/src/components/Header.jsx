import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import { useNavigate } from "react-router-dom";

const pages = ["Tools", "Discuss", "About"];
const settings = ["Profile", "Account", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLoginClick = (action) => {
    // Navigate to the appropriate page based on the action
    if (action === "register") {
      navigate("/register");
    } else if (action === "login") {
      navigate("/login");
    }
  };

  return (
    <div>
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
            alignItems: "center",
            justifyContent: "space-between",
            height: 128,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={"/UDlogo.png"}
              alt="Logo"
              style={{
                display: { xs: "none", md: "flex" },
                marginRight: "8px", // Adjust the margin as needed
                height: "24px", // Adjust the height as needed
              }}
            />

            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 2,
                  color: "white",
                  display: { xs: "none", md: "block" },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="#" onClick={handleLoginClick}>
              הרשמה
            </a>
            <p> / </p>
            <a href="#" onClick={handleLoginClick}>
              התחברות
            </a>
          </div>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/ElchananPicture.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
