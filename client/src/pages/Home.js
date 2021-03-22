import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export const Home = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = async () => {
    const res = await Axios.get('http://localhost:5000/invoice/');
    setInvoices(res.data);
  };

  return (
    <div>
      <h3>Home</h3>
      {invoices && (
        <ul>
          {invoices.map(invoice => (
            <li>{invoice.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
