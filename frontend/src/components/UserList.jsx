import Layout from './Layout';
import getUsers from '../services/getUsers';
import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import FormEditUser from './FormEditUser';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers.getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = user => {
    setUserToEdit(user);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Layout>
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
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleEditClick(user)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Box>
          <FormEditUser user={userToEdit} onClose={handleCloseDrawer} />
        </Box>
      </Modal>
    </Layout>
  );
}
