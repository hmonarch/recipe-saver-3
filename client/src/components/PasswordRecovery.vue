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
        <div class="note">
          <b>Note:</b> If you login to Recipe Saver with a <b>Gmail</b> account then you may have used the "Log In With Google" method to create an account. If so, then please use that login method instead of using the "Log In with Email" form. 
        </div>
        <div class="instructions">Send password recovery email to:</div>
        <input type="text" v-model="email" class="recovery-email-input" placeholder="Your Email">
      </div>
      <div class="send-email-cta" @click="sendEmail()">Send</div>
    </div>
  </div>
</template>

<script>
import MiscService from '@/services/MiscService';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async sendEmail() {
      const response = await MiscService.sendPasswordRecovery({ email: this.email.trim() });
      console.log(response.data);
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

