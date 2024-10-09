import {
  Box,
  Button,
  Divider,
  Drawer,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
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
      {children}
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
