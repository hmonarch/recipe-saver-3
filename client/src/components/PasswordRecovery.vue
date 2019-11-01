<template>
  <div id="password-recovery" class="login-register-box">
    <div class="main-box">
      <div class="main-header">
        <router-link :to="{ path: '/' }" class="logo-link">
          <img class="logo" src="../assets/logo-255x255.png">
        </router-link>
        <router-link :to="{ path: '/' }" class="logo-link">
          <div class="logo-text">Recipe Saver</div>
        </router-link>
      </div>
      <div class="main-body">

        <div class="success-message">{{ successMessage }}</div>

        <form v-show="!successMessage" id="reset-form" @submit.prevent="sendEmail()">
          <div class="note">
            <b>Note:</b> If you login to Recipe Saver with a <b>Gmail</b> account then you may have used the "Log In With Google" method to create an account. If so, then please use that login method instead of using the "Log In with Email" form. 
          </div>
          <div class="instructions">Send password recovery email to:</div>
          <input type="text" v-model="email" class="recovery-email-input" placeholder="Your Email">
          <input type="submit" hidden>
        </form>

        <div class="error-message">{{ errorMessage }}</div>
      </div>
      <div v-show="!successMessage" class="send-email-cta" @click="sendEmail()">Send</div>
    </div>
  </div>
</template>

<script>
import MiscService from '@/services/MiscService';

export default {
  data() {
    return {
      email: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async sendEmail() {
      this.errorMessage = '';
      this.successMessage = '';
      const response = await MiscService.sendPasswordRecovery({ email: this.email.toLowerCase().trim() });
      
      if (response.data.message !== 'Email sent') {
        this.errorMessage = response.data.message;
      } else {
        this.successMessage = 'An email with a password reset link has been sent. Please check your spam folder and allow up to 15 minutes for the email to be delivered.';
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_login-register-box.scss';
#password-recovery {
  .main-body {
    padding: 20px;
    text-align: left;
    line-height: 20px;

    .note {
      font-size: 15px;
      margin-bottom: 20px;
    }

    .instructions {
      font-weight: bold;
      margin-bottom: 4px;
    }

    .recovery-email-input {
      width: 100%;
      height: 34px;
      padding: 15px 5px;
      box-sizing: border-box;
    }

    .error-message {
      color: #f00;
      margin-top: 10px;
    }
  }

  .send-email-cta {
    cursor: pointer;
    box-sizing: border-box;
    background-color: #089de3;
    color: #fff;
    padding: 20px;
    border-radius: 0 0 6px 6px;
    text-transform: uppercase;
    font-size: 18px;
    border-bottom: solid 1px #089de3;
    letter-spacing: 0.5px;
    font-weight: bold;

    &:hover {
      filter: brightness(120%);
    }
  }
}
</style>

