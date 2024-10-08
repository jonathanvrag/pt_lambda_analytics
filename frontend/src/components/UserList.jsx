import Layout from './Layout';
import getUsers from '../services/getUsers';
import { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        // console.log('Lista de usuarios: ', usersData)
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Layout>
      {' '}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='left'>Nombre</TableCell>
              <TableCell align='left'>Apellido</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='left'>Teléfono</TableCell>
              <TableCell align='left'>Género</TableCell>
              <TableCell align='left'>Rol</TableCell>
              <TableCell align='left'>Estado</TableCell>
              <TableCell align='left'>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {user.id}
                </TableCell>
                <TableCell align='left'>{user.nombre}</TableCell>
                <TableCell align='left'>{user.apellido}</TableCell>
                <TableCell align='left'>{user.email}</TableCell>
                <TableCell align='left'>{user.telefono}</TableCell>
                <TableCell align='left'>{user.genero}</TableCell>
                <TableCell align='left'>{user.rol}</TableCell>
                <TableCell align='left'>
                  {user.is_active ? 'Activo' : 'Inactivo'}
                </TableCell>
                <TableCell align='left'>
                  <Button variant='contained' color='primary'>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
