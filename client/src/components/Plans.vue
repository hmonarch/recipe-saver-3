<template>
  <div id="plans">
    <div class="plans-container wrapper">
      <HeaderNonApp></HeaderNonApp>

      <div class="plans-container-title">
        <h1>Plans built for home cooks of all types.</h1>
        <h2>Sign up for the full service or upgrade later.</h2>
      </div>
      <div class="plan-blocks">

        <div class="plan-container">
          <div class="plan lite">
            <div class="plan-title-and-icon">
              <img class="plan-title-icon" src="../assets/icon-emerald.png">
              <div class="plan-title">Lite</div>
            </div>
            <div class="plan-info">
              <div class="plan-subtitle">
                Save and organize online recipes
              </div>
              <div class="plan-price">Free</div>
              <div class="plan-price-info">upgrade later</div>
              <ul class="plan-benefits">
                <li>Save up to 50 recipes</li>
                <li>Recipe Saver Chrome extension</li>
                <li>Add custom notes, images, and tags</li>
              </ul>
            </div><a class="plan-cta" href="#">Select</a>
          </div>
        </div>

        <div class="plan-container">
          <div class="plan full">
            <div class="plan-title-and-icon">
              <img class="plan-title-icon" src="../assets/icon-ruby.png">
              <div class="plan-title">Full</div>
            </div>
            <div class="plan-info">
              <div class="plan-subtitle">
                The ultimate recipe <br>organization tool and more
              </div>
              <div class="plan-price">$9</div>
              <div class="plan-price-info">per month</div>
              <ul class="plan-benefits">
                <li>All the benefits of the Lite plan</li>
                <li>Save unlimited recipes</li>
                <li>Share recipes with friends and family</li>
                <li>Create grocery lists (coming soon!)</li>
              </ul>
            </div><a class="plan-cta" href="#">Select</a>
          </div>
        </div>

      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import HeaderNonApp from '@/components/HeaderNonApp.vue';
import Icon from '@/components/Icons';
import utils from '@/mixins/utils';
import Footer from '@/components/Footer.vue';


export default {
  components: {
    HeaderNonApp,
    Icon,
    Footer
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
  background-image: url(../assets/bg-guacamole.jpg);
  background-size: cover;

  header.non-app {
    background: transparent;
    box-shadow: none;

    nav .nav-item a:hover {
      color: #3ecf8e;
    }
  }

  .wrapper {
    max-width: 1040px;
    margin: 0 auto;
  }

  .plans-container {
    position: relative;
    margin: 0 auto 200px auto;

    .plans-container-title {
      margin-top: 100px;
      margin-bottom: 66px;
      text-shadow: 2px 2px 3px #515151;
      
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
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;

      .plan-container {
        margin: 0 30px;

        .plan {
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 15px 35px rgba(50,50,93,.1), 5px 5px 15px rgba(0,0,0,.07);
          transition: all .25s ease;

          &.full {
            box-shadow: 0 0 12px 5px rgba(216, 27, 96, 0.6);

            &:hover {
              box-shadow: 0 0 12px 5px rgba(36, 180, 126, 0.7490196078431373)
            }

            .plan-title-and-icon {
              .plan-title-icon {
                width: 20px;
                height: 20px;
                transform: rotate(45deg);
                position: relative;
                top: -3px;
              }
            }

            .plan-info {
              .plan-price {
                font-size: 62px;
                color: #24b47e;
              }
            }

            .plan-cta {
              background-color: #fe4081;

              &:hover {
                background-color: #24b47e;
              }
            }
          }

          .plan-title-and-icon {
            padding: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: solid 1px #e6ebf1;

            .plan-title-icon {
              width: 17px;
              height: 20px;
              margin-right: 14px;
            }

            .plan-title {
              text-transform: uppercase;
              font-weight: bold;
              color: #4db6ac;
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
            font-size: 40px;
            color: #9eb0ae;
            margin-bottom: 10px;
            text-transform: uppercase;
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
              font-size: 17px;
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
            background-color: #9eb0ae;
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
              background-color: #000;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 788px) {
  #plans {
    background-size: initial;

    .plans-container {
      margin-bottom: 100px;

      .plans-container-title {
        padding: 0 20px;
        margin-top: 70px;

        h1 {
          font-size: 38px;
        }

        h2 {
          font-size: 26px;
        }
      }

      .plan-blocks {
        grid-template-columns: 1fr;

        .plan-container {
          &:first-child {
            order: 2;
          }

          &:last-child {
            order: 1;
            margin-bottom: 60px;
          }
        }
      }
    }
  }
}
</style>

