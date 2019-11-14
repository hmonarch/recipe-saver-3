<template>
  <div class="home">

    <HeaderNonApp></HeaderNonApp>

    <div class="wrapper title-wrapper">
      <div class="center-logo logo">
        <img class="logo-image" src="../assets/logo-255x255.png">
        <span class="logo-text">Recipe Saver</span>
      </div>
      <h1 class="headline">It's never been easier to save recipes online!</h1>

      <div id="extension-message">
        <b>Update 11/14</b>: Google is still reviewing the extension update. It's taking a frustratingly long time so we're sorry for the downtime!<br><br>
        <b>Note to Chrome Extension users</b>: The new version update of our Chrome extension is still undergoing a routine Chrome Extension Store review which can take several hours to several days (it's out of our hands). During this transition, the old extension will not be able to post recipes until Google has finished the review. Once the review has completed your extension should update automatically to the new version or you can force extension updates in your browser settings. Thanks for your patience!
      </div>
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
          <router-link :to="{ path: '/login', query: { 'show-reg': 'true' } }" class="main-cta">Login / Register</router-link>
        </div>
      </div>
    </div>

    <div class="site-preview">
      <div class="stripes">
        <span></span>
        <span></span>
      </div>
      <div class="site-preview-inner">
        <div class="site-preview-heading">
          Stay Organized Your Way
        </div>
        <div class="site-preview-subheading">
          Recipe Saver is designed to let you choose how you want to organize your recipes
        </div>
        <SitePreviewBox></SitePreviewBox>
      </div>
    </div>

    <div class="white-boxes">
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
              <li>Add custom notes, images, and tags</li>
              <li>Recipe Saver Chrome extension</li>
            </ul>
          </div>
          <div class="plan-right">
            <div class="plan-cost">Free</div>
            <div class="plan-cost-details">
              Upgrade later to save 50+ recipes
            </div>
            <router-link class="plan-cta" :to="{ path: '/login', query: { 'show-reg': 'true' } }">
              <span class="plan-cta-text">10 second sign up</span>
              <Icon name="shortArrow"/>
            </router-link>
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
              <li>Create grocery lists (coming soon!)</li>
            </ul>
          </div>
          <div class="plan-right">
            <div class="plan-cost">$9</div>
            <div class="plan-cost-details">
              Per month (cancel anytime)
            </div>
            <router-link class="plan-cta" :to="{ path: '/login', query: { 'show-reg': 'true' } }">
              <span class="plan-cta-text">Get full plan</span>
              <Icon name="shortArrow"/>
            </router-link>
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
      <router-link :to="{ path: '/login', query: { 'show-reg': 'true' } }" class="horizontal-box">
        <span class="horizontal-box-title">Start Now</span>
        <Icon name="shortArrow"/>
        <div class="horizontal-box-text">
          Use Recipe Saver to create your own recipe collection, add custom tags, share your favorite recipes and more!
        </div>
      </router-link>
    </div>

    <div class="footer-bar"></div>

    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Icons';
import HeaderNonApp from '@/components/HeaderNonApp';
import SitePreviewBox from '@/components/SitePreviewBox.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'home',
  components: {
    Icon,
    HeaderNonApp,
    SitePreviewBox,
    Footer
  },
  methods: {
    scrollToPlans() {
      document.querySelector('.plans').scrollIntoView({
        behavior: 'smooth'
      });
    }
  },
  beforeCreate() {
    document.body.className = 'home';
  }
}
</script>

<style lang="scss">
.home {
  color: #000;
  font-family: 'Raleway', Arial;

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

    #extension-message {
      background-color: rgba(255, 255, 0, 0.35);
      max-width: 1040px;
      margin: 0 auto;
      line-height: 20px;
      margin-top: 40px;
      padding: 20px;
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

  .site-preview {
    background: linear-gradient(-12deg,#7795f8 50%,#6772e5 80%,#555abf);
    overflow: hidden;
    position: relative;

    .stripes {
      width: 100%;
      display: grid;
      transform: skewY(-12deg);
      z-index: 0;
      grid: repeat(2,200px)/1fr repeat(4,minmax(0,calc((1040px - 20px * 2) / 4))) 1fr;
      height: 100%;
      transform-origin: 100% 100%;
      margin-top: 140px;
      position: absolute;

      span:first-child {
        background: linear-gradient(100grad,rgba(103,114,229,0),rgba(103,114,229,.3) 50%,#6772e5);
      }

      span:last-child {
        grid-column-start: span 2;
        background: linear-gradient(100grad,rgba(143,239,251,0),rgba(143,239,251,.3) 50%,rgba(143,239,251,.55) 75%,rgba(143,239,251,.9));
      }

      span {
        grid-column-end: -1;
      }
    }

    .site-preview-inner {
      max-width: 1040px;
      margin: 0 auto;
      padding: 60px 0;
      position: relative;
      z-index: 10;
      text-align: left;

      .site-preview-heading,
      .site-preview-subheading {
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.5px;
        padding-left: 80px;
      }

      .site-preview-heading {
        font-size: 21px;
        color: #fff;
        margin-bottom: 20px;
        position: relative;

        &::before {
          content: '';
          background-image: url(../assets/icon-groceries.png);
          background-repeat: no-repeat;
          background-position: center center;
          height: 72px;
          width: 72px;
          display: inline-block;
          background-size: 45px 45px;
          position: absolute;
          left: -20px;
          top: -9px;
          background-color: #6bd5f8;
          border-radius: 50%;
        }
      }

      .site-preview-subheading {
        color: #8feffb;
        font-size: 15px;
        margin-bottom: 50px;
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
