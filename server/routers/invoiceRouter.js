const router = require('express').Router();
const { json } = require('express');
const Invoice = require('../models/invoiceModel');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const token = req.cookies.token;

    const invoices = await Invoice.find({ user: req.user });
    res.json(invoices);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', auth, async (req, res) => {
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
      user: req.user,
    });

    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  } catch (err) {
    res.status(500).send();
  }
});

router.put('/:id', auth, async (req, res) => {
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
    if (originalInvoice.user.toString() !== req.user) {
      return res.status(401).json({ errorMessage: 'Unauthorized' });
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

router.delete('/:id', auth, async (req, res) => {
  try {
    const invoiceId = req.params.id;

    // Validate
    if (!invoiceId) {
      return res.status(400).json({
        errorMessage: 'No ID given.',
      });
    }

    const existingInvoice = await Invoice.findById(invoiceId);

    if (existingInvoice.user.toString() !== req.user) {
      return res.status(401).json({ errorMessage: 'Unauthorised' });
    }

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
