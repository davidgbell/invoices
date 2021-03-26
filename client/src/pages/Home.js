import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Invoice } from '../components/Invoice';
import { EditorForm } from '../components/EditorForm';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';

export const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceEditorOpen, setInvoiceEditorOpen] = useState(false);
  const [editorName, setEditorName] = useState('');
  const [editorDate, setEditorDate] = useState('');
  const [editorAmount, setEditorAmount] = useState('');
  const [editorStatus, setEditorStatus] = useState('');
  const [editInvoiceData, setEditInvoiceData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searched, setSearched] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setInvoices([]);
    } else getInvoices();
  }, [user]);

  const getInvoices = async () => {
    const res = await Axios.get('http://localhost:5000/invoice/');
    setInvoices(res.data);
  };

  const editInvoice = invoiceData => {
    setEditInvoiceData(invoiceData);
    setEditorName(invoiceData.name);
    setEditorStatus(invoiceData.status);
    setEditorDate(invoiceData.dueDate);
    setEditorAmount(invoiceData.amount);
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

    try {
      if (!editInvoiceData) {
        await Axios.post('http://localhost:5000/invoice/', invoiceData);
      } else {
        await Axios.put(
          `http://localhost:5000/invoice/${editInvoiceData._id}`,
          invoiceData
        );
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage.toString());
        }
      }
      return;
    }

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

  const filteredInvoices =
    sortedInvoices &&
    sortedInvoices.filter(
      invoice =>
        invoice.status.toLowerCase().includes(searched) ||
        invoice.name.toLowerCase().includes(searched) ||
        invoice.dueDate.includes(searched)
    );

  return (
    <div>
      {!invoiceEditorOpen && user && (
        <div className='py-6'>
          <button onClick={() => setInvoiceEditorOpen(true)}>
            Add new invoice
          </button>
        </div>
      )}
      {invoiceEditorOpen && (
        <>
          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              clear={() => setErrorMessage(null)}
            />
          )}
          <EditorForm
            closeEditor={closeEditor}
            handleNewInvoice={handleNewInvoice}
            setEditorAmount={setEditorAmount}
            setEditorDate={setEditorDate}
            setEditorStatus={setEditorStatus}
            setEditorName={setEditorName}
            editorName={editorName}
            editorAmount={editorAmount}
            editorDate={editorDate}
            editorStatus={editorStatus}
            editInvoiceData={editInvoiceData}
          />
        </>
      )}
      {invoices && invoices.length > 0 && filteredInvoices && (
        <>
          <label htmlFor='search'>Search:</label>
          <input
            id='search'
            onChange={e => setSearched(e.target.value)}
            type='text'
            placeholder='Try a name or status 🕵️‍♀️'
          />
          <ul>
            {filteredInvoices.map(invoice => (
              <Invoice
                key={invoice._id}
                id={invoice._id}
                invoice={invoice}
                getInvoices={getInvoices}
                editInvoice={editInvoice}
                invoiceEditorOpen={invoiceEditorOpen}
              />
            ))}
          </ul>
        </>
      )}
      {user === null && (
        <>
          <div className='mb-10'>
            <h3 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900  sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 py-6'>
              Welcome
            </h3>
            <p>Invoices is a minimal invoice management application.</p>
            <p>
              Don't have an account with us?{' '}
              <Link to='/register'>Register here</Link>
            </p>
          </div>
          {/* <img src='/screen.png' alt='Screen shot of Invoices' /> */}
        </>
      )}
    </div>
  );
};
