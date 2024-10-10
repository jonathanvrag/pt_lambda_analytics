import Layout from './Layout';
import { useContext, useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import FormEditUser from './FormEditUser';
import { UserContext } from '../context/UserContext';

export default function UserList() {
  const { users } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEditClick = user => {
    setUserToEdit(user);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          padding: '20px',
        }}>
        <h1 style={{ padding: '0 0 10px 0' }}>Listado de usuarios</h1>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
          }}>
          <Table
            sx={{ minWidth: 650, overflowY: 'auto' }}
            aria-label='simple table'
            stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Nombre
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Apellido
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Teléfono
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Género
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Rol
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Estado
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Acciones
                </TableCell>
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
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
