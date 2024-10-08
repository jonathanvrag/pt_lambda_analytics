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
      console.log(errorData)
      throw new Error(errorData);
    }

    const registeredUser = await response.json();
    return registeredUser;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

export default { login, register };
