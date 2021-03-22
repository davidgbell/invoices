const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.listen(5000, () => console.log('app running on server 5000'));

app.use('/invoice', require('./routers/invoiceRouter'));

// connect to mongo
mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) return console.error(err);
    console.log('Connected to MongoDB');
  }
);