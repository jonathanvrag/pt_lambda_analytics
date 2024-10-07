import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (email === 'administrator@admi.com' && password === 'admi') {
      navigate('/dashboard');
    } else {
      console.log('Credenciales incorrectas');
    }
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
            <Typography variant='h5' gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
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
                onClick={handleSubmit}
                variant='contained'
                color='primary'
                fullWidth
                sx={{ marginTop: '2rem' }}>
                Ingresar
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
