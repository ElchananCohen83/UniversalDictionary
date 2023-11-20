import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Homepage from "./Homepage";
import SignUp from "./Register";
import SingIn from "./Login"; // Import the Login component
import Dashboard from "./Dashboard";
import UserTitle from './UserTitle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F6C927'
    },
    background: { default: '#0A0A1B' }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/userTitle" element={<UserTitle />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
