import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Layout from './Layout';
import { getProducts, getProductMetrics } from '../services/products';
import ProductMetricCard from './ProductMetricCard';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductsAndMetrics = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedProducts = await getProducts(searchTerm);
      setProducts(fetchedProducts);

      if (fetchedProducts.length > 0) {
        const fetchedMetrics = await getProductMetrics(
          fetchedProducts
        );
        setMetrics(fetchedMetrics);
      } else {
        setMetrics(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (searchTerm && isMounted) {
      fetchProductsAndMetrics();
    } else {
      setProducts([]);
      setMetrics(null);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(document.getElementById('search-field').value);
    fetchProductsAndMetrics();
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCopy = url => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('URL copiada al portapapeles:', url);
      })
      .catch(error => {
        console.error('Error al copiar la URL:', error);
      });
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
        <h1>Productos</h1>

        <TextField
          id='search-field'
          label='Buscar productos'
          variant='outlined'
          fullWidth
          margin='normal'
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyDown={handleKeyDown}
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

        {!isLoading && !error && products.length > 0 && (
          <Box
            sx={{
              width: '76vw',
              height: '73vh',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '1vw',
            }}>
            <Box
              sx={{
                padding: 4,
                border: '1px solid #ccc',
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              }}>
              {metrics && metrics.articulo_menor_precio && (
                <ProductMetricCard
                  metric={{
                    titulo: 'Artículo de menor precio',
                    nombre: metrics.articulo_menor_precio.nombre,
                    vendedor: metrics.articulo_menor_precio.vendedor,
                    precio: metrics.articulo_menor_precio.precio,
                    descuento: metrics.articulo_menor_precio.descuento,
                    url: metrics.articulo_menor_precio.url,
                    image_url: metrics.articulo_menor_precio.image_url,
                  }}
                />
              )}
              {metrics && metrics.articulo_mayor_precio && (
                <ProductMetricCard
                  metric={{
                    titulo: 'Artículo de mayor precio',
                    nombre: metrics.articulo_mayor_precio.nombre,
                    vendedor: metrics.articulo_mayor_precio.vendedor,
                    precio: metrics.articulo_mayor_precio.precio,
                    descuento: metrics.articulo_mayor_precio.descuento,
                    url: metrics.articulo_mayor_precio.url,
                    image_url: metrics.articulo_mayor_precio.image_url,
                  }}
                />
              )}
              {metrics && metrics.articulo_mayor_descuento && (
                <ProductMetricCard
                  metric={{
                    titulo: 'Artículo de mayor descuento',
                    nombre: metrics.articulo_mayor_descuento.nombre,
                    vendedor: metrics.articulo_mayor_descuento.vendedor,
                    precio: metrics.articulo_mayor_descuento.precio,
                    descuento: metrics.articulo_mayor_descuento.descuento,
                    url: metrics.articulo_mayor_descuento.url,
                    image_url: metrics.articulo_mayor_descuento.image_url,
                  }}
                />
              )}
              {metrics && metrics.articulo_mejor_calificacion && (
                <ProductMetricCard
                  metric={{
                    titulo: 'Artículo mejor calificado',
                    nombre: metrics.articulo_mejor_calificacion.nombre,
                    vendedor: metrics.articulo_mejor_calificacion.vendedor,
                    precio: metrics.articulo_mejor_calificacion.precio,
                    descuento: metrics.articulo_mejor_calificacion.descuento,
                    url: metrics.articulo_mejor_calificacion.url,
                    image_url: metrics.articulo_mejor_calificacion.image_url,
                  }}
                />
              )}
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Nombre
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Precio
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Descuento
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Vendedor
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Rating
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      URL image
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      URL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.nombre}</TableCell>
                      <TableCell>${product.precio.toLocaleString()}</TableCell>
                      <TableCell>
                        {!product.descuento ? '0' : product.descuento}%
                      </TableCell>
                      <TableCell>
                        {!product.vendedor ? '---' : product.vendedor}
                      </TableCell>
                      <TableCell>
                        {!product.rating ? '---' : product.rating}
                      </TableCell>
                      <TableCell>
                        {product.image_url.length > 20
                          ? `${product.image_url.substring(0, 20)}...`
                          : product.image_url}
                        <Tooltip title='Copiar URL'>
                          <IconButton
                            onClick={() => handleCopy(product.image_url)}>
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {product.url.length > 20
                          ? `${product.url.substring(0, 20)}...`
                          : product.url}
                        <Tooltip title='Copiar URL'>
                          <IconButton onClick={() => handleCopy(product.url)}>
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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
