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
      <ul className='flex justify-between'>
        <div>
          <li>
            <Link to='/'>Invoices</Link>
          </li>
        </div>
        <div className='flex justify-between'>
          {user === null ? (
            <>
              <li className='pr-2'>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          ) : (
            user && <button onClick={logOut}>Log out</button>
          )}
        </div>
      </ul>
    </nav>
  );
};
