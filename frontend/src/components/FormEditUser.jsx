import { useState, useEffect } from 'react';
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
} from '@mui/material';
import getUsers from '../services/getUsers';

const generos = ['Masculino', 'Femenino', 'Otro'];
const roles = ['Administrador', 'Usuario'];

export default function FormEditUser({ user, onClose }) {
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
    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'is_active' ? checked : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const updatedUser = await getUsers.updateUser((user.id - 1), formData);
      console.log('Usuario actualizado:', updatedUser, formData);
      onClose();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
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
      <form onSubmit={handleSubmit}>
        <TextField
          label='Nombre'
          name='nombre'
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Apellido'
          name='apellido'
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Teléfono'
          name='telefono'
          value={formData.telefono}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel id='genero-label'>Género</InputLabel>
          <Select
            labelId='genero-label'
            name='genero'
            value={formData.genero}
            onChange={handleChange}>
            {generos.map(genero => (
              <MenuItem key={genero} value={genero}>
                {genero}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <InputLabel id='rol-label'>Rol</InputLabel>
          <Select
            labelId='rol-label'
            name='rol'
            value={formData.rol}
            onChange={handleChange}>
            {roles.map(rol => (
              <MenuItem key={rol} value={rol}>
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
            value={formData.is_active}
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
