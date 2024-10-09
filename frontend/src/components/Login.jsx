import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import auth from '../services/auth';

const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [regName, setRegName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regGender, setRegGender] = useState('');
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const loginSuccess = await auth.login(email, password);

      if (loginSuccess) {
        navigate('/usersList');
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage(loginSuccess.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleRegisterSubmit = async e => {
    e.preventDefault();

    const newUserData = {
      nombre: regName,
      apellido: regLastName,
      email: regEmail,
      telefono: regPhone,
      genero: regGender,
      password: regPassword,
    };

    if (!isValidEmail(regEmail)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Por favor, ingresa un correo electrónico válido.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const registerSuccess = await auth.register(newUserData);

      console.log('Usuario registrado exitosamente:', registerSuccess.data);
      setSnackbarSeverity('success');
      setSnackbarMessage('Usuario registrado exitosamente.');
      setSnackbarOpen(true);
      // navigate('/');
    } catch (error) {
      console.error('El registro falló:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage(error);
      setSnackbarOpen(true);
    }
  };

  const handleChangeTab = (e, newValue) => {
    setActiveTab(newValue);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#5e2129',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography variant='h1'>Login</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              height: 'auto',
              width: '30vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '36px',
              padding: '2rem',
            }}>
            <Tabs value={activeTab} onChange={handleChangeTab} centered>
              <Tab label='Login' />
              <Tab label='Registro' />
            </Tabs>
            {activeTab === 0 && (
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                  label='Correo electrónico'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  label='Contraseña'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  sx={{ marginTop: '2rem' }}>
                  Ingresar
                </Button>
              </form>
            )}

            {activeTab === 1 && (
              <form onSubmit={handleRegisterSubmit} style={{ width: '100%' }}>
                <TextField
                  label='Nombre'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                />
                <TextField
                  label='Apellido'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  value={regLastName}
                  onChange={e => setRegLastName(e.target.value)}
                />
                <TextField
                  label='Correo electrónico'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  type='email'
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                />
                <TextField
                  label='Teléfono'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                />
                <TextField
                  label='Contraseña'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  type='password'
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                />
                <FormControl fullWidth margin='normal'>
                  <InputLabel id='genero-label'>Género</InputLabel>
                  <Select
                    labelId='genero-label'
                    id='genero-select'
                    label='Género'
                    value={regGender}
                    onChange={e => setRegGender(e.target.value)}>
                    <MenuItem value='masculino'>Masculino</MenuItem>
                    <MenuItem value='femenino'>Femenino</MenuItem>
                    <MenuItem value='otro'>Otro</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  sx={{ marginTop: '2rem' }}>
                  Registrarse
                </Button>
              </form>
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
