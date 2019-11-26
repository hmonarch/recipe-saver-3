<template>
  <header>
    <div class="header-inner" :class="{ 'full-width' : fullScreen === true }">
      <ul id="nav">
        <li class="mobile burger" @click="showMobileMenu()">
          <icon name="burger"/>
        </li>
        <li class="my-recipes">
          <router-link :to="{ path: '/recipes/all' }">
            My Recipes
          </router-link>
        </li>
        <li class="extension">
          <router-link :to="{ path: '/extension' }">
            <span class="chrome-ext-prefix">Chrome </span>Extension
          </router-link>
        </li>
        <li class="search-container">
          <icon name="magnifyingGlass"/>
          <form @submit.prevent="()=>{}">
            <input id="search-input" @keyup="debounceSearch($event)" v-model="searchTerm" type="text" placeholder="Search Recipes" autocomplete="off">
          </form>
          <ul v-if="searchResultsVisible" id="search-results" class="box">
            <li v-show="!recipeSearchResults.length && !tagSearchResults.length" class="no-results">No results</li>

            <li v-for="recipe in recipeSearchResults.slice(0, 8)" :key="recipe._id">
              <router-link :to="{ path: '/recipes/all', query: { id: recipe._id }}">
                <span class="result-title">{{ recipe.title }}</span>
              </router-link>
            </li>
            <li v-for="(tag, index) in tagSearchResults.slice(0, 4)" :key="tag.name" class="tag" :data-tag-num="index">
              <router-link :style="dynamicBackgroundColor(tag)" :to="{path: `/recipes/tag/${tag.name}`}">
                <span class="tag-name">{{ tag.name }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="logout">
          <a @click.prevent="logout">Logout</a>
        </li>
        <li class="account">
          <router-link :to="{ path: '/account' }">Account</router-link>
        </li>
      </ul>
    </div>

    <div :class="{ 'active' : showMessage === true, 'error': isError === true, 'share-link': isShareLink }" id="message-box" class="box">
      <div class="message-inner">
        <div class="message-block">
          <span class="message-subject">{{ messageSubject }}</span>
          <span v-if="!isShareLink" class="message-verb">{{ messageVerb }}</span>
          <span v-else class="message-verb">
            <div @click="copySharedLink()"><icon name="copy"/></div>
            <input type="text" :value="messageVerb">
          </span>
          
        </div>
        <div @click="showMessage = false" class="message-icon">
          <icon name="close"/>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
import EventBus from '@/EventBus';
import AuthService from '@/services/AuthService';
import RecipeService from '@/services/RecipeService';
import utils from '@/mixins/utils';
import Icon from '@/components/Icons';
import debounce from 'debounce';

export default {
  components: {
    Icon
  },
  data() {
    return {
      searchTerm: '',
      recipeSearchResults: [],
      tagSearchResults: [],
      searchResultsVisible: false,
      fullScreen: false,
      
      showMessage: false,
      messageSubject: null,
      messageVerb: null,
      isError: false,
      isShareLink: false,
    };
  },
  mixins: [utils],
  methods: {
    showMobileMenu() {
      EventBus.$emit('SHOW_MOBILE_MENU');
    },
    debounceSearch: debounce(function(e) {
      this.search(e);
    }, 300),
    async search(e) {
      if (this.searchTerm.trim() === '') return this.searchResultsVisible = false;
      this.searchResultsVisible = true;
      const response = await RecipeService.searchRecipes(this.searchTerm.trim());
      this.recipeSearchResults = response.data.recipeResults;
      this.tagSearchResults = response.data.tagResults;
    },
    async logout() {
      const response = await AuthService.logout();
      this.$router.push('/');
    },
    copySharedLink() {
      document.querySelector('.message-verb input').select();
      document.execCommand('copy');
    }
  },
  created() {
    document.addEventListener('click', e => {

      // Search results click off
      const isChildofSearchResults =  e.target.matches('#search-results') || e.target.matches('#search-input') || e.target.matches('#search-results .tag') || e.target.matches('.no-results');
      if (!isChildofSearchResults) {
        this.searchResultsVisible = false;
      }

    });
  },
  mounted() {
    EventBus.$on('LISTOPEN_HEADER', listOpen => {
      this.fullScreen = !listOpen;
    });
    EventBus.$on('MESSAGE', ({ title, message, isError = false, isShareLink = false, timeout = 3000 }) => {
      this.isError = isError;
      this.isShareLink = isShareLink;
      this.showMessage = false;
      clearInterval(window.messageTimer);
      window.messageTimer = setTimeout(() => {
        this.showMessage = false;
        this.isError = false;
      }, timeout);

      this.messageSubject = title;
      this.messageVerb = ` ${message}`;
      this.showMessage = true;
    });
  },
  beforeCreate() {
    document.body.className = 'recipes';
  }
}
</script>

<style lang="scss">
body.recipes {
  background: url('../assets/bg-recipes.jpg') no-repeat center center fixed;
  background-size: cover;
}

header {
  .header-inner {
    background-color: #fff;
    width: calc(100% - 234px);
    box-sizing: border-box;
    margin-left: auto;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px 0px;

    &.full-width {
      width: 100%;
    }

    #nav {
      text-align: left;

      > li:not(.mobile) {
        display: inline-block;

        > a.router-link-active {
          color: #000;
          font-weight: bold;
          border-bottom: solid 3px #e4ad3e;
        }
        
        > a {
          color: #555a5e;
          text-decoration: none;
          padding: 0 10px;
          line-height: 48px;
          height: 48px;
          display: inline-block;
          cursor: pointer;
          text-transform: uppercase;
          font-size: 15px;

          &:hover {
            color: #000;
          }
        }
      }

      li.search-container {
        border: solid 1px #b2c3d5;
        border-radius: 20px;
        padding: 0 45px 0 6px;
        position: relative;
        top: 8px;
        height: 32px;
        width: 185px;
        margin-left: 15px;
        position: absolute;

        .icon--magnifyingGlass {
          position: relative;
          top: 4px;

          svg {
            height: 25px;
            width: 25px;
            fill: #808080;
          }
        }

        form {
          position: relative;
          top: -25px;
          left: 28px;

          #search-input {
            height: 26px;
            width: 185px;
            font-size: 15px;
            outline: none;
            border: none;
          }
        }
      }

      li.account,
      li.logout {
        float: right;
      }
    }

    #search-results {
      position: absolute;
      z-index: 15;
      background-color: #fff;
      width: 340px;
      top: 39px;

      li.no-results {
        padding: 3px 15px;
        cursor: default;
        color: #706a6a;
      }

      li:not(.tag) {
        line-height: 20px;

        a {
          padding: 3px 15px;
          display: block;
          color: #000;
          text-decoration: none;

          &:hover {
            background-color: #008dff;
            color: #fff;
          }
        }
      }

      li.tag {
        margin: 0 0 5px 0;
        padding-left: 16px;

        &[data-tag-num="0"] {
          border-top: solid 1px #eee;
          margin-top: 6px;
          padding-top: 8px;
        }
      }
    }
  }

  #message-box {
    position: fixed;
    box-sizing: border-box;
    z-index: 100;
    background-color: white;
    max-width: 500px;
    bottom: 10px;
    right: 10px;
    padding: 20px;
    border-top: solid 5px #23d82f;
    line-height: 20px;
    right: -500px;
    transition: 1s;
    text-align: left;

    &.active {
      right: 20px;
    }

    &.error {
      border-top: solid 5px #f00;
    }

    &.share-link {
      border-top: solid 5px #089de3;

      .message-inner {
        .message-block {
          padding-right: 0;
          display: block;

          .message-verb {
            display: block;
            margin-top: 10px;
            float: right;
            width: 100%;
            clear: both;
            margin-right: 0;

            .icon--copy {
              height: 30px;
              width: 30px;
              margin: 4px 8px 0 8px;
              margin-right: 8px;
              float: left;
              cursor: pointer;

              &:hover {
                fill: #089de3;
              }
            }

            input {
              border: dashed 0.5px black;
              width: 380px;
              font-weight: 300;
              padding: 10px;
              overflow-y: auto;
              height: 18px;
              line-height: 18px;
              background-color: #f5f5f5;
            }
          }
        }
      }

    }

    .message-inner {
      .message-block {
        padding-right: 20px;

        .message-subject {
          font-weight: bold;
        }

        .message-verb {
          margin-right: 10px;
        }
      }
      .message-icon {
        display: inline-block;
        position: absolute;
        top: 20px;
        right: 20px;

        .icon--close {
          svg {
            fill: #4d4d4d;
            cursor: pointer;
            height: 22px;
            width: 22px;
          }
        }
      }
    }
  }
}
// Shared classes
.mobile {
  display: none;
}

.overlay {
  display: none;
  background-color: rgba(0, 0, 0, 0.32);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  padding: 0 0 100% 0;

  &.active {
    display: block;
  }
}

.btn {
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  padding: 10px 20px;
  background-image: url(../assets/arrow-long.png);
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-color: #089de3;

  &:hover {
    background-color: #23d82f;
  }
}

.box {
  background-color: white;
  padding: 10px 0;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #B9BCC0;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.3);
}

.tag {
  a,
  .tag-editable,
  .tag-suggestion,
  .tag-color-selection
   {
    border-radius: 14px;
    font-size: 13px;
    padding: 8px;
    margin-right: 8px;
    display: inline-block;
    color: white;
    text-decoration: none;
    

    &:hover {
      .tag-name,
      .tag-count {
        text-decoration: underline;
      }
    }

    .tag-count {
      margin-left: 4px;
    }
  }

  .tag-editable {
    cursor: default;
    position: relative;
    padding-right: 22px;

    &:hover {
      .tag-name {
        text-decoration: none;
      }
    }

    .tag-delete {
      position: absolute;
      top: 8px;
      cursor: pointer;

      &:hover::after {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        position: relative;
        top: -15px;
        border-radius: 51%;
        left: 3px;
        background-color: rgba(255, 255, 255, 0.5);
      }

      svg {
        padding-left: 4px;
        height: 12px;
        width: 12px;
      }
    }
  }
}

#tags {
  .tag {
    margin-bottom: 6px;
  }
}

.utility-tooltip {
  display: none;
  position: absolute;
  z-index: 5;
  background-image: url(../assets/caret.png);
  background-repeat: no-repeat;
  background-position-x: 4px;

  .utility-tooltip-text {
    background-color: #5f5d5d;
    color: white;
    padding: 10px;
    margin-top: 9px;
    border-radius: 4px;
    font-size: 13px;
  }
}


@media (min-width: 768px) {
  // ::-webkit-scrollbar {
  //   width: 10px;
  // }
  
  // /* Track */
  // ::-webkit-scrollbar-track {
  //   box-shadow: inset 0 0 6px rgba(178, 195, 213, 0.9); 
  //   -webkit-box-shadow: inset 0 0 6px rgba(178, 195, 213, 0.9); 
  //   -webkit-border-radius: 10px;
  //   border-radius: 10px;
  // }
  
  // /* Handle */
  // ::-webkit-scrollbar-thumb {
  //   -webkit-border-radius: 10px;
  //   border-radius: 10px;
  //   background: rgba(178, 195, 213, 0.6); 
  //   // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  // }
  // ::-webkit-scrollbar-thumb:window-inactive {
  //   background: rgba(246, 245, 245, 0.3); 
  // }
}

@media (max-width: 894px) {
  .chrome-ext-prefix {
    display: none;
  }
  .header .header-inner #nav li.search-container {
    margin-left: 5px;
  }
}


@import '@/styles/_recipes-mobile.scss';
@import '@/styles/_header-mobile.scss';
</style>

