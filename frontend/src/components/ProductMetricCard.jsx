import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProductMetricCard = ({ metric }) => (
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
        <Button
          sx={{ margin: '5px 0 0 0' }}
          onClick={() => {
            window.open(metric.url, '_blank');
          }}
          variant='contained'>
          <OpenInNewIcon />
        </Button>
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
);

export default ProductMetricCard;
