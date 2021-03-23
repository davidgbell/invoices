import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Invoice } from '../components/Invoice';
import { EditorForm } from '../components/EditorForm';

export const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceEditorOpen, setInvoiceEditorOpen] = useState(false);
  const [editorName, setEditorName] = useState('');
  const [editorDate, setEditorDate] = useState('');
  const [editorAmount, setEditorAmount] = useState('');
  const [editorStatus, setEditorStatus] = useState('');
  const [editInvoiceData, setEditInvoiceData] = useState(null);

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = async () => {
    const res = await Axios.get('http://localhost:5000/invoice/');
    setInvoices(res.data);
  };

  const editInvoice = invoiceData => {
    setEditInvoiceData(invoiceData);
    setInvoiceEditorOpen(true);
  };

  const handleNewInvoice = async e => {
    e.preventDefault();

    const invoiceData = {
      name: editorName ? editorName : undefined,
      dueDate: editorDate ? editorDate : undefined,
      amount: editorAmount ? editorAmount : undefined,
      status: editorStatus ? editorStatus : undefined,
    };

    await Axios.post('http://localhost:5000/invoice/', invoiceData);

    getInvoices();
    closeEditor();
  };

  const closeEditor = () => {
    setInvoiceEditorOpen(false);

    setEditorDate('');
    setEditorName('');
    setEditorStatus('');
    setEditorAmount('');
    setEditInvoiceData(null);
  };
  const sortedInvoices =
    invoices &&
    invoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <h3>Home</h3>
      {!invoiceEditorOpen && (
        <button onClick={() => setInvoiceEditorOpen(true)}>Add new</button>
      )}
      {invoiceEditorOpen && (
        <EditorForm
          closeEditor={closeEditor}
          handleNewInvoice={handleNewInvoice}
          setEditorAmount={setEditorAmount}
          setEditorDate={setEditorDate}
          setEditorStatus={setEditorStatus}
          setEditorName={setEditorName}
        />
      )}
      {invoices && sortedInvoices && (
        <ul>
          {sortedInvoices.map(invoice => (
            <Invoice
              key={invoice._id}
              id={invoice._id}
              invoice={invoice}
              getInvoices={getInvoices}
              editInvoice={editInvoice}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
