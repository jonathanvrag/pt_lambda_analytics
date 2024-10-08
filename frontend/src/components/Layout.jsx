import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
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
          <List>
            <Link to='/products'>
              <ListItem button>
                <ListItemText primary='Productos' />
              </ListItem>
            </Link>
          </List>
        </Toolbar>
        <Divider />
        <List>
          <Link to='/usersList'>
            <ListItem button>
              <ListItemText primary='Usuarios' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      {children}
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
