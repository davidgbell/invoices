const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    name: String,
    amount: Number,
    status: String,
    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
