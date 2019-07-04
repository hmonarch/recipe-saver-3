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
          <a href="https://localhost:8080/login">Login / Register</a>
        </div>
      </nav>
    </header>

    <div class="wrapper hero-wrapper">
      <div class="hero">
        <div class="center-logo logo">
          <img class="logo-image" src="../assets/logo-255x255.png">
          <span class="logo-text">Recipe Saver</span>
        </div>

        <h1 class="headline">It's never been easier to save recipes online!</h1>

        <img class="hero-image" src="https://www.docz.site/static/img/builtin-components.7e0b25ad.png">

          <a class="main-cta" href="/login">10 Second Sign Up!</a>
      </div>
    </div>

    <div class="white-boxes">

      <div class="white-box">
        <div class="white-box-icon">
          <Icon name="paper"/>
        </div>
        <div class="white-box-headline">Clip Recipes Online</div>
        <div class="white-box-text">Several top recipes sites are integrated with our Chrome extension so you can easily save any recipe you find online directly to your account. For nonintegrated sites we'll save the basic page info to your collection whether it be a video, blog post, or text recipe.</div>
      </div>

      <div class="white-box">
        <div class="white-box-icon">
          <Icon name="folder"/>
        </div>
        <div class="white-box-headline">Stay Organized</div>
        <div class="white-box-text">Recipe Saver lets you customize your recipe collection any way you want! Add recipes to your Favorites or add your own custom-named tags. You can search by name, or sort by name or date so you can get on with creating your culinary masterpieces.</div>
      </div>

      <div class="integrations">

        <h2>Chrome Extension Integrations</h2>

        <ul>
          <li><img src="../assets/integration-allrecipes.png"></li>
          <li><img src="../assets/integration-chowhound.png"></li>
          <li><img src="../assets/integration-foodnetwork.png"></li>
          <li><img src="../assets/integration-epicurious.png"></li>
          <li><img src="../assets/integration-tasty.png"></li>
        </ul>

        <a href="https://chrome.google.com/webstore/detail/recipe-saver-extension/opemcijjekbnjccecheklfbflnkoacai" target="_blank" class="integrations-label">Get Chrome Extension</a>
      </div>
    </div>

    <div class="horizontal-box-section">
      <a class="horizontal-box" href="/login">
        <span class="horizontal-box-title">Start Now</span>
        <Icon name="shortArrow"/>
        <div class="horizontal-box-text">
          Use Recipe Saver to create your own recipe collection, add custom tags, share your favorite recipes and more!
        </div>
      </a>
    </div>


    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Icon from '@/components/Icons';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Icon
  }
}
</script>

<style lang="scss">
.home {
  color: #000;
  font-family: 'Raleway', Arial;
  padding-bottom: 100px;

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

  .hero-wrapper {
    background-image: url(../assets/bg-food.jpg);
  }

  .hero,
  .white-boxes,
  .horizontal-box-section {
    max-width: 1040px;
    margin: 0 auto;
  }

  .hero {
    padding: 50px 40px;

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
      width: 100%;
      margin: 0 auto 40px auto;
      display: block;
      box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
    }

    .main-cta {
      display: inline-block;
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      padding: 20px 60px 20px 20px;
      background-color: #089de3;
      background-image: url(../assets/arrow-long.png);
      background-repeat: no-repeat;
      background-position: right 20px center;
      text-align: left;
      transition: 280ms;

      &:hover {
        background-color: #23d82f;
      }
    }
  }

  .white-boxes {
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 28px;

    .white-box {
      padding: 70px;
      border-bottom: solid 1px#f2f2f2;
      text-align: left;

      &:first-child {
        border-right: solid 1px #f2f2f2;
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      .white-box-icon {
        margin-bottom: 20px;

        .icon {
          border-radius: 50%;
          padding: 12px;
          background-color: #b9f4bc;
          width: 40px;
          height: 40px;
          fill: #1ab877;
          -webkit-animation-name: wiggle;
          -ms-animation-name: wiggle;
          -ms-animation-duration: 4s;
          -webkit-animation-duration: 4s;
          -webkit-animation-iteration-count: 30;
          -ms-animation-iteration-count: 30;
          -webkit-animation-timing-function: ease-in-out;
          -ms-animation-timing-function: ease-in-out;
        }
      }

      .white-box-headline {
        color: #24b47e;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 19px;
        margin-bottom: 15px;
      }

      .white-box-text {
        font-size: 17px;
        line-height: 28px;
      }
    }

    .integrations {
      position: relative;
      padding: 84px 0 40px 0;
      grid-column: 1/3;
      display: flex;
      align-items: center;
      justify-content: space-around;

      h2 {
        position: absolute;
        top: 30px;
        color: #24b47e;
        font-weight: bold;
        font-size: 22px;
      }

      &:hover {
        ul {
          filter: blur(10px);
          transform: scale(.95);
          opacity: .7;
        }

        .integrations-label {
          opacity: 1;
        }
      }

      ul,
      .integrations-label {
        transition: 2s cubic-bezier(.19,1,.22,1);
      }

      ul {        
        li {
          display: inline-block;
          filter: grayscale(100%);

          img {
            width: 80%;
          }
        }
      }

      .integrations-label {
        opacity: 0;
        background-color: #089de3;
        z-index: 5;
        position: absolute;
        top: 110px;
        color: #fff;
        padding: 13px 30px;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          background-color: #23d82f;
        }
      }

    }
  }

  .horizontal-box-section {
    background-color: #fff;

    .horizontal-box {
      display: block;
      box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,.025);
      padding: 40px 40px 40px 170px;
      border-radius: 8px;
      text-align: left;
      background-image: url(../assets/icon-tableware.png);
      background-repeat: no-repeat;
      background-position: 30px center;
      text-decoration: none;
      transition: .5s;


      &:hover {
        box-shadow: 0 30px 60px -12px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.3), 0 -12px 36px -8px rgba(0,0,0,.025);
        transform: translateY(-2px);
        filter: grayscale(65%);

        .icon--shortArrow {
          transform: translateX(3px);
        }
      }

      .horizontal-box-title {
        color: #089de3;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 19px;
        display: inline-block;
        margin-bottom: 22px;
      }

      .icon--shortArrow {
        transition-duration: .15s;
        height: 28px;
        width: 28px;
        position: relative;
        top: -2px;
        left: 2px;

        svg {
          fill: #089de3;
        }
      }

      .horizontal-box-text {
        line-height: 24px;
      }
    }
  }

}


@keyframes wiggle {
  0% {transform: rotate(0deg);}
  65% {transform: rotate(0deg);}
  66% {transform: rotate(10deg);}
  74% {transform: rotate(-10deg);}
  82% {transform: rotate(20deg);}
  91% {transform: rotate(-5deg);}
  100% {transform: rotate(0deg);}
}
</style>
