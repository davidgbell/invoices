import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const getUser = async () => {
    const userRes = await axios.get('http://localhost:5000/auth/loggedIn');

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
