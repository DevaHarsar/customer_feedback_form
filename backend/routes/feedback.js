const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedbacks } = require('../models/feedback');

router.post('/', async (req, res) => {
  try {
    await createFeedback(req.body);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback', details: err.message });
  }
});

router.get('/admin', async (req, res) => {
  try {
    const feedbacks = await getAllFeedbacks();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks', details: err.message });
  }
});

module.exports = router;