import * as jwtDecode from 'jwt-decode';

const addToWishlist = async productData => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Usuario no autenticado');
  }
  try {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    const url = `${import.meta.env.VITE_API_WISHLIST_POST}${userId}/`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: userId,
          nombre: productData.nombre,
          imagen: productData.image_url,
          precio_venta: productData.precio,
          url_mercadolibre: productData.url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Error al añadir el artículo a la lista de deseos'
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al añadir el artículo a la lista de deseos:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    throw error;
  }
};

export default { addToWishlist };
