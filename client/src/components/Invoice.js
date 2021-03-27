import React from 'react';
import Axios from 'axios';

export const Invoice = ({ invoice, id, getInvoices, editInvoice }) => {
  const deleteInvoice = async () => {
    if (window.confirm('Do you want to delete invoice?')) {
      await Axios.delete(`http://localhost:5000/invoice/${id}`);
    }

    getInvoices();
  };
  return (
    <>
      <li
        id={id}
        className='flex flex-col md:flex-row justify-between md:items-center flex-wrap items-start p-4 mt-6 border border-gray-200 rounded '>
        <p
          className={`${
            (invoice.status === 'paid' &&
              'text-gray-100 bg-green-500 rounded px-2 py-1 capitalize mb-4 md:mb-0') ||
            (invoice.status === 'draft' &&
              'text-gray-100 bg-gray-600  rounded px-2 py-1 capitalize mb-4 md:mb-0') ||
            (invoice.status === 'pending' &&
              'text-gray-100 bg-yellow-500  rounded px-3 py-1 capitalize mb-4 md:mb-0')
          }`}>
          {(invoice.status === 'paid' && `💵 ${invoice.status}`) ||
            (invoice.status === 'draft' && `📝 ${invoice.status}`) ||
            (invoice.status === 'pending' && `⏰ ${invoice.status}`)}
        </p>
        <time className='text-gray-500 mb-2 md:mb-0'>
          {invoice.dueDate.slice(0, 10)}
        </time>
        <p className='font-bold text-gray-900 text-lg lg:text-xl mb-2 md:mb-0'>
          £{invoice.amount}
        </p>
        <p className='mb-2 md:mb-0'>{invoice.name}</p>

        <div>
          <button className='mr-2 md:mb-0' onClick={deleteInvoice}>
            Delete
          </button>
          <button onClick={() => editInvoice(invoice)}>Edit</button>
        </div>
      </li>
    </>
  );
};
