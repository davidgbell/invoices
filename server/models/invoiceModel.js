const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const invoiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date, required: true },
    user: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
