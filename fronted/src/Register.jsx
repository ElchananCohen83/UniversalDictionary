import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import api from './services/api';
import useCustomState from './utils/useState.jsx';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const { firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, errors, success, setErrors, setSuccess } = useCustomState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await api.post('/api/users/register', data);
      setSuccess(response.data.message)
      setErrors('')

      navigate(`/userTitle?email=${encodeURIComponent(email)}`);


    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {

        setErrors(error.response.data.errors.join(', '));
        setSuccess('');
      } else {
        console.error('Undetected error', error.message);
      }
    }

  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#F6C927' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color='#F6C927'>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} color='#F6C927'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  inputProps={{
                    placeholder: "First Name",
                    style: { color: '#F6C927', placeholder: 'primary', background: '#21213E' }
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  inputProps={{
                    placeholder: "Last Name",
                    style: { color: '#F6C927', placeholder: 'pramery', background: '#21213E' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{
                    placeholder: "Email Address",
                    style: { color: '#F6C927', placeholder: 'pramery', background: '#21213E' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{
                    placeholder: "Password",
                    style: { color: '#F6C927', placeholder: 'pramery', background: '#21213E' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" label="Primary" color={'primary'} />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Typography component="p" variant="p" color="error">
              {errors}
            </Typography>
            <Typography component="p" variant="p" color="green">
              {success}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default SignUp;
