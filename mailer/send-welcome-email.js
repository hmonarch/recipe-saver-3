const transporter = require('./transporter');

module.exports = function sendWelcomeEmail(email) {
  transporter.sendMail(
    {
      from: '"Recipe Saver" <contact@recipesaver.me>',
      to: email,
      subject: 'Welcome to Recipe Saver!',
      html: `
        We just wanted to say thank you for signing up! To get started adding your recipes, go to your <a href="https://www.recipesaver.me/recipes">recipes collection</a> and click "New Recipe."
        <br>
        Or you can download the Recipe Saver Chrome Extension <a href="https://chrome.google.com/webstore/detail/recipe-saver-extension/opemcijjekbnjccecheklfbflnkoacai">here</a>. 
        <br><br>
        We hope you like our service and if you need any assistance, we are happy to help. You can contact us by replying to this email. Happy recipe hunting!
        <br><br>
        -Recipe Saver
      `,
    }, 
    (error, response) => {
      console.log('sendWelcomeEmail error', error);
      console.log('sendWelcomeEmail response', response);
    }
  );
}