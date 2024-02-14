const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();
require('dotenv').config();

const { doubleCsrfProtection } = require('../utils/csrfSetup');

let reviewMessage = '';

router.post('/post', doubleCsrfProtection, async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // 驗證該服務是否可用
  await transporter.verify();

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // 發送的對象信箱
    subject: `${req.body.username} 發送了一封信`, // 信件的主旨
    text: req.body.description, // 信件的內容
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      reviewMessage = '發送失敗';
      console.error(err);
    } else {
      reviewMessage = '發送成功';
      console.log(info);
    }
    res.redirect('review');
  });
});

router.get('/review', function (req, res) {
  res.render('contactReview', { reviewMessage });
});

module.exports = router;
