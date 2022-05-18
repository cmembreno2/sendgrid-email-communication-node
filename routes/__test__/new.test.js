//Packages
const request = require('supertest');
const app = require('../../app');

//Testing that the service is able to send emails when inputs are valid
it('Can send emails with valid inputs', async () => {
  return request(app)
    .post('/api/mail')
    .send({
      to: 'cmembreno@getmaya.com',
      subject: 'Testing',
      text: 'Testing',
      html: '<strong>Testing</strong>',
      //sandboxMode: true
    })
    .expect(200);
});

//Testing that the service is able to send templates when inputs are valid
it('Can send templates with valid inputs', async () => {
  return request(app)
    .post('/api/template')
    .send({
      to: 'cmembreno@getmaya.com',
      template_id: 'd-62c894bd27ac4d508cf4fff594f9ada6'
      //if using sendgrid sandbox
      //sandboxMode: true
    })
    .expect(200);
});

//Testing that the service respond with error when inputs are invalid
it('Returns a 400 status code with invalid credentials', async () => {
  return request(app)
    .post('/api/mail')
    .send({
      to: '',
      subject: '',
      text: 'some random text',
      html: '<strong>Some random html code</strong>',
      sandboxMode: true
    })
    .expect(400);
});
