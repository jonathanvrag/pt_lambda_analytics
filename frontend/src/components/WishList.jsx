import { useState, useEffect } from 'react';
import Layout from './Layout';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getWishlist, deleteWishlistItem } from '../services/wishList';

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getWishlist();
        setWishlist(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleCopy = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('URL copiada al portapapeles:', url);
      })
      .catch((error) => {
        console.error('Error al copiar la URL:', error);
      });
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const success = await deleteWishlistItem(itemId);
      if (success) {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.id !== itemId)
        );
        setSnackbarMessage('El articulo ha sido eliminado con exito!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('El articulo no pudo ser eliminado.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al eliminar el artículo:', error);
      setSnackbarMessage('Error al eliminar el artículo.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
        <h1 style={{ padding: '0 0 10px 0' }}>Lista de deseos</h1>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography variant="body1" color="error" align="center" mt={2}>
            Error al cargar la lista de deseos. Por favor, inténtalo de nuevo
            más tarde.
          </Typography>
        )}

        {!isLoading && !error && wishlist.length > 0 && (
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              height: '73vh',
              width: '79vw',
            }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Nombre
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Imagen
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Precio
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    URL
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlist.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item.nombre.length > 130
                        ? `${item.nombre.substring(0, 130)}...`
                        : item.nombre}
                    </TableCell>
                    <TableCell>
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </TableCell>
                    <TableCell>${item.precio_venta.toLocaleString()}</TableCell>
                    <TableCell>
                      {item.url_mercadolibre.length > 20
                        ? `${item.url_mercadolibre.substring(0, 20)}...`
                        : item.url_mercadolibre}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Copiar URL">
                        <IconButton onClick={() => handleCopy(item.url_mercadolibre)}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        variant="contained"
                        sx={{ margin: '0 5px' }}
                        onClick={() => {
                          window.open(item.url_mercadolibre, '_blank');
                        }}>
                        <OpenInNewIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteItem(item.id_articulo)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!isLoading && !error && wishlist.length === 0 && (
          <Typography variant="body1" align="center" mt={2} sx={{ fontStyle: 'italic' }}>
            No hay artículos en tu lista de deseos.
          </Typography>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
}
