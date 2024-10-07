import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material';

export default function Dashboard() {
  return (
    <Drawer anchor='left' open={true} variant='persistent'>
      <Toolbar>
        <Box>Busqueda de productos</Box>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary='Configuración' />
        </ListItem>
      </List>
    </Drawer>
  );
}
