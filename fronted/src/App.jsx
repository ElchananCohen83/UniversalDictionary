import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from "../src/services/api.js";
import checkToken from "./services/verifyToken.js";
import Homepage from "./Homepage";
import SignUp from "./Register.jsx";
import SingIn from "./Login.jsx";
import UserTitle from './UserTitle.jsx';
import Dashboard from "./Dashboard.jsx";
import Instructions from "./Instructions.jsx";
import About from "./About.jsx";
import RootLayout from "./RootLayout.jsx";


const theme = createTheme({
  palette: {
    primary: {
      main: '#F6C927'
    },
    background: { default: '#0A0A1B' }
  },
});


function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await checkToken();
    if (response === 200 && ( window.location.pathname === '/register' || window.location.pathname === '/login') ) {
      navigate('/dashboard');
    };
    setIsLoaded(true);
  };


  const axiosInterceptorRequest = api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');

      if (token) {
        config.headers.authorization = token;
      }
      return config;
    },
    (error) => {

      return Promise.reject(error);
    }
  );

  const axiosInterceptorResponse = api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401 && !['/register', '/login', '/', '/instructions', '/about'].includes(window.location.pathname)) {
        console.log('You are not authorized');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    fetchData();

    return () => {
      api.interceptors.request.eject(axiosInterceptorRequest);
      api.interceptors.response.eject(axiosInterceptorResponse);
    };
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      {!isLoaded ? (
        console.log('Error loading')
      ) : (
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/userTitle" element={<UserTitle />} />

          <Route element={<RootLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="instructions" element={<Instructions />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      )}
      
    </ThemeProvider>
  );
}

export default App;