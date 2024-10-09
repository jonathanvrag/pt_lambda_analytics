import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import Layout from './Layout';
import prods from '../services/products';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const searchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productsData = await prods.getProducts(searchTerm);
        setProducts(productsData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [searchTerm]);

  return (
    <Layout>
      <Box>
        <h1>Productos</h1>

        <TextField
          label='Buscar'
          variant='outlined'
          fullWidth
          margin='normal'
          value={searchTerm}
          onChange={handleChange}
        />

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography variant='body1' color='error' align='center' mt={2}>
            Error al cargar los productos. Por favor, inténtalo de nuevo más
            tarde.
          </Typography>
        )}

        {!isLoading &&
          !error &&
          products.length > 0 && (
            <Box sx={{ width: '74vw', height: '75vh', display: 'flex', gap: '4vw' }}>
              <Box sx={{ p: 0, border: '1px solid #ccc' }}>
                <p>Este es un Box con información relevante.</p>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Descuento</TableCell>
                      <TableCell>Vendedor</TableCell>
                      <TableCell>rating</TableCell>
                      <TableCell>URL image</TableCell>
                      <TableCell>URL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.nombre}</TableCell>
                        <TableCell>{product.precio}</TableCell>
                        <TableCell>{product.descuento}</TableCell>
                        <TableCell>{product.vendedor}</TableCell>
                        <TableCell>{product.rating}</TableCell>
                        <TableCell>{product.image_url}</TableCell>
                        <TableCell>{product.url}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
      </Box>
    </Layout>
  );
}
