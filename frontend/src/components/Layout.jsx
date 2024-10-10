import { Box, Button, Divider, Drawer } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogut = async () => {
    try {
      auth.logout();
      navigate('/');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 5fr',
      }}>
      <Drawer anchor='left' open={true} variant='persistent'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0',
            gap: '16px',
            margin: 2,
          }}>
          <Link to='/products'>
            <Button variant='contained' color='primary' sx={{ width: '150px' }}>
              Productos <ShoppingCartIcon />
            </Button>
          </Link>
          <Link to='/wishList'>
            <Button variant='contained' color='primary' sx={{ width: '150px' }}>
              Lista de deseos <FavoriteIcon />
            </Button>
          </Link>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0',
            gap: '16px',
          }}>
          <Link to='/usersList'>
            <Button variant='contained' color='primary' sx={{ width: '150px' }}>
              Usuarios <GroupIcon />
            </Button>
          </Link>
          <Link to='/'>
            <Button
              variant='contained'
              color='primary'
              sx={{ width: '150px' }}
              onClick={handleLogut}>
              Cerrar sesión <LogoutIcon />
            </Button>
          </Link>
        </Box>
      </Drawer>
      <Box
        sx={{
          padding: '4vh 5vw 4vh 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {children}
      </Box>
    </Box>
  );
}
