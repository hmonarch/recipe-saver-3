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
      <div class="main-body reset-main-body">
        <div v-if="tokenValid" class="reset-form-body">
          <div class="your-email"><b>Email:</b><span id="user-email"> {{ userEmail }}</span></div>
          <label class="create-new">Create New Password</label>
          <form v-show="tokenValid" class="reset-form" @submit.prevent="resetPassword()">
            <input v-model="password" id="password" type="password" placeholder="Password">
            <input v-model="passwordConfirm" id="password-confirm" type="password" placeholder="Confirm password">
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
      password: '',
      passwordConfirm: '',
      errors: [],
    };
  },
  methods: {
    async verifyToken(token) {
      const response = await MiscService.verifyToken(token);

      if (response.data && response.data.message !== 'ok') {
        this.errorMessage = response.data.message;
      } else if (response.data.message === 'ok') {
        this.tokenValid = true;
        this.userEmail = response.data.userEmail;
      }
    },
    passwordIsValid() {
      this.errors = [];

      if (!this.password.length) this.errors.push('Password required');
      else if (this.password !== this.passwordConfirm) this.errors.push('Passwords must match');
      else if (this.password.length < 8) this.errors.push('Password must be 8 or more characters');
      else if (this.password.length > 30) this.errors.push('Password must be 30 characters or less'); 

      if (!this.errors.length) return true;
    },
    async resetPassword() {
      this.passwordIsValid();
      if (!this.passwordIsValid()) {
        this.errorMessage = this.errors.join('<br>');
        return;
      }

      this.errorMessage = '';
      const response = await MiscService.resetPassword({ token: this.$route.params.token, password: this.password });

      if (response.data.message !== 'Password changed') {
        this.errorMessage = response.data.message;
      } else {
        this.$router.push('/login?login-reg-msg=password-reset');
      }
    },

  },
  created() {
    this.verifyToken(this.$route.params.token);
  },
  beforeCreate() {
    document.body.className = 'reset-form';
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
      color: #f00;
      margin-top: 10px;
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

