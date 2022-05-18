//Middleware to send a single email

//Packages
const express = require('express');
const sgMail = require('../services/sendgrid');
const verificarToken = require('../middlewares/auth');
require('dotenv').config()

//Instance
const router = express.Router();

//POST to /api/mail
router.post('/api/mail', verificarToken, async (req, res) => {
  //can intruduce sandboxMode param
  const { to, subject, text, html } = req.body;

  const msg = {
    to,
    from: {
      email: process.env.COMPANY_EMAIL,
      name: process.env.COMPANY_NAME
    },
    subject,
    text,
    html
    //mail_settings: {
      //sandbox_mode: {
        //enable: sandboxMode
      //}
    //}
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    return res.status(err.code).send(err.message);
  }

  res.status(200).send({ success: true });
});

//Export Middleware
module.exports = router;
