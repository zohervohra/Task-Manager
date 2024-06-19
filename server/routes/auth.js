const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { body, validationResult } = require('express-validator');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/createUser', async (req, res) => {
  try {
    // Check whether the user email already exists
    let testUser = await prisma.User.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (testUser) {
      return res.status(400).json({ error: 'User with this email already exists, Enter a unique email' });
    }

    // Salt, pepper, and hash
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    // Creating a new user
    let user = await prisma.User.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      },
    });

    // Creating and sending a JWT for secure authentication
    const data = {
     
        id: user.id,
    };
    console.log(data)
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);
    res.send({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal error occurred' });
  }
});

router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Please enter correct credentials' });
    }

    // Compare passwords
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Please enter correct credentials' });
    }

    // Generate JWT token
    const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
    res.send({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal error occurred' });
  }
});

module.exports = router;
