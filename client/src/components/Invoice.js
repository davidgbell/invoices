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
        className='flex justify-between flex-wrap items-center p-4 mt-6 border border-gray-200 rounded '>
        <p
          className={`${
            (invoice.status === 'paid' &&
              'text-gray-100 bg-green-500 rounded px-2 py-1 capitalize') ||
            (invoice.status === 'draft' &&
              'text-gray-100 bg-gray-600  rounded px-2 py-1 capitalize') ||
            (invoice.status === 'pending' &&
              'text-gray-100 bg-yellow-500  rounded px-3 py-1 capitalize')
          }`}>
          {(invoice.status === 'paid' && `💵 ${invoice.status}`) ||
            (invoice.status === 'draft' && `📝 ${invoice.status}`) ||
            (invoice.status === 'pending' && `⏰ ${invoice.status}`)}
        </p>
        <time className='text-gray-500'>{invoice.dueDate.slice(0, 10)}</time>
        <p className='font-bold text-gray-900 text-lg lg:text-xl'>
          £{invoice.amount}
        </p>
        <p>{invoice.name}</p>

        <div>
          <button className='mr-2' onClick={deleteInvoice}>
            Delete
          </button>
          <button onClick={() => editInvoice(invoice)}>Edit</button>
        </div>
      </li>
    </>
  );
};
