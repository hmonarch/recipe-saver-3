<template>
  <div id="login">

    <div class="login-box">
      <div class="login-header">
        <img class="login-logo" src="../assets/logo-150x150.png">
        <div class="logo-text">Recipe Saver</div>
      </div>
      <div class="login-body">
        
        <div class="mode-controller">
          <div class="mode-controller-btn active">Log In</div>
          <div class="mode-controller-btn">Sign Up</div>
        </div>

        <div class="login-body-padding">
          <div class="login-strategies">
            <a class="login-strategy facebook" href="/auth/facebook">
              <div class="icon-block"><icon name="facebook"/></div>
              <div class="login-strategy-text">Log In With Facebook</div>
            </a>
            <a class="login-strategy google" href="#">
              <div class="icon-block"><icon name="google"/></div>
              <div class="login-strategy-text">Log In With Google</div>
            </a>
          </div>

          <div class="or">or</div>

          <form class="default-login-form" @submit.prevent="login()">
            <div class="login-strategy email">
              <div class="icon-block"><icon name="email"/></div>
              <input id="email" class="login-input" type="email" placeholder="yours@example.com" v-model="email" @focus="addHighlight($event)" @blur="removeHighlight($event)">
            </div>
            <div class="login-strategy password">
              <div class="icon-block"><icon name="password"/></div>
              <input id="password" class="login-input" type="password" placeholder="your password" v-model="password" @focus="addHighlight($event)" @blur="removeHighlight($event)">
            </div>
            <input type="submit" hidden>
          </form>
        </div>
      </div>

      <div class="login-footer" @click="login()">
        <span>Log In</span>
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
    };
  },
  methods: {
    addHighlight(e) {
      e.target.closest('.login-strategy').classList.add('highlight');
    },
    removeHighlight(e) {
      e.target.closest('.login-strategy').classList.remove('highlight');
    },
    async login() {
      const response = await AuthService.login({ email: this.email.toLowerCase().trim(), password: this.password });
      console.log(response.data);
    }
  },
}
</script>

<style lang="scss">
#login {
  background: linear-gradient(45deg, #23d82f 0%,#00adff 100%);
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    box-sizing: border-box;
    width: 350px;
    border-radius: 6px;
    box-shadow: 0 0 40px 4px rgba(17, 17, 24, 0.47);
    text-align: center;
    z-index: 1;
    background-color: #fff;

    .login-header {
      background-color: rgba(223, 222, 222, 0.8);
      border-radius: 6px 6px 0 0;
      padding: 20px;

      .login-logo {
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

    .login-body {
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
          }
        }
      }

      .login-body-padding {
        padding: 20px;
      }

      .login-strategies,
      .default-login-form {
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

          &.email,
          &.password {
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

          &.email {
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

            .icon--email svg {
              height: 12px;

              path {
                fill: #888;
              }
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

          #email,
          #password {
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

    .login-footer {
      cursor: pointer;
      box-sizing: border-box;
      background-color: #089de3;
      color: #fff;
      padding: 30px;
      border-radius: 0 0 6px 6px;
      text-transform: uppercase;
      font-size: 18px;
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

