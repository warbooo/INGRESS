const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// 用户注册
router.post('/register', async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    const user = new User({ username, password, userType });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router; 