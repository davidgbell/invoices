const router = require('express').Router();
const { json } = require('express');
const Invoice = require('../models/invoiceModel');

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, amount, status, dueDate } = req.body;

    // Validate

    if (!name || !amount || !status || !dueDate) {
      return res
        .status(400)
        .json({ errorMessage: 'Error all fields not included.' });
    }

    const newInvoice = new Invoice({
      name,
      amount,
      status,
      dueDate,
    });

    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  } catch (err) {
    res.status(500).send();
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, amount, status, dueDate } = req.body;

    const invoiceId = req.params.id;

    // Validate
    if (!name || !amount || !status || !dueDate) {
      return res
        .status(400)
        .json({ errorMessage: 'All fields must be filled.' });
    }
    if (!invoiceId) {
      return res.status(400).json({ errorMessage: 'Invoice ID not given.' });
    }
    const originalInvoice = await Invoice.findById(invoiceId);

    if (!originalInvoice) {
      return res.status(400).json({
        errorMessage: 'No invoice found with this ID.',
      });
    }
    originalInvoice.name = name;
    originalInvoice.amount = amount;
    originalInvoice.status = status;
    originalInvoice.dueDate = dueDate;

    const savedInvoice = await originalInvoice.save();

    res.json(savedInvoice);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;

    // Validate
    if (!invoiceId) {
      return res.status(400).json({
        errorMessage: 'No ID given.',
      });
    }

    const existingInvoice = await Invoice.findById(invoiceId);

    if (!existingInvoice) {
      return res.status(400).json({
        errorMessage: 'No invoice with that ID detected.',
      });
    }

    await existingInvoice.delete();

    res.json(existingInvoice);
  } catch (error) {
    res.status(400).json({ errorMessage: 'No invoice with that ID.' });
  }
});

module.exports = router;
