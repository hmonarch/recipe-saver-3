<template>
  <div class="ext-landing">

    <HeaderNonApp></HeaderNonApp>

    <div class="ext-container">
      <div class="ext-left">
        <h1>
          <span>Saving Recipes,</span>
          <span>Simplified</span>
        </h1>
        <div class="ext-desc">
          Save your favorite online recipes straight to your RecipeSaver.me account. Many top recipe sites are integrated already!
        </div>
        <a class="ext-cta" href="https://chrome.google.com/webstore/detail/recipe-saver-extension/opemcijjekbnjccecheklfbflnkoacai" target="_blank">
          <span class="cta-text-large">Add to Chrome</span><span class="cta-text-small"> (It's free)</span>
        </a>
      </div>

      <div class="ext-right">
        <img class="ext-screenshot" src="../assets/ext-screenshot.jpg">
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Icons';
import HeaderNonApp from '@/components/HeaderNonApp';
import Footer from '@/components/Footer.vue';

export default {
  name: 'extension',
  components: {
    Icon,
    HeaderNonApp,
    Footer
  },
  methods: {

  },
  beforeCreate() {
    document.body.className = 'ext';
  }
}
</script>

<style lang="scss">
.ext-landing {
  color: #000;
  font-family: 'Raleway', Arial;
  background-image: url(../assets/ext-bg.jpg);
  background-size: cover;

  .ext-container {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 410px);
    justify-content: space-between;
    min-height: 500px;
    padding: 0 60px;
    align-items: center;
    margin: 0 auto;
    max-width: 1080px;

    .ext-left {
      text-align: left;
      width: 40%;

      h1 {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 26px;

        span {
          display: block;
          line-height: 62px;
        }
      }

      .ext-desc {
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 36px;
      }

      .ext-cta {
        box-sizing: border-box;
        display: inline-block;
        background-color: #3ecf8e;
        font-size: 16px;
        color: #fff;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        transition: all .15s ease;
        letter-spacing: 0.9px;
        padding: 15px 66px 15px 20px;
        background-image: url(../assets/arrow-long.png);
        background-repeat: no-repeat;
        background-position: right 20px center;
        text-decoration: none;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
        }

        .cta-text-large {
          font-weight: bold;
        }

        .cta-text-small {
          color: #cdf4ec;
          font-size: 14px;
        }
      }
    }

    .ext-right {
      width: 50%;
      
      .ext-screenshot {
        width: 100%;
        box-shadow: 34.3px 62.5px 125px -25px rgba(50, 50, 93, 0.5), 20.6px 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
        border-radius: 6px;
      }
    }
  }
}

@media (max-width: 767px) {
  .ext-landing {
    .ext-container {
      display: block;
      min-height: auto;
      height: auto;
      padding: 40px 20px;

      .ext-left,
      .ext-right {
        width: 100%;
        text-align: center;
      }

      .ext-left {
        margin-bottom: 60px;

        h1 {
          font-size: 36px;

          span {
            line-height: 44px;
          }
        }
      }

      .ext-right {
        .ext-screenshot {
          box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25), 0 3px 7px -3px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>
