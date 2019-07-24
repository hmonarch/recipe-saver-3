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

    <div class="wrapper title-wrapper">
      <div class="center-logo logo">
        <img class="logo-image" src="../assets/logo-255x255.png">
        <span class="logo-text">Recipe Saver</span>
      </div>
      <h1 class="headline">It's never been easier to save recipes online!</h1>
    </div>

    <div class="wrapper hero-wrapper">
      <div class="hero">
        <div class="hero-benefits">
          <div class="hero-benefits-top">
            <div id="hero-image"></div>
          </div>
        </div>
        <div class="ctas">
          <a @click.prevent="scrollToPlans()" class="secondary-cta" href="#">See Plans</a>
          <a class="main-cta" href="/login">Set Up Now</a>
        </div>
      </div>
    </div>

    <div class="white-boxes">

      <div class="white-box">
        <div class="white-box-icon">
          <Icon name="folder"/>
        </div>
        <div class="white-box-headline">Stay Organized</div>
        <div class="white-box-text">Recipe Saver lets you customize your recipe collection any way you want! Add recipes to your Favorites or add your own custom-named tags. You can search by name, or sort by name or date so you can get on with creating your culinary masterpieces.</div>
      </div>

      <div class="white-box">
        <div class="white-box-icon">
          <Icon name="paper"/>
        </div>
        <div class="white-box-headline">Clip Recipes Online</div>
        <div class="white-box-text">Several top recipes sites are integrated with our Chrome extension so you can easily save any recipe you find online directly to your account. For nonintegrated sites we'll save the basic page info to your collection whether it be a video, blog post, or text recipe.</div>
      </div>

      <div class="plans">

        <div class="plans-headline">What's Included</div>
        <div class="plans-subheadline">Choose just the basics or the get the full tool</div>

        <div class="plan lite">
          <div class="plan-left">
            <div class="plan-title">Lite</div>
            <div class="plan-subtitle">
              The best way to save and organize online recipes
            </div>
            <ul class="plan-benefits">
              <li>Save up to 50 recipes</li>
              <li>Add custom notes and images</li>
              <li>Recipe Saver Chrome extension</li>
              <li>Create personalized tags</li>
            </ul>
          </div>
          <div class="plan-right">
            <div class="plan-cost">Free</div>
            <div class="plan-cost-details">
              Upgrade later to save 50+ recipes
            </div>
            <a class="plan-cta" href="#">
              <span class="plan-cta-text">10 second sign up</span>
              <Icon name="shortArrow"/>
            </a>
          </div>
        </div>

        <div class="plan full">
          <div class="plan-left">
            <div class="plan-title">Full</div>
            <div class="plan-subtitle">
              The ultimate recipe organization tool and more
            </div>
            <ul class="plan-benefits">
              <li>All the benefits of the Lite plan</li>
              <li>Save unlimited recipes</li>
              <li>Share recipes with friends and family</li>
              <li>Create grocery lists (coming soon)</li>
            </ul>
          </div>
          <div class="plan-right">
            <div class="plan-cost">$5</div>
            <div class="plan-cost-details">
              One time charge (not annual)
            </div>
            <a class="plan-cta" href="#">
              <span class="plan-cta-text">Get full plan</span>
              <Icon name="shortArrow"/>
            </a>
          </div>
        </div>
      </div>

      <div class="kitchen-image-section">
        <blockquote>
          <h2>Save Any Recipe</h2>
          <p>
            With Recipe Saver you can add recipes from any site or add your own custom recipes from scratch. You can access them with any device - bring your laptop, mobile or tablet device to the kitchen and follow along with your favorite recipe!
          </p>
        </blockquote>
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

    <div class="footer-bar"></div>

    <footer>
      <div id="footer-inner">
        <div id="footer-left">
          <a id="footer-logo" href="/">
            <img src="../assets/logo-255x255.png">
            <span class="logo-text">Recipe Saver</span>
            <div class="tagline">Any recipe, anywhere</div>
          </a>

          <div id="footer-social">
            <div id="footer-social-heading">FOLLOW US</div>
            <div id="footer-social-icons">
              <a class="footer-social-icon" href="https://www.facebook.com/Recipe-Saver-1832559400339822" target="_blank">
                <img src="../assets/icon-facebook.jpg">
                <span class="footer-social-label">Facebook</span>
              </a>
              <a class="footer-social-icon" href="https://twitter.com/recipesaver" target="_blank">
                <img src="../assets/icon-twitter.jpg">
                <span class="footer-social-label">Twitter</span>
              </a>
            </div>
          </div>

        </div>
        <div id="footer-right">
          <div id="footer-right-cta-title">Finally organize your recipes once and and for all!</div>
          <a id="footer-right-cta-button" href="/login">Sign Up Free</a>

          <div id="footer-links-section">
            <ul class="footer-links">
              <li><a href="#">My Recipes</a></li>
              <li><a href="https://chrome.google.com/webstore/detail/recipe-saver/opemcijjekbnjccecheklfbflnkoacai" target="_blank">Chrome Extension</a></li>
            </ul>
            <ul class="footer-links">
              <li><a href="/#">Account</a></li>
              <li><a href="/#">Login / Register</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div id="copyright">
        <div id="copyright-inner">
          <div id="all-rights-reserved">Let Recipe Saver be your saviour</div>
          <div id="recipesaver">© 2019 Recipe Saver</div>
        </div>
      </div>
    </footer>
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
  },
  methods: {
    scrollToPlans() {
      console.log(1);
      document.querySelector('.plans').scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style lang="scss">
.home {
  color: #000;
  font-family: 'Raleway', Arial;

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
    background: linear-gradient(45deg, #92fe9d 0%,#44e2d2 30%, #00b2e1 100%);
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
          font-weight: 500;

          &:hover {
            color: #000;
          }
        }
      }
    }
  }

  .hero,
  .white-boxes,
  .horizontal-box-section {
    max-width: 1040px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .title-wrapper {
    background-color: #f6f9fc;

    .center-logo {
      padding-top: 40px;
      padding-bottom: 20px;

      .logo-image {
        width: 40px;
      }

      .logo-text {
        font-size: 34px;
        font-weight: bold;
        margin-left: 12px;
      }
    }

    .headline {
      font-size: 28px;
    }
  }

  .hero-wrapper {
    background-color: #f6f9fc;
    padding-bottom: 60px;

    .hero {
      .hero-benefits {
        padding: 40px 0 40px 0;

        .hero-benefits-top {
          margin-bottom: 10px;

          #hero-image {
            border-radius: 6px;
            box-shadow: 34.3px 62.5px 125px -25px rgba(50,50,93,.5), 20.6px 37.5px 75px -37.5px rgba(0,0,0,.6);
            height: 550px;
            width: 100%;
            background-image: url(../assets/dashboard-homepage.jpg);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top center;
          }
        }

        .hero-benefits-bottom {
          .hero-benefits-list {
            padding-left: 44px;
            text-align: left;

            li {
              margin-bottom: 30px;
              position: relative;

              &::before {
                content: '';
                background-image: url(../assets/icon-radish.png);
                height: 34px;
                width: 34px;
                display: inline-block;
                background-size: 34px 34px;
                position: absolute;
                left: -44px;
                top: -8px;
              }

              h5 {
                font-size: 19px;
                font-weight: bold;
                letter-spacing: 0.2px;
                margin-bottom: 15px;
              }

              .benefit-description {
                line-height: 28px;
              }
            }
          }
        }
      }

      .hero-image {
        width: 75%;
        box-shadow: 34.3px 62.5px 125px -25px rgba(50,50,93,.5), 20.6px 37.5px 75px -37.5px rgba(0,0,0,.6);
        border-radius: 6px;
      }

      .ctas {
        a {
          display: inline-block;
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          padding: 15px 20px;
          background-color: #089de3;
          background-repeat: no-repeat;
          background-position: right 20px center;
          text-align: left;
          transition: all .15s ease;
          letter-spacing: 0.9px;
          border: solid 1px #089de3;
          box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
          }
        }

        .secondary-cta {
          margin-right: 24px;
          color: #069de3;
          background-color: #fff;
          border: solid 1px #069de3;
        }

        .main-cta {
          padding: 15px 60px 15px 20px;
          background-image: url(../assets/arrow-long.png);
        }
      }
    }
  }

  .white-boxes {
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 40px;

    .white-box {
      padding: 40px 70px 40px 70px;
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

    .plans {
      padding: 40px 0 80px 0;
      grid-column: 1/3;

      .plans-headline {
        font-size: 36px;
        margin-bottom: 20px;
      }

      .plans-subheadline {
        font-size: 22px;
        margin-bottom: 40px;
        color: #424770;
      }

      .plan {
        display: grid;
        grid-template-columns: 75% 25%;
        text-align: left;
        padding: 40px 40px 40px 100px;
        box-shadow: 0 6px 12px -2px rgba(50,50,93,.25), 0 3px 7px -3px rgba(0,0,0,.3);

        &.full {
          margin-top: 40px;
          .plan-left {
            .plan-title::before {
              background-image: url(../assets/icon-ruby.png);
              background-size: 28px 28px;
              background-color: #fed0e0;
            }
          }
        }

        .plan-left {
          border-right: solid 1px #e6ebf1;
          padding-right: 10px;

          .plan-title {
            font-size: 24px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 14px;
            position: relative;

            &::before {
              content: '';
              background-image: url(../assets/icon-emerald.png);
              background-repeat: no-repeat;
              background-position: center center;
              height: 51px;
              width: 51px;
              display: inline-block;
              background-size: 28px 35px;
              position: absolute;
              left: -70px;
              top: -14px;
              background-color: #bffbf6;
              border-radius: 50%;
            }
          }

          .plan-subtitle {
            margin-bottom: 32px;
          }

          .plan-benefits {
            display: grid;
            grid-template-columns: 1fr 1fr;

            li {
              margin-bottom: 22px;
              padding-left: 34px;
              position: relative;
              color: #6b7c93;
              line-height: 20px;

              &:nth-child(3),
              &:nth-child(4) {
                margin-bottom: 0;
              }

              &::before {
                content: '';
                background-image: url(../assets/icon-radish.png);
                height: 28px;
                width: 28px;
                display: inline-block;
                background-size: 28px 28px;
                position: absolute;
                left: -5px;
                top: -8px;
              }
            }
          }
        }

        .plan-right {
          padding-left: 30px;
          padding-top: 13px;

          .plan-cost {
            font-size: 24px;
            color: #24b47e;
            font-weight: bold;
            margin-bottom: 12px;
          }

          .plan-cost-details {
            color: #6b7c93;
            line-height: 26px;
            margin-bottom: 10px;
          }

          .plan-cta {
            color: #6772e5;
            font-weight: bold;
            font-size: 14px;
            text-decoration: none;

            &:hover {
              color: #000;

              .icon--shortArrow {
                left: 6px;
                
                svg {
                  fill: #000;
                }
              }
            }

            .icon--shortArrow {
              transition-duration: .25s;
              height: 18px;
              width: 18px;
              position: relative;
              top: 0px;
              left: 3px;

              svg {
                fill: #1627e3;
              }
            }
          }
        }

      }
    }

    .kitchen-image-section {
      grid-column: 1/3;
      background-image: url(../assets/kitchen-girl.jpg);
      background-position-x: 40px;
      background-repeat: no-repeat;
      height: 390px;
      border-radius: 4px;
      display: flex;
      margin-bottom: 60px;

      blockquote {
        max-width: 46%;
        box-sizing: border-box;
        position: relative;
        text-align: left;
        padding: 62px 75px;

        h2,
        p {
          position: relative;
          z-index: 1;
          color: #fff;
        }

        h2 {
          font-family: 'Merriweather', serif;
          font-size: 26px;
          margin-bottom: 26px;
        }

        p {
          font-style: italic;
          font-size: 19px;
          line-height: 28px;
        }

        &::before {
          content: '';
          display: block;
          background: #7750f3;
          position: absolute;
          z-index: 0;
          top: 0;
          bottom: 0;
          left: 0;
          right: 126px;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          content: '';
          display: block;
          z-index: 0;
          position: absolute;
          width: 206px;
          height: 100%;
          background: url(../assets/pink-curves.svg);
          background-size: 100% 100%;
          left: auto;
          right: -80px;
          top: 0;
          bottom: 0;
          filter: hue-rotate(298deg);
        }
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
        color: #000;
      }
    }
  }

  .footer-bar {
    margin-top: 80px;
    background-size: cover;
    background-image: url(../assets/ingredients-cover.png);  height: 166px;
  }

  footer {
    background-color: #444444;
    color: white;

    #footer-inner,
    #copyright-inner {
      max-width: 1040px;
    }

    #footer-inner {
      margin: 0 auto;
      padding: 32px 20px;
      overflow: auto;
    }

    #footer-left {
      width: 362px;
      float: left;
      margin-top: 13px;
      text-align: left;

      #footer-logo {
        width: 215px;
        float: left;
        margin-bottom: 77px;
        color: white;

        img {
          float: left;
          width: 37px;
        }

        .logo-text {
          float: right;
          margin-top: 6px;
          margin-left: 8px;
          font-size: 25px;
          letter-spacing: 1px;
          display: inline-block;
          font-family: 'Merriweather', serif;
          margin-bottom: 8px;
        }

        .tagline {
          display: inline-block;
          float: right;
          clear: both;
          font-weight: inherit;
          position: relative;
          left: -8px;
        }
      }

      #footer-social {
        clear: both;

        #footer-social-heading {
          font-size: 18px;
          margin-bottom: 12px;
        }

        .footer-social-icon {
          color: white;
          text-decoration: none;

          &:hover {
            color: #23d82f;
          }

          img {
            vertical-align: middle;
          }

          .footer-social-label {
            margin-right: 20px;
            display: inline-block;
            margin-left: 8px;
          }
        }

      }
    }

    #footer-right {
      float: right;

      #footer-right-cta-title {
        font-size: 18px;
        margin-top: 12px;
      }

      #footer-right-cta-button,
      .footer-links a {
        transition: 280ms;
      }

      #footer-right-cta-button {
        text-decoration: none;
        color: white;
        border: solid 1px #23d82f;
        display: inline-block;
        margin-top: 12px;
        padding: 10px;

        &:hover {
          background-color: #23d82f;
          color: #444444;
        }
      }

      #footer-links-section {
        display: flex;
        justify-content: space-between;
        margin-top: 62px;

        .footer-links {
          li {
            margin-bottom: 16px;
          }

          a {
            color: white;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 15px;

            &:hover {
              color: #23d82f;
            }
          }
        }
      }
    }


    #copyright {
      clear: both;
      background-color: #26282e;
      color: white;

      #copyright-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 42px;
        margin: 0 auto;
        font-size: 15px;
      }
    }
    
  }
}

@import '@/styles/_home-mobile.scss';

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
