import React from 'react';

export const EditorForm = ({
  handleNewInvoice,
  closeEditor,
  setEditorName,
  setEditorStatus,
  setEditorAmount,
  setEditorDate,
  editorName,
  editorDate,
  editorStatus,
  editorAmount,
  editInvoiceData,
}) => {
  const formatDate = editorDate.split('').slice(0, 10).join('');

  return (
    <div className='py-6'>
      <form onSubmit={handleNewInvoice}>
        <label htmlFor='editor-name'>Name</label>
        <input
          required
          id='editor-name'
          type='text'
          value={editorName}
          onChange={e => setEditorName(e.target.value)}
        />
        <label htmlFor='editor-date'>Due Date</label>
        <input
          value={formatDate}
          required
          id='editor-date'
          type='date'
          onChange={e => setEditorDate(e.target.value)}
        />
        <label htmlFor='editor-amount'>Amount</label>
        <input
          value={editorAmount}
          required
          id='editor-amount'
          type='number'
          onChange={e => setEditorAmount(e.target.value)}
        />
        <label htmlFor='editor-status'>Status</label>
        <select
          value={editorStatus}
          required
          id='editor-status'
          onChange={e => setEditorStatus(e.target.value)}>
          <option value=''>Status</option>
          <option value='draft'>Draft</option>
          <option value='pending'>Pending</option>
          <option value='paid'>Paid</option>
        </select>
        <div className='pt-6'>
          <button className='mx-3' type='submit'>{`${
            editInvoiceData ? 'Save' : 'Add Invoice'
          }`}</button>
          <button onClick={closeEditor}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
