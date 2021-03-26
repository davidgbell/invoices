import React from 'react';

export const ErrorMessage = ({ message, clear }) => {
  return (
    <div className='border-red-400 border-2 p-2 px-3 rounded flex justify-between items-center my-6'>
      <h3 className='font-bold text-lg text-gray-900  '>{message} 🚨</h3>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
