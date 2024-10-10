const API_AUTH = import.meta.env.VITE_API_AUTH;
const API_REFRESH = import.meta.env.VITE_API_AUTH_REFRESH;
const API_REGISTER = import.meta.env.VITE_API_REGISTER;

export const login = async (email, password) => {
  try {
    const response = await fetch(API_AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();

    const { access, refresh } = data;

    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    return true;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refreshTokenlocal = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No se encontró el token de refresco');
    }

    const response = await fetch(API_REFRESH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshTokenlocal }),
    });

    if (!response.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error('Error al refrescar el token');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.access);

    return data.access;
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const register = async userData => {
  try {
    const response = await fetch(API_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData);
    }

    const registeredUser = await response.json();
    return registeredUser;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};
