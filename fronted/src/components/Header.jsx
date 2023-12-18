import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserMenu from "./UserMenu";
import api from "../services/api";

function Header() {
  const [userName, setUserName] = useState(null);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const pages = ["המילון האוניברסלי", "המדריך", "אודות"];

  const navigate = useNavigate();

  const isNarrowScreen = useMediaQuery("(max-width:900px)"); //750px

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    handleCloseNavMenu(value); // Call your custom onChange function
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await api.get(`/api/users/avatar`, { headers: { authorization: token }, });

      const data = response.data;

      setUserName(data);
      setErrors("");
      setShowSnackbar(true);
    } catch (error) {
      setSuccess("");
      setShowSnackbar(true);
    }
  };

  const handleCloseNavMenu = (event) => {
    if ((event && event.target && event.target.value && event.target.value === "המילון האוניברסלי") || event === "המילון האוניברסלי") {
      
      navigate("/dashboard");
    
    }else if ((event && event.target && event.target.value && event.target.value === "המדריך") || event === "המדריך") {
      
      navigate("/instructions");

    }else if ((event && event.target && event.target.value && event.target.value === "אודות") || event === "אודות") {
      
      navigate("/about");

    }
    setAnchorEl(null);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#F6C927" }}>
        <Container
          maxWidth={false}
          sx={{
            height: 74,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "16px",
            paddingRight: "16px",
            flexDirection: "row",
          }}
        >
          {isNarrowScreen ? (
            <div>
              <IconButton
                id="NavBar"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ mb: "5px" }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
              >
                {pages.map((page) => (
                  <MenuItem
                    sx={{ justifyContent: "center" }}
                    key={page}
                    onClick={() => handleClose(page)}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>

              <IconButton
                onClick={() => navigate("/")}
                sx={{ p: 0, ml: "20px" }}
              >
                <img
                  alt="logo"
                  src={"/UDlogo.png"}
                  style={{
                    display: "block",
                    height: "24px",
                  }}
                />
              </IconButton>
            </div>
          ) : (
            <Box>
              <IconButton onClick={() => navigate("/")} sx={{ p: 0 }}>
                <img
                  alt="logo"
                  src={"/UDlogo.png"}
                  style={{
                    display: "block",
                    height: "24px",
                    paddingRight: "40px",
                  }}
                />
              </IconButton>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  style={{
                    color: "#21213E",
                    fontSize: "20px",
                    fontWeight: "bold",
                    paddingInline: "16px",
                    textDecoration: "none",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F6C927",
                borderRadius: "15px",
                paddingLeft: "8px",
                paddingRight: "8px",
                marginLeft: isNarrowScreen ? 0 : "auto",
              }}
            >

              {userName ? (
                <>
                  {!isNarrowScreen ? (
                    <div>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          paddingInline: "4px",
                          color: "#21213E"
                        }}
                      >
                        {userName.firstName} {userName.lastName}
                      </p>
                    </div>
                  ) : null}
                  <UserMenu props={userName} />
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <a
                      href="#"
                      onClick={() => navigate("/register")}
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingInline: "4px",
                        textDecoration: "none",
                        color: "#21213E"
                      }}
                    >
                      הרשמה
                    </a>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}> / </p>
                    <a
                      href="#"
                      onClick={() => navigate("/login")}
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingInline: "4px",
                        textDecoration: "none",
                        color: "#21213E"
                      }}
                    >
                      התחברות
                    </a>
                  </div>
                </>
              )}
            </Box>

        </Container>
      </AppBar>
    </div>
  );
}

export default Header;