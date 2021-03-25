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
      <li id={id}>
        <time>{invoice.dueDate}</time>
        <h3>{invoice.name}</h3>
        <p>{invoice.amount}</p>
        <p>{invoice.status}</p>
        <button onClick={deleteInvoice}>Delete</button>
        <button onClick={() => editInvoice(invoice)}>Edit</button>
      </li>
    </>
  );
};
