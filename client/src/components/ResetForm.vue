<template>
  <div id="reset-form" class="login-register-box">
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
        <div v-show="tokenValid" class="reset-form-body">
          <div class="your-email"><b>Email:</b><span id="user-email"> {{ userEmail }}</span></div>
          <label class="create-new">Create New Password</label>
          <form v-show="tokenValid" class="reset-form" @submit.prevent="resetPassword()">
            <input id="password" type="password" placeholder="Password">
            <input id="password-confirm" type="password" placeholder="Confirm password">
            <input type="submit" hidden>
          </form>
        </div>

        <div class="error-message">
          {{ errorMessage }}
        </div>
      </div>
      <div v-show="tokenValid" class="reset-password-cta" @click="resetPassword()">Reset Password</div>
    </div>
  </div>
</template>

<script>
import MiscService from '@/services/MiscService';

export default {
  data() {
    return {
      tokenValid: false,
      errorMessage: '',
      userEmail: '',
    };
  },
  methods: {
    async verifyToken(token) {
      const response = await MiscService.verifyToken(token);
      console.log('response', response.data);

      if (response.data && response.data.message !== 'ok') {
        this.errorMessage = response.data.message;
      } else if (response.data.message === 'ok') {
        this.tokenValid = true;
        this.userEmail = response.data.userEmail
        console.log('all good');
      }
    },
    async resetPassword() {
      console.log('resetPassword');
    }
  },
  created() {
    this.verifyToken(this.$route.params.token);
  }
}
</script>

<style lang="scss">
@import '@/styles/_login-register-box.scss';
#reset-form {
  .main-body {
    padding: 20px;
    text-align: left;
    line-height: 20px;

    .create-new {
      font-weight: bold;
      margin: 20px 0 10px 0;
      display: block;
    }

    .reset-form {
      input {
        width: 100%;
        height: 34px;
        padding: 15px 5px;
        box-sizing: border-box;

        &:first-child {
          margin-bottom: 10px;
        }
      }
    }

    .error-message {
      color: #f00;;
    }
  }

  .reset-password-cta {
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

