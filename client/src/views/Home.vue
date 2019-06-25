<template>
  <div class="home">

    <header>
      <div class="header-logo logo">
        <img class="logo-image" src="../assets/logo-255x255.png">
        <span class="logo-text">Recipe Saver</span>
      </div>

      <nav>
        <div class="nav-item">
          <a href="#">My Recipes</a>
        </div>
        <div class="nav-item">
          <a href="#">Chrome Extension</a>
        </div>
        <div class="nav-item">
          <a href="#">Account</a>
        </div>
        <div class="nav-item">
          <a href="#">Login / Register</a>
        </div>
      </nav>
    </header>

    <div class="hero">
      <div class="center-logo logo">
        <img class="logo-image" src="../assets/logo-255x255.png">
        <span class="logo-text">Recipe Saver</span>
      </div>

      <h1 class="headline">It's never been easier to save recipes online!</h1>

      <img class="hero-image" src="https://www.docz.site/static/img/builtin-components.7e0b25ad.png">
    </div>



    <a href="https://localhost:8080/login">Regular Login!</a>



    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
.home {
  color: #000;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo-text {
      font-family: 'Merriweather', serif;
    }
  }

  header {
    position: relative;
    padding: 14px;
    background: linear-gradient(45deg, #92fe9d 0%,#44e2d2 50%, #00b2e1 100%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 3px 0px;
    overflow: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Open Sans', Arial;

    .header-logo {
      width: 202px;

      .logo-image {
        width: 34px;
      }

      .logo-text {
        font-size: 22px;
        font-weight: bold;
        margin-left: 8px;
      }
    }

    nav {
      display: flex;
      justify-content: space-around;

      .nav-item {
        padding: 0 11px;

        a {
          color: #ffeaea;
          text-decoration: none;
          font-size: 16px;
          text-rendering: optimizelegibility;
          -webkit-font-smoothing: antialiased;
          transition: 280ms;

          &:hover {
            color: #000;
          }
        }
      }
    }
  }

  .hero {
    padding: 50px 40px;
    background-image: url(../assets/bg-food.jpg);

    .center-logo {
      margin-bottom: 20px;

      .logo-image {
        width: 80px;
      }

      .logo-text {
        font-size: 58px;
        font-weight: bold;
        margin-left: 12px;
      }
    }

    .headline {
      font-size: 30px;
      margin-bottom: 40px;
    }

    .hero-image {
      width: 70%;
      box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
    }
  }

}
</style>
