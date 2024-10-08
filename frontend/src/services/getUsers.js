const getUsers = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No se encontró el token de acceso');
    }

    const response = await fetch(import.meta.env.VITE_API, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Token inválido o expirado');
      } else {
        throw new Error('Error al obtener los usuarios');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

export default getUsers;