import { Box, Button, Divider, Drawer, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 5fr',
      }}>
      <Drawer anchor='left' open={true} variant='persistent'>
        <Toolbar>
          <Box>
            <Link to='/products'>
              <Button variant='contained' color='primary'>
                Productos
              </Button>
            </Link>
          </Box>
        </Toolbar>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0',
          }}>
          <Link to='/usersList'>
            <Button variant='contained' color='primary'>
              Usuarios
            </Button>
          </Link>
        </Box>
      </Drawer>
      <Box sx={{ padding: '4vh 10vw 4vh 0' }}>{children}</Box>
    </Box>
  );
}
