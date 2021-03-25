import React from 'react';

export const ErrorMessage = ({ message, clear }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
