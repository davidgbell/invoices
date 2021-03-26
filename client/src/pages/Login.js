import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ErrorMessage } from '../components/ErrorMessage';

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  const login = async e => {
    e.preventDefault();

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      await Axios.post('http://localhost:5000/auth/login', loginData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage.toString());
        }
      }
      return;
    }

    await getUser();

    history.push('/');
  };

  return (
    <div>
      <h2 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900  sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 py-6'>
        Login
      </h2>
      <form onSubmit={login}>
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            clear={() => setErrorMessage(null)}
          />
        )}
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          onChange={e => setLoginEmail(e.target.value)}
          type='email'
          required
          autoComplete='on'
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          onChange={e => setLoginPassword(e.target.value)}
          type='password'
          required
          autoComplete='on'
        />
        <button className='my-4' onClick={login} type='submit'>
          Login
        </button>
      </form>
      <p>
        Don't have an account? Create one here{' '}
        <Link to='register'>Register</Link>{' '}
      </p>
    </div>
  );
};
