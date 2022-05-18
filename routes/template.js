//Middleware to send a template

//Packages
const express = require('express');
const sgMail = require('../services/sendgrid');
const verificarToken = require('../middlewares/auth');
require('dotenv').config()

//Instance
const router = express.Router();

//POST to /api/template
router.post('/api/template', verificarToken, async (req, res) => {
  const { recipient, subject, email} = req.body;

  const template = {
    from: {
      email: process.env.COMPANY_EMAIL,
      name: process.env.COMPANY_NAME
    },
    personalizations : [
      {
        to: recipient,
        dynamic_template_data : {
          subject
        }
      }
    ],
    template_id : email.templateId
  };

  Object.entries(email.templateValues).forEach(([key,value])=>template.personalizations[0].dynamic_template_data[key] = value)

  try {
    await sgMail.send(template);
  } catch (err) {
    return res.status(err.code).send(err.message);
  }

  res.status(200).send({ success: true });
});

//Export Middlewares
module.exports = router;
