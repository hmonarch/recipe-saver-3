<template>
  <header class="non-app">
    <router-link :to="{ path: '/' }" class="header-logo logo">
      <img class="logo-image" src="../assets/logo-255x255.png">
      <span class="logo-text">Recipe Saver</span>
    </router-link>

    <div class="burger-menu" @click="openMenu()">
      <Icon name="burger"/>
    </div>

    <nav :class=" { 'open': menuOpen }">
      <div class="nav-close" @click="closeMenu()">
        <Icon name="close"/>
      </div>
      <div class="nav-item">
        <router-link :to="{ path: '/recipes' }">My Recipes</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{ path: '/extension' }">Chrome Extension</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{ path: '/account' }">Account</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{ path: '/login' }">Login / Register</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import Icon from '@/components/Icons';

export default {
  name: 'HeaderNonApp',
  components: {
    Icon
  },
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    openMenu() {
      this.menuOpen = true;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
  created() {
    document.addEventListener('click', e => {
      // Main Menu
      const isBurgerIcon = e.target.closest('.burger-menu') || e.target.matches('.burger-menu');
      if (isBurgerIcon) return;

      const isChildOfNav = e.target.closest('nav') || e.target.matches('nav');
      if (!isChildOfNav) {
        this.menuOpen = false;
      }
    });
  }
}
</script>

<style lang="scss">
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo-text {
      font-family: 'Merriweather', serif;
    }
  }

  header.non-app {
    position: relative;
    padding: 14px;
    background: linear-gradient(45deg, #565cc3 0%, #00b2e1 100%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 3px 0px;
    overflow: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-family: 'Raleway', Arial;

    .header-logo {
      width: 202px;
      text-decoration: none;

      .logo-image {
        width: 34px;
      }

      .logo-text {
        font-size: 22px;
        font-weight: bold;
        margin-left: 8px;
        color: #fff;
        letter-spacing: 0.3px;
      }
    }

    .burger-menu {
      display: none;
    }

    nav {
      display: flex;
      justify-content: space-around;

      .nav-close {
        display: none;
      }

      .nav-item {
        padding: 0 11px;

        a {
          color: #ffeaea;
          text-decoration: none;
          font-size: 16px;
          text-rendering: optimizelegibility;
          -webkit-font-smoothing: antialiased;
          transition: 280ms;
          font-weight: 500;

          &:hover {
            color: #000;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    header.non-app {
      padding: 0;
      overflow: visible;

      .header-logo {
        justify-content: left;
        padding-left: 14px;
      }

      .burger-menu {
        display: inline-block;

        .icon--burger {
          svg {
            padding: 5px 14px 0 0;
            height: 40px;
            width: 40px;
            fill: #fff;
          }
        }
      }

      nav {
        opacity: 0;
        visibility: hidden;
        transition: 150ms;
        text-align: left;
        display: block;
        position: absolute;
        z-index: 5;
        box-sizing: border-box;
        padding: 30px 0 30px 10%;
        background-color: #fff;
        left: 30%;
        right: 6px;
        top: 8px;
        border-radius: 6px;
        box-shadow: 0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3), 0 -18px 60px -10px rgba(0,0,0,.025);

        &.open {
          opacity: 1;
          visibility: visible;
        }

        .nav-close {
          display: block;
          position: absolute;
          z-index: 6;
          top: 10px;
          right: 10px;

          .icon--close {
            height: 28px;
            width: 28px;
          }
        }

        .nav-item {
          a {
            color: #6772e5;;
            font-size: 18px;
            padding: 10px;
            display: block;
          }
        }
      }
    }
  }
</style>