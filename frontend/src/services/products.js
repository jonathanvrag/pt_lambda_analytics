const getProducts = async term => {
  const url = `${import.meta.env.VITE_API_PRODUCTS_SEARCH}?query=${term}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(url)
    return data;
  } catch (error) {
    console.log('Error al obtener los productos:', error);
    return [];
  }
};

export default {getProducts};
