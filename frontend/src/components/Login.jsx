import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (email === 'administrator@admi.com' && password === 'admi') {
      navigate('/dashboard');
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  const handleChangeTab = (e, newValue) => {
    setActiveTab(newValue);
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
            alignItems: 'end',
          }}>
          <Box
            sx={{
              height: '90vh',
              width: '30vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderTopLeftRadius: '32px',
              borderTopRightRadius: '32px',
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
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                  label='Nombre'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  label='Apellido'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  label='Correo electrónico'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  type='email'
                />
                <TextField
                  label='Teléfono'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  label='Contraseña'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                />
                <FormControl fullWidth margin='normal'>
                  <InputLabel id='genero-label'>Género</InputLabel>
                  <Select
                    labelId='genero-label'
                    id='genero-select'
                    label='Género'>
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
    </Box>
  );
}
