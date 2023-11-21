import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Footer from "./components/Footer";
import useCustomState from './utils/useState';
import api from './services/api';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const allowedTitles = ['Student', 'Teacher', 'Linguist', 'Other']

const theme = createTheme({
  palette: {
    primary: {
      main: "#F6C927",
    },
    background: { default: "#0A0A1B" },
  },
});

export default function UserTitle() {

  const { personTitle, setPersonTitle, errors, setErrors, success, setSuccess, token, setToken, emailParam, setEmailParam } = useCustomState();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const email = new URLSearchParams(location.search).get("email");
    setEmailParam(email);
    console.log("Email from register:", emailParam);
  }, [location.search]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonTitle(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: emailParam,
      title: personTitle,
    };

    try {
      const response = await api.post('/api/users/userTitle', data);

      // const receivedToken = response.data.token;
      // setToken(receivedToken);
      // setSuccess(response.data.msg);
      // setErrors("");

      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors.join(", "));
        setSuccess("");
      } else {
        console.error("Undetected error", error.message);
      }
      navigate("/");
    }
  };

  return (
    <div>
      <div
        style={{
          background: "#21213E",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#21213E",
          }}
        >
          <h1
            style={{
              color: "#ffffff",
              marginBottom: "20px",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "1em",
            }}
          >
            Please choose the <span style={{ color: "#F6C927" }}>title</span> that
            describes you:
          </h1>

          <div>
            <div style={{ background: "#F6C927", marginTop: "25px" }}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-single-checkbox-label">Select</InputLabel>
                <Select
                  labelId="demo-single-checkbox-label"
                  id="demo-single-checkbox"
                  value={personTitle}
                  onChange={handleChange}
                  input={<OutlinedInput label="Select" />}
                  MenuProps={MenuProps}
                >
                  {allowedTitles.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2, backgroundColor: "#F6C927" }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
}
