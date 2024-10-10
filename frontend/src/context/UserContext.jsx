import { createContext, useState, useEffect } from 'react';
import { getUsers } from '../services/getUsers';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  const refreshUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error al refrescar la lista de usuarios:', error);
    }
  };

  return (
    <UserContext.Provider value={{ users, refreshUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
