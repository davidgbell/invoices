import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import domain from '../utils/domain';

export const Navbar = () => {
  const { user, getUser } = useContext(UserContext);

  const logOut = async () => {
    await axios.get(`${domain}/auth/logOut`);

    await getUser();
  };
  return (
    <nav className='mb-6'>
      <ul className='flex justify-between'>
        <div>
          <li>
            <Link to='/'>
              <h1
                className='
              text-2xl font-extrabold leading-9 tracking-tight text-gray-900  sm:text-3xl sm:leading-10 md:text-4xl md:leading-14'>
                Invoices
              </h1>
            </Link>
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
