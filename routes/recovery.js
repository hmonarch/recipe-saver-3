const transporter = require('../mailer/transporter.js');
const crypto = require('crypto');
const User = require('../models/user.js');
const validator = require('email-validator');
const bcrypt = require('bcrypt');

module.exports = function(app) {

  app.post('/api/send-password-recovery',  (req, res) => {
    console.log('/send-password-recovery');

    const { email } = req.body;

    if (!validator.validate(email)) return res.json({
      message: 'Invalid email'
    });

    crypto.randomBytes(20, (err, buf) => {
      const token = buf.toString('hex');

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
          if (error) return res.json({
            message: 'Error: The password recovery email could not be sent. Please try again.'
          });

          User.findOne({ email }, (err, user) => {
            if (!user) {
              if (email.indexOf('@gmail') > -1) {
                return res.json({
                  message: `Error: Could not find Recipe Saver account associated with ${email}. If you registered with "Log In with Google" then try logging in via that method with your Google account.`
                });
              } else {
                return res.json({
                  message: `Error: Could not find Recipe Saver account associated with ${email}.`
                });
              }
            }
            
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


  // Validate password reset token
  app.post('/api/reset', (req, res) => {
    console.log('/reset');
    User.findOne({ resetPasswordToken: req.body.token }, (err, user) => {
      if (!user) return res.json({
        message: 'User not found or password reset token is invalid. Please try again.'
      });

      const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	    user.password = hash;
	    user.resetPasswordToken = null;
	    user.resetPasswordExpires = null;

	    user.save(err => {
        if (err) return console.log(err);
	    	console.log(`Password successfully changed for ${user._id}`);
	    	res.json({
          message: 'Password changed'
        });
	    });
    });

  });

}

