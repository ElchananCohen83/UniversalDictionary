import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import api from "../services/api";


function Header() {

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const pages = ["אודות", "המדריך", "המילון האוניברסלי"];


  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken')

      const response = await api.get(`/api/users/avatar`, { headers: { authorization: token, }, });

      const data = response.data

      setUserName(data);
      console.log('userName', userName, data);
      // setSuccess(response.data.message);
      setErrors("");
      setShowSnackbar(true);
    } catch (error) {
      // setErrors(error.response.data.errors.join(", "));
      setSuccess("");
      setShowSnackbar(true);
    }
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = (page) => {
    if (page === 'המילון האוניברסלי') {
      navigate('/dashboard');
    }
    setAnchorElNav(null);
  };

  useEffect(() => {
    // Call the handleSubmit function when the component mounts
    handleSubmit();
  }, []);

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
            height: 74,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "16px", // Add left padding to the container
            paddingRight: "16px", // Add right padding to the container
          }}
        >
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
                style={{ color: "black", fontSize: "20px", fontWeight: "bold", paddingInline: "16px", textDecoration: "none" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fad757",
              borderRadius: "15px",
              paddingLeft: "8px",
              paddingRight: "8px",
              marginLeft: "auto",
            }}
          >
            {userName ? (
              <p style={{ fontSize: "20px", fontWeight: "bold", paddingInline: "4px" }}>
                {userName.firstName} {userName.lastName}
              </p>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <a
                  href="#" onClick={() => navigate("/register")}
                  style={{ fontSize: "20px", fontWeight: "bold", paddingInline: "4px", textDecoration: "none" }}
                >
                  הרשמה
                </a>
                <p
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                > / </p>
                <a
                  href="#" onClick={() => navigate("/login")}
                  style={{ fontSize: "20px", fontWeight: "bold", paddingInline: "4px", textDecoration: "none" }}
                >
                  התחברות
                </a>
              </div>
            )}
            <UserMenu props={userName} />
          </Box>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
