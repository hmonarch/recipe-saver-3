<template>
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
        <router-link id="footer-right-cta-button" :to="{ path: '/login', query: { 'show-reg': 'true' } }">Sign Up Free</router-link>

        <div id="footer-links-section">
          <ul class="footer-links">
            <li><router-link :to="{ path: '/recipes' }">My Recipes</router-link></li>
            <li><a href="https://chrome.google.com/webstore/detail/recipe-saver/opemcijjekbnjccecheklfbflnkoacai" target="_blank">Chrome Extension</a></li>
            <li><router-link :to="{ path: '/terms' }">Terms &amp; Conditions</router-link></li>
          </ul>
          <ul class="footer-links">
            <li><router-link :to="{ path: '/account' }">Account</router-link></li>
            <li><router-link :to="{ path: '/login' }">Login / Register</router-link></li>
            <li><router-link :to="{ path: '/privacy' }">Privacy Policy</router-link></li>
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
</template>



<style lang="scss">
  footer {
    background-color: #444444;
    color: white;
    border-top: solid 1px #26282e;

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
      padding: 0 20px;

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

  @media (max-width: 788px) {
    footer {
      text-align: center;

      #footer-inner {
        #footer-left {
          width: 100%;
          text-align: center;

          #footer-logo {
            width: auto;
            display: inline-block;
            float: none;
            margin-bottom: 40px;
          }

          #footer-social {
            margin-bottom: 20px;
          }
        }

        #footer-right {
          float: none;

          #footer-right-cta-title {
            line-height: 25px;
            font-size: 16px;
          }

          #footer-links-section {
            .footer-links {
              a {
                font-size: 14px;
              }
              
              li:nth-child(3),
              li:nth-child(3) {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      #copyright {
        padding: 10px 20px;

        #copyright-inner {
          font-size: 14px;
          text-align: left;
          height: auto;
          line-height: 20px;
        }
      }
    }
  }
</style>