const db = require('../db');

const createFeedback = async (feedback) => {
  const [result] = await db.execute(
    `INSERT INTO feedbacks 
      (full_name, email, phone, purchase_date, products, feedback, rating_quality, rating_staff, rating_experience, signature) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      feedback.full_name,
      feedback.email,
      feedback.phone,
      feedback.purchase_date,
      feedback.products,
      feedback.feedback,
      feedback.rating_quality,
      feedback.rating_staff,
      feedback.rating_experience,
      feedback.signature
    ]
  );
  return result;

};

const getAllFeedbacks = async () => {
  const [rows] = await db.execute('SELECT * FROM feedbacks ORDER BY id DESC');
  return rows;
};

module.exports = { createFeedback, getAllFeedbacks };