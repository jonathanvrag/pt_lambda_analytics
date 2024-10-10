const getProducts = async term => {
  const url = `${import.meta.env.VITE_API_PRODUCTS_SEARCH}?query=${term}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(url);
    return data;
  } catch (error) {
    console.log('Error al obtener los productos:', error);
    return [];
  }
};

const getProductMetrics = async products => {
  const url = `${import.meta.env.VITE_API_PRODUCTS_METRICS}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articulos: products }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener las métricas de los productos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error al obtener las métricas de los productos:', error);
    throw error;
  }
};

export default { getProducts, getProductMetrics };
