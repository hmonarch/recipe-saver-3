<template>
  <div id="account">
    <Header></Header>
    <div id="account-container">
      <div class="account-left">
        <div :class=" { 'saving': imageIsSaving, 'profile-image-container': true }">
          <img id="profile-image" src="../assets/logo-255x255.png">
          <input type="file" id="profile-image-input" accept="image/*" onchange="this.value = null; return false;" hidden @input="handleImage" ref="profileImageInput">
          <div @click="triggerUpload" id="profile-image-overlay">
            <button class="new-profile-image-btn">Update Image</button>
          </div>
        </div>
      </div>
      <div class="account-right">
        <div class="account-name">Stephanie Kearney</div>
        <ul class="account-info">
          <li>
            <label>Account Type</label>
            <div class="account-info-value">Full</div>
          </li>
          <li>
            <label>You Login Via</label>
            <div class="account-info-value">Email (wcoloe@gmail.com)</div>
          </li>
          <li>
            <label>Member Since</label>
            <div class="account-info-value">1/25/19</div>
          </li>
        </ul>
      </div>

      <div id="upgrade-account">
        <a href="#">Upgrade</a>
      </div>
      <div id="delete-account">
        <a href="#">Delete Account</a>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import EventBus from '@/EventBus';
import AuthService from '@/services/AuthService';
import Icon from '@/components/Icons';

export default {
  components: {
    Header,
    Icon
  },
  data() {
    return {
      imageIsSaving: false,
    };
  },
  methods: {
    triggerUpload() {
      this.$refs.profileImageInput.click();
    },
    handleImage() {
      console.log('handleImage');
      this.imageIsSaving = true;
    }
  },
  created() {

  }
}
</script>

<style lang="scss">
#account {
  header {
    .header-inner {
      width: 100%;
      padding: 0 20px;

      #nav li.search-container {
        display: none;
      }
    }
  }

  #account-container {
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 3px 0px;
    margin: 50px auto 0 auto;
    max-width: 820px;
    padding: 40px;
    display: grid;
    align-items: center;
    grid-template-columns: 30% 1fr;
    box-sizing: border-box;
    min-height: 380px;
    position: relative;

    .account-left {
      position: relative;

      .profile-image-container:hover,
      .profile-image-container.saving {
        #profile-image-overlay {
          display: block;
        }
      }

      .profile-image-container.saving {
        #profile-image-overlay {
          background-image: url(../assets/spinner.gif);
          background-color: rgba(255, 255, 255, 0.9);
          background-repeat: no-repeat;
          background-position: center center;

          .new-profile-image-btn {
            display: none;
          }
        }
      }

      #profile-image,
      #profile-image-overlay {
        border-radius: 50%;
        width: 215px;
        height: 215px;
      }

      #profile-image-overlay {
        display: none;
        background-color: rgba(52, 51, 51, 0.67);
        position: absolute;
        top: 0;
        left: 4px;
        z-index: 5;
        cursor: pointer;

        &:hover {
          .new-profile-image-btn {
            background-color: #23d82f;
          }
        }

        .new-profile-image-btn {
          cursor: pointer;
          background-color: #089de3;
          display: inline-block;
          padding: 12px;
          font-size: 15px;
          outline: none;
          border: none;
          color: #fff;
          margin-top: 90px;
        }
      }
    }

    .account-right {
      text-align: left;
      padding-left: 70px;

      .account-name {
        font-family: 'Merriweather', serif;
        font-size: 32px;
        margin-bottom: 40px;
      }

      .account-info {
        li {
          margin-bottom: 14px;

          label {
            font-family: 'Merriweather', serif;
            line-height: 28px;
            font-weight: bold;
          }
        }
      }
    }

    #upgrade-account,
    #delete-account {
      align-self: end;
      text-decoration: underline;
      display: inline-block;

      a:hover {
        color: #000;
      }
    }


    #upgrade-account {
      text-align: left;

      a {
        color: #14aaf5;
      }
    }

    #delete-account {
      text-align: right;

      a {
        color: #898e95;
      }
    }
  }
}
</style>

