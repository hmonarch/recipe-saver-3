<template>
  <div id="plans">
    <div class="hero"></div>
    <div class="plans-container wrapper">
      <div class="plans-container-title">
        <h1>Plans built for home cooks of all types.</h1>
        <h2>Sign up for the full service or upgrade later.</h2>
      </div>
      <div class="plan-blocks">
        <div class="plan">
          <div class="plan-title-and-icon">
            <img class="plan-title-icon" src="../assets/icon-emerald.png">
            <div class="plan-title">Lite </div>
          </div>
          <div class="plan-info">
            <div class="plan-subtitle">
              The best way to save and organize online recipes
            </div>
            <div class="plan-price">$9</div>
            <div class="plan-price-info">per month</div>
            <ul class="plan-benefits">
              <li>Save up to 50 recipes</li>
              <li>Recipe Saver Chrome extension</li>
              <li>Add custom notes and images</li>
              <li>Create personalized tags</li>
            </ul>
          </div><a class="plan-cta" href="#">Select</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Icon from '@/components/Icons';
import utils from '@/mixins/utils';


export default {
  components: {
    Header,
    Icon,
  },
  mixins: [utils],
  data() {
    return {

    };
  },
  methods: {

  },
  created() {

  },
  beforeCreate() {
    document.body.className = 'plans';
  }
}
</script>

<style lang="scss">
#plans {

  .wrapper {
    max-width: 1040px;
    margin: 0 auto;
  }

  .hero {
    background-image: url(../assets/bg-guacamole.jpg);
    height: 600px;
    padding-top: 500px;
    background-size: cover;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 600px;
      height: 2000px;
      background: #f6f9fc;
      -webkit-transform: skew(0,-12deg);
      transform: skew(0,-12deg);
    }
  }

  .plans-container {
    position: relative;
    top: -1100px;

    .plans-container-title {
      margin-top: 100px;
      margin-bottom: 66px;
      text-shadow: 2px 2px 3px #393939;
      
      h1 {
        color: #fff;
        font-size: 42px;
        margin-bottom: 8px;
      }

      h2 {
        color: #bdc6ff;
        font-size: 32px;
      }
    }

    .plan-blocks {
      .plan {
        width: 50%;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);

        .plan-title-and-icon {
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: solid 1px #e6ebf1;

          .plan-title-icon {
            width: 34px;
            height: 40px;
            margin-right: 14px;
          }

          .plan-title {
            text-transform: uppercase;
            font-weight: bold;
            color: #24b47e;
            font-size: 20px;
            letter-spacing: 0.3px;
          }
        }

        .plan-info {
          padding: 40px;

          .plan-subtitle {
            font-size: 23px;
            line-height: 30px;
            color:#525f7f;
            margin-bottom: 20px;
          }

          .plan-price {
            font-size: 62px;
            color: #24b47e;
            margin-bottom: 10px;
          }

          .plan-price-info {
            color: #8898aa;
            margin-bottom: 50px;
          }

          .plan-benefits {
            text-align: left;
            color: #525f7f;
            padding-left: 42px;
            display: inline-block;

            li {
              margin-bottom: 16px;
              font-size: 18px;
              line-height: 22px;
              position: relative;

              &::before {
                content: '';
                background-image: url(../assets/icon-radish.png);
                height: 31px;
                width: 31px;
                display: inline-block;
                background-size: 31px 31px;
                position: absolute;
                left: -44px;
                top: -6px;
              }
            }
          }
        }

        .plan-cta {
          padding: 25px;
          text-align: center;
          display: block;
          background-color: #3ecf8e;
          font-size: 23px;
          color: #fff;
          text-decoration: none;
          border-radius: 0 0 4px 4px;
          transition: all .25s ease;

          &::after {
            content: '';
            background-image: url(../assets/arrow-long.png);
            display: inline-block;
            height: 20px;
            width: 28px;
            background-repeat: no-repeat;
            position: relative;
            top: 9px;
            margin-left: 10px;
          }

          &:hover {
            filter: hue-rotate(120deg);
          }
        }
      }
    }
  }
}
</style>

