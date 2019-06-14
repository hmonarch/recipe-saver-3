<template>
  <div id="login-register">

    <div class="main-box">
      <div class="main-header">
        <img class="logo" src="../assets/logo-255x255.png">
        <div class="logo-text">Recipe Saver</div>
      </div>
      <div class="main-body">
        
        <div class="mode-controller">
          <div :class="{ 'active': isLoginView, 'mode-controller-btn': true }" @click="changeView(true)">Log In</div>
          <div :class="{ 'active': !isLoginView, 'mode-controller-btn': true }" @click="changeView(false)">Sign Up</div>
        </div>

        <div class="main-body-padding">
          <div class="login-strategies">
            <a class="login-strategy facebook" :href="getLoginOrRegisterURL('facebook')">
              <div class="icon-block"><icon name="facebook"/></div>
              <div v-if="isLoginView" class="login-strategy-text">Log In With Facebook</div>
              <div v-else class="login-strategy-text">Sign Up With Facebook</div>
            </a>
            <a class="login-strategy google" :href="getLoginOrRegisterURL('google')">
              <div class="icon-block"><icon name="google"/></div>
              <div v-if="isLoginView" class="login-strategy-text">Log In With Google</div>
              <div v-else class="login-strategy-text">Sign Up With Google</div>
            </a>
          </div>

          <div class="or">or</div>

          <form class="email-form" @submit.prevent="loginOrRegister()">
            <div v-if="!isLoginView" class="register-fields">
              <div class="login-register-label">Register with Email</div>
              <div class="login-strategy full-name">
                <div class="icon-block"><icon name="avatar"/></div>
                <input id="full-name" class="login-input" type="text" placeholder="Full Name" v-model="fullName" @focus="addHighlight($event)" @blur="removeHighlight($event)">
              </div>
            </div>
            <div v-if="isLoginView" class="login-register-label">Log In with Email</div>
            <div class="login-strategy email">
              <div class="icon-block"><icon name="email"/></div>
              <input id="email" class="login-input" type="email" placeholder="email@example.com" v-model="email" @focus="addHighlight($event)" @blur="removeHighlight($event)">
            </div>
            <div class="login-strategy password">
              <div v-if="isLoginView" class="icon-block"><icon name="password"/></div>
              <div v-else class="icon-block"><icon name="key"/></div>
              <input id="password" class="login-input" type="password" placeholder="Password" v-model="password" @focus="addHighlight($event)" @blur="removeHighlight($event)">
            </div>
            <div v-if="!isLoginView" class="login-strategy password-confirm">
              <div class="icon-block"><icon name="password"/></div>
              <input id="password-confirm" class="login-input" type="password" placeholder="Confirm password" v-model="passwordConfirm" @focus="addHighlight($event)" @blur="removeHighlight($event)">
            </div>

            <input type="submit" hidden>
          </form>

          <div v-show="message" v-html="message" class="message"></div>
        </div>
      </div>

      <div class="main-footer" @click="loginOrRegister()">
        <span v-if="isLoginView">Log In</span>
        <span v-else>Register</span>
        <icon name="caret"/>
      </div>
    </div>

  </div>
</template>

<script>
import Icon from '@/components/Icons';
import AuthService from '@/services/AuthService';

export default {
  components: {
    Icon
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      message: '',
      fullName: '',
      isLoginView: true,
      errors: [],
      errorMessages: {
        'not-recognized': 'Sorry, we have no record for this account. If you wish to sign up please click the Sign Up tab above.',
        'login-again': 'Please login again.',
        'already-registered': 'This account is already registered. Please login',
      }
    };
  },
  methods: {
    getLoginOrRegisterURL(strategy) {
      if (this.isLoginView) return `/auth/${strategy}/${this.isLoginView ? 'login' : 'register'}`;
      else return `/auth/${strategy}/${this.isLoginView ? 'login' : 'register'}`;
    },
    changeView(isLoginView) {
      this.message = '';
      this.isLoginView = isLoginView;
    },
    addHighlight(e) {
      e.target.closest('.login-strategy').classList.add('highlight');
    },
    removeHighlight(e) {
      e.target.closest('.login-strategy').classList.remove('highlight');
    },
    isValidLogin() {
      return this.email.trim().length && this.password.trim().length;
    },
    isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    isValidRegistration() {
      this.errors = [];

      if (!this.fullName.length) this.errors.push('Name required');
      else if (this.fullName.length > 50) this.errors.push('Name must be less than 50 characters');

      if (!this.email.length) this.errors.push('Email required');
      else if (!this.isValidEmail(this.email)) this.errors.push('Invalid email');
      else if (this.email.length > 60) this.errors.push('Email must be less than 60 characters');

      if (!this.password.length) this.errors.push('Password required');
      else if (this.password !== this.passwordConfirm) this.errors.push('Passwords must match');
      else if (this.password.length < 8) this.errors.push('Password must be 8 or more characters');
      else if (this.password.length > 30) this.errors.push('Password must be 30 characters or less'); 

      if (!this.errors.length) return true;
    },
    loginOrRegister() {
      if (this.isLoginView) this.login();
      else this.register();
    },
    async login() {
      if (!this.isValidLogin()) {
        this.message = 'Invalid login - please try again.';
        return;
      }
      this.message = '';
      const response = await AuthService.login({ email: this.email.toLowerCase().trim(), password: this.password });
      console.log(response.data);
      if (response.data.errMessage) this.message = response.data.errMessage;
      if (response.data.userID) {
        this.$router.push('/recipes/all');
      }
    },
    async register() {
      if (!this.isValidRegistration()) {
        this.message = this.errors.join('<br>');
        return;
      }

      this.message = '';
      const response = await AuthService.register({ 
        fullName: this.fullName,
        email: this.email.toLowerCase().trim(),
        password: this.password
      });
      if (response.data.errMessage) this.message = response.data.errMessage;
      if (response.data.userID) {
        this.$router.push('/recipes/all');
      }
    },
    checkLoginRegError(errorStr) {
      if (this.$route.query[errorStr]) {
        this.message = this.errorMessages[this.$route.query[errorStr]];
      }
    }
  },
  mounted() {
    this.checkLoginRegError('login-reg-error');
  }
}
</script>

<style lang="scss">
#login-register {
  background: linear-gradient(45deg, #23d82f 0%,#00adff 100%);
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .main-box {
    box-sizing: border-box;
    width: 350px;
    border-radius: 6px;
    box-shadow: 0 0 40px 4px rgba(17, 17, 24, 0.47);
    text-align: center;
    z-index: 1;
    background-color: #fff;

    .main-header {
      background-color: rgba(223, 222, 222, 0.8);
      border-radius: 6px 6px 0 0;
      padding: 20px;

      .logo {
        width: 75px;
        margin-bottom: 12px;
        border: solid 1px black;
        border-radius: 50%;
      }

      .logo-text {
        font-size: 21px;
        font-weight: 600;
        font-family: 'Merriweather', serif;
      }
    }

    .main-body {
      .mode-controller {
        display: flex;
        flex-direction: row;
        align-items: stretch;

        .mode-controller-btn {
          flex: 1;
          padding: 20px 0;
          cursor: pointer;
          font-size: 16px;

          &.active {
            border-bottom: solid 1px #000;
            font-weight: bold;
          }
        }
      }

      .main-body-padding {
        padding: 20px;
      }

      .login-strategies,
      .email-form {
        .login-register-label {
          margin-bottom: 10px;
        }

        .login-strategy {
          width: 100%;
          display: block;
          height: 50x;
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
          transition: 300ms;
          border-radius: 3px;

          &:hover {
            filter: brightness(125%);
          }

          &.facebook {
            background-color: #4267b2;
            margin-bottom: 10px;

            .icon-block {
              background-color: #283f6b;
            }
          }

          &.google {
            background-color: #ea4335;

            .icon-block {
              background-color: #d02b1d;
            }
          }

          &.full-name,
          &.email,
          &.password,
          &.password-confirm {
            border: solid 1px #e5e5e5;

            &:hover {
              filter: none;
            }

            &.highlight {
              border: solid 1px #a6c8ff;
            }

            .icon-block {
              background-color: #e5e5e5;
            }
          }

          &.full-name,
          &.email,
          &.password {
            margin-bottom: 10px;
          }

          .icon-block {
            display: inline-block;
            height: 50px;
            box-sizing: border-box;
            border-radius: 3px 0 0 3px;

            .icon {
              height: 50px;
              width: 50px;
              display: flex;

              svg {
                width: 50px;
                align-self: center;
                fill: #fff;
              }
            }

            .icon--facebook svg {
              height: 21px;
            }

            .icon--google svg {
              height: 24px;
            }

            .icon--avatar svg {
              height: 22px;
              fill: #888;
            }

            .icon--email svg {
              height: 12px;

              path {
                fill: #888;
              }
            }

            .icon--key svg {
              height: 23px;
              fill: #888;
            }

            .icon--password svg {
              height: 16px;
            }
          }

          .login-strategy-text {
            padding: 0 15px;
            text-transform: uppercase;
            font-size: 14px;
            letter-spacing: 0.3px;
          }

          #full-name, 
          #email,
          #password,
          #password-confirm {
            height: 40px;
            box-sizing: border-box;
            width: 100%;
            outline: none;
            border: none;
            padding-left: 10px;
            font-size: 15px;
          }
        }
      }

      .or {
        margin: 20px 0;
        color: rgba(0,0,0,0.54);
      }
    }

    .message {
      text-align: left;
      margin-top: 10px;
      color: #fff;
      padding: 10px;
      line-height: 20px;
      background-color: #673ab7;
    }

    .main-footer {
      cursor: pointer;
      box-sizing: border-box;
      background-color: #089de3;
      color: #fff;
      padding: 30px;
      border-radius: 0 0 6px 6px;
      text-transform: uppercase;
      font-size: 18px;
      border-bottom: solid 1px #089de3;
      letter-spacing: 0.5px;

      &:hover {
        filter: brightness(120%);
      }

      .icon--caret {
        height: 15px;
        width: 15px;
        transform: rotate(270deg);
        position: relative;
        top: -2px;
        margin-left: 6px;
      }
    }
  }
}
</style>

