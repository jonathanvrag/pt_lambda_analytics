const API_AUTH = import.meta.env.VITE_API_AUTH;
const API_REGISTER = import.meta.env.VITE_API_REGISTER;

const login = async (email, password) => {
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

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No se encontró el token de refresco');
    }

    const response = await fetch(`${import.meta.env.VITE_API_AUTH}/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
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

const register = async userData => {
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

export default { login, refreshToken, register };
