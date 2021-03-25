import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { UserContext } from '../context/UserContext';

export const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [verifyRegisterPassword, setVerifyRegisterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  const register = async e => {
    e.preventDefault();

    const registerData = {
      email: registerEmail,
      password: registerPassword,
      passwordVerify: verifyRegisterPassword,
    };

    try {
      await Axios.post('http://localhost:5000/auth/', registerData);
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
      <h2>Register</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form onSubmit={register}>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          onChange={e => setRegisterEmail(e.target.value)}
          type='email'
          required
          autoComplete='on'
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          onChange={e => setRegisterPassword(e.target.value)}
          type='password'
          required
          autoComplete='on'
        />
        <label htmlFor='verify-password'>Verify Password:</label>
        <input
          id='verify-password'
          onChange={e => setVerifyRegisterPassword(e.target.value)}
          type='password'
          required
          autoComplete='on'
        />
        <button onClick={register} type='submit'>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to='login'>Login</Link>{' '}
      </p>
    </div>
  );
};
