import auth from './auth';
const { refreshToken } = auth;

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
        try {
          const newAccessToken = await refreshToken();

          const retryResponse = await fetch(import.meta.env.VITE_API, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          if (!retryResponse.ok) {
            throw new Error(
              'Error al obtener los usuarios después del refresco'
            );
          }

          const data = await retryResponse.json();
          return data;
        } catch (refreshError) {
          console.error('Error al refrescar el token:', refreshError);
          throw refreshError;
        }
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

const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_USER_UPDATE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        id: updatedUserData.id,
        email: updatedUserData.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const updateUser = await response.json();
    return updateUser;
  } catch (error) {
    console.log('Error al actualizar el usuario:', error);
    throw error;
  }
};

export default { getUsers, updateUser };
