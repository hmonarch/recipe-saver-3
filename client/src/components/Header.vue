<template>
  <header>
    <div class="header-inner">
      <ul id="nav">
        <li class="my-recipes">
          <router-link :to="{ path: '/recipes/all' }">
            My Recipes
          </router-link>
        </li>
        <li>
          <a href="https://chrome.google.com/webstore/detail/recipe-saver-extension/opemcijjekbnjccecheklfbflnkoacai" target="_blank">Chrome Extension</a>
        </li>
        <li class="search-container">
          <icon name="magnifyingGlass"/>
          <form @submit.prevent="test()">
            <input id="search-input" @keyup="debounceSearch($event)" type="text" placeholder="Search Recipes">
          </form>
        </li>

        <li class="logout">
          <a>Logout</a>
        </li>
        <li class="account">
          <a>Account</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import EventBus from '@/EventBus';
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
    };
  },
  mixins: [utils],
  methods: {
    debounceSearch: debounce(function(e) {
      this.search(e);
    }, 300),
    search(e) {
      console.log(e);
    }
  },
  mounted() {

  },
}
</script>

<style lang="scss">
header {
  .header-inner {
    background-color: white;
    width: calc(100% - 234px);
    box-sizing: border-box;
    margin-left: auto;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px 0px;

    #nav {
      text-align: left;

      li {
        display: inline-block;

        &.my-recipes {
          a {
            color: #000;
            border-bottom: solid 3px #e4ad3e;
          }
        }

        a {
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
  }
}
</style>

