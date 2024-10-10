import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { updateUser } from '../services/getUsers';
import { UserContext } from '../context/UserContext';

const generos = ['Masculino', 'Femenino', 'Otro'];
const roles = ['Administrador', 'Usuario'];

export default function FormEditUser({ user, onClose }) {
  const { refreshUsers } = useContext(UserContext);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    genero: '',
    rol: '',
    is_active: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono,
        genero: user.genero,
        rol: user.rol,
        is_active: user.is_active,
      });
    }
  }, [user]);

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'telefono') {
      const inputValue = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: inputValue,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: name === 'is_active' ? value === 'true' : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.telefono ||
      !formData.genero ||
      !formData.rol
    ) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (formData.telefono.length < 7) {
      setError('El teléfono debe tener al menos 7 números.');
      return;
    }

    try {
      const updatedUser = await updateUser(user.id - 1, formData);
      console.log('Usuario actualizado:', updatedUser, formData);
      onClose();
      refreshUsers();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setError('Hubo un error al actualizar el usuario.');
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
      <Typography variant='h6' component='h2' gutterBottom>
        Editar Usuario
      </Typography>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity='error'>
            {error}
          </Alert>
        </Snackbar>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Nombre'
          name='nombre'
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          required
          label='Apellido'
          name='apellido'
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          required
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          required
          label='Teléfono'
          name='telefono'
          value={formData.telefono}
          onChange={handleChange}
          fullWidth
          margin='normal'
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          error={formData.telefono.length > 0 && formData.telefono.length < 7}
          helperText={
            formData.telefono.length > 0 && formData.telefono.length < 7
              ? 'El teléfono debe tener al menos 7 números.'
              : ''
          }
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel id='genero-label'>Género</InputLabel>
          <Select
            required
            labelId='genero-label'
            name='genero'
            value={formData.genero}
            onChange={handleChange}>
            {generos.map(genero => (
              <MenuItem key={genero} value={genero.toLowerCase()}>
                {genero}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <InputLabel id='rol-label'>Rol</InputLabel>
          <Select
            required
            labelId='rol-label'
            name='rol'
            value={formData.rol}
            onChange={handleChange}>
            {roles.map(rol => (
              <MenuItem key={rol} value={rol.toLowerCase()}>
                {rol}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel id='estado-label'>Estado</FormLabel>
          <RadioGroup
            row
            aria-labelledby='estado-label'
            name='is_active'
            value={formData.is_active ? true : false}
            onChange={handleChange}>
            <FormControlLabel value={true} control={<Radio />} label='Activo' />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label='Inactivo'
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type='submit' variant='contained' color='primary'>
            Guardar
          </Button>
          <Button onClick={onClose} variant='outlined' sx={{ ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
