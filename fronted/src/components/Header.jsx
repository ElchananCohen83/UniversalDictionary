import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import api from "../services/api";
import useMediaQuery from "@mui/material/useMediaQuery";

function Header() {
  const [userName, setUserName] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const pages = ["המילון האוניברסלי", "המדריך", "אודות"];


  const navigate = useNavigate();

  const isNarrowScreen = useMediaQuery("(max-width:900px)"); //750px

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await api.get(`/api/users/avatar`, {
        headers: { authorization: token },
      });

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
    }
    setAnchorElNav(null);
  };


  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#F6C927" }}
      >

        <Container
          maxWidth="xl"
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

            {isNarrowScreen ? null : (
              <>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                      paddingInline: "16px",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </>
            )}
          </Box>

          {isNarrowScreen && (
            <div>
              <select
                id="NavBar"
                onChange={handleCloseNavMenu}
                style={{ direction: "rtl", padding: "5px", border: "1px solid #ccc" }}
              >
                <option value="">Select</option>
                {pages.map((page) => (
                  <option
                    key={page}
                    value={page}
                    style={{ textAlign: "center", fontSize: "20px" }}
                  >
                    {page}
                  </option>
                ))}
              </select>
            </div>
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
              marginTop: isNarrowScreen ? "16px" : 0,
            }}
          >
            {userName ? (
              <>
                {isNarrowScreen ? (
                  <UserMenu props={userName} />
                ) : (
                  <>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingInline: "4px",
                      }}
                    >
                      {userName.firstName} {userName.lastName}
                    </p>
                    <UserMenu props={userName} />
                  </>
                )}
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


// {/* <style>
//                 {`select {
//                     /* Remove default arrow in Firefox */
//                     -moz-appearance: none;
//                     /* Remove default arrow in other browsers */
//                     -webkit-appearance: none;
//                     appearance: none;
//                     /* Add your custom styling here, like a background or border */
//                     padding: 5px;
//                     border: 1px solid #ccc;
//                   }

//                   /* Add a custom arrow background or icon */
//                   select::after {
//                     content: '\\25BC'; /* Unicode character for down arrow */
//                     font-size: 12px;
//                     color: #555;
//                     position: absolute;
//                     right: 10px;
//                     top: 50%;
//                     transform: translateY(-50%);
//                     pointer-events: none; /* Make sure the arrow doesn't interfere with clicking */
//                   }
//                 `}
//               </style> */}

// <select
//   id="NavBar"
//   onChange={handleCloseNavMenu}
//   style={{ direction: "rtl" }}
// ></select>