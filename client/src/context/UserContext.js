import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import domain from '../utils/domain';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const getUser = async () => {
    const userRes = await axios.get(`${domain}/auth/loggedIn`);

    setUser(userRes.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
