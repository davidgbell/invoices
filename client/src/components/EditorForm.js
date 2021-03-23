import React from 'react';

export const EditorForm = ({
  handleNewInvoice,
  closeEditor,
  setEditorName,
  setEditorStatus,
  setEditorAmount,
  setEditorDate,
}) => {
  return (
    <div>
      <form onSubmit={handleNewInvoice}>
        <label htmlFor='editor-name'>Name</label>
        <input
          required
          id='editor-name'
          type='text'
          onChange={e => setEditorName(e.target.value)}
        />
        <label htmlFor='editor-date'>Due Date</label>
        <input
          required
          id='editor-date'
          type='date'
          onChange={e => setEditorDate(e.target.value)}
        />
        <label htmlFor='editor-amount'>Amount</label>
        <input
          required
          id='editor-amount'
          type='number'
          onChange={e => setEditorAmount(e.target.value)}
        />
        <label htmlFor='editor-status'>Status</label>
        <select
          required
          id='editor-status'
          onChange={e => setEditorStatus(e.target.value)}>
          <option value=''></option>
          <option value='draft'>Draft</option>
          <option value='pending'>Pending</option>
          <option value='paid'>Paid</option>
        </select>
        <button type='submit'>Add invoice</button>
        <button onClick={closeEditor}>Cancel</button>
      </form>
    </div>
  );
};
