import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Navbar = () => {
  const { user, getUser } = useContext(UserContext);

  const logOut = async () => {
    await axios.get('http://localhost:5000/auth/logOut');

    await getUser();
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Invoices</Link>
        </li>
        {user === null ? (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        ) : (
          user && <button onClick={logOut}>Log out</button>
        )}
      </ul>
    </nav>
  );
};
