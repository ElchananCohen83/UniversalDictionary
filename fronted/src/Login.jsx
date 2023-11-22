import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "./components/Footer";
import api from "./services/api";
import useCustomState from "./utils/useState";
import { useNavigate } from "react-router-dom";
import { border } from "@mui/system";
import SimpleSnackbar from './components/snackbars.jsx';
import { useState } from 'react';

function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    success,
    setErrors,
    setSuccess,
  } = useCustomState();

  const [showSnackbar, setShowSnackbar] = useState(false); // Initialize showSnackbar state


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await api.post("api/users/login", data);
      const title = response.data.title;
      setSuccess(response.data.message);
      setErrors('');
      setShowSnackbar(true); // Set showSnackbar to true after successful signup
      if (title) {
        navigate('/dashboard');
      } else {
        navigate(`/userTitle?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      setErrors(error.response.data.errors.join(', '));
      setSuccess('');
      setShowSnackbar(true); // Set showSnackbar to true after successful signup
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false); // Close the snackbar when user clicks "close" or after a timeout
  };

  return (
    <div>
      <Container component="" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F6C927" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="#F6C927">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            color="#F6C927"
          >
            <TextField
              margin="normal"
              color="primary"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{
                placeholder: "Email Address",
                style: {
                  color: "#F6C927",
                  placeholder: "#FF5733",
                  background: "#21213E",
                },
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              color="primary"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{
                placeholder: "Password",
                style: {
                  color: "#F6C927",
                  placeholder: "#FF5733",
                  background: "#21213E",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox value="remember" label="Primary" color="primary" />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {showSnackbar && (
              <SimpleSnackbar
                keyProp={errors || success}
                error={errors || success}
                onClose={handleSnackbarClose}
              />
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default SignIn;
