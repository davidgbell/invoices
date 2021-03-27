const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password, passwordVerify, name } = req.body;

    // Validation

    if (!email || !password || !passwordVerify || !name) {
      return res.status(400).json({
        errorMessage: 'Enter all required fields',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage:
          'Please enter a password of at least 6 characters or more',
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: 'Please ensure both passwords match',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        errorMessage: 'User already exists with this email',
      });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // Hashing

    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie('token', token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation

    if (!email || !password) {
      return res.status(400).json({
        errorMessage: 'Enter all required fields',
      });
    }

    // get user account

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        errorMessage: 'Wrong email or password',
      });
    }

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!correctPassword) {
      return res.status(401).json({
        errorMessage: 'Wrong email or password',
      });
    }

    // create token

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie('token', token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/loggedIn', (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(null);

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);

    res.json(validatedUser.id);
  } catch (err) {
    return res.json(null);
  }
});

router.get('/logOut', (req, res) => {
  try {
    res.clearCookie('token').send();
  } catch (error) {
    return res.json(null);
  }
});

module.exports = router;
