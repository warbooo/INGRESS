const express = require('express');
const Checkpoint = require('../models/Checkpoint');
const router = express.Router();

// 获取所有打卡点
router.get('/', async (req, res) => {
  try {
    const checkpoints = await Checkpoint.find();
    res.json(checkpoints);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 用户打卡
router.post('/checkin', async (req, res) => {
  try {
    const { checkpointId, userType } = req.body;
    const checkpoint = await Checkpoint.findOne({ checkpointId });
    if (!checkpoint) return res.status(404).send('Checkpoint not found');

    checkpoint[`${userType}Checked`] = true;
    await checkpoint.save();
    res.send('Checked in');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 占领打卡点
router.post('/capture', async (req, res) => {
  try {
    const { checkpointId, username } = req.body;
    const checkpoint = await Checkpoint.findOne({ checkpointId });
    if (!checkpoint) return res.status(404).send('Checkpoint not found');

    if (checkpoint.adminChecked && checkpoint.userChecked && checkpoint.guestChecked) {
      checkpoint.owner = username;
      checkpoint.adminChecked = false;
      checkpoint.userChecked = false;
      checkpoint.guestChecked = false;
      await checkpoint.save();
      res.send('Checkpoint captured');
    } else {
      res.status(400).send('Not all users have checked in');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router; 