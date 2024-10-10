import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
  Button,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToWishlist } from '../services/wishList';

export default function ProductMetricCard({ metric }) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const handleAddToWishlist = () => {
    setIsAddedToWishlist(true);
  };

  useEffect(() => {
    if (isAddedToWishlist) {
      addToWishlist({
        nombre: metric.nombre,
        image_url: metric.image_url,
        precio: metric.precio,
        url: metric.url,
      })
        .then(response => {
          console.log('Artículo añadido a la lista de deseos:', response);
          setSnackbarMessage('Artículo añadido a la lista de deseos');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch(error => {
          console.error('Error al añadir a la lista de deseos:', error);
          setWishlistError(error);
          setSnackbarMessage('Error al añadir a la lista de deseos');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        })
        .finally(() => {
          setIsAddingToWishlist(false);
          setIsAddedToWishlist(false);
        });
    }
  }, [isAddedToWishlist, metric]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (wishlistError) {
      console.error('Error en el useEffect:', wishlistError);
    }
  }, [wishlistError]);

  return (
    <Box>
      <Card sx={{ width: 375, margin: '0 0 1vh 0' }}>
        <CardContent sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <Box>
            <Typography variant='body1' component='div'>
              <i>{metric.titulo}</i>
            </Typography>
            <Typography variant='body2'>
              <b>{metric.nombre}</b>
            </Typography>
            <Typography variant='body2'>
              <b>Vendedor:</b> {!metric.vendedor ? '---' : metric.vendedor}
            </Typography>
            <Typography variant='body2'>
              <b>Precio:</b> ${metric.precio.toLocaleString()}
            </Typography>
            <Typography variant='body2'>
              <b>Descuento:</b> {!metric.descuento ? '0' : metric.descuento}%
            </Typography>
            <Typography variant='body2'>
              <b>Rating:</b> {!metric.rating ? '---' : metric.rating}
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button
                sx={{ margin: '5px 0 0 0' }}
                onClick={() => {
                  window.open(metric.url, '_blank');
                }}
                variant='contained'>
                <OpenInNewIcon />
              </Button>
              <Button
                sx={{ margin: '5px 0 0 0' }}
                variant='contained'
                color='error'
                onClick={handleAddToWishlist}
                disabled={isAddingToWishlist}>
                {isAddingToWishlist ? 'Añadiendo...' : <FavoriteIcon />}
              </Button>
            </Box>
          </Box>
          <CardMedia
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <img
              src={metric.image_url}
              alt={metric.nombre}
              style={{
                width: '50%',
                height: '50%',
                objectFit: 'cover',
              }}
            />
          </CardMedia>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
