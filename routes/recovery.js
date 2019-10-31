const transporter = require('../mailer/transporter.js');
const crypto = require('crypto');
const User = require('../models/user.js');
const validator = require("email-validator");

module.exports = function(app) {

  app.post('/api/send-password-recovery',  (req, res) => {
    console.log('/send-password-recovery');

    const { email } = req.body;

    if (!validator.validate(email)) return res.json({
      message: 'invalid email'
    });

    crypto.randomBytes(20, (err, buf) => {
      const token = buf.toString('hex');
      console.log('Final link', `https://${req.headers.host}/reset/${token}`);

      transporter.sendMail(
        {
          from: '"Recipe Saver" <contact@recipesaver.me>',
          to: email,
          subject: 'Recipe Saver Password Reset',
          html: `
            You are receiving this email because you (or someone else) have requested the reset of your account password.
            <br><br>
            Please click the following link to reset your Recipe Saver password:
            <br>
            https://${req.headers.host.replace('localhost:8081', 'localhost:8080')}/reset/${token}
            <br><br>
            -Recipe Saver
          `,
        }, 
        (error, response) => {
          console.log('passwordRecoveryEmail error', error);
          console.log('passwordRecoveryEmail response', response);

          if (error) return res.json({
            message: 'Email error'
          });

          User.findOne({ email }, (err, user) => {
            if (!user) return res.json({
              message: 'Email not found'
            });
            
            console.log('Saving password reset token');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 7200000; // 2 hours
            user.save(err => {
              res.json({
                message: 'Email sent'
              });
            });
            
          });
        }
      );
    
    });
  });


  // Validate password reset token
  app.get('/api/reset/:token', (req, res) => {
    console.log('/reset/:token');

    User.findOne({ resetPasswordToken: req.params.token }, (err, user) => {
      if (!user) return res.json({
        message: 'Error: The password reset token is invalid. Please double check the link sent to your email.'
      });

      if (Date.now() > user.resetPasswordExpires) {
        return res.json({
          message: 'Error: The password reset token has expired.'
        });
      }

      return res.json({
        message: 'ok',
        userEmail: user.email
      });
    });
  });

}

