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
            <input id="search-input" @keyup="debounceSearch($event)" v-model="searchTerm" type="text" placeholder="Search Recipes">
          </form>
          <ul v-if="searchResultsVisible" id="search-results" class="box">
            <li v-show="!recipeSearchResults.length && !tagSearchResults.length" class="no-results">No results</li>

            <li v-for="recipe in recipeSearchResults.slice(0, 8)" :key="recipe._id">
              <router-link :to="{ query: { id: recipe._id }}">
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
      searchTerm: '',
      recipeSearchResults: [],
      tagSearchResults: [],
      searchResultsVisible: false,
    };
  },
  mixins: [utils],
  methods: {
    debounceSearch: debounce(function(e) {
      this.search(e);
    }, 300),
    async search(e) {
      if (this.searchTerm.trim() === '') return this.searchResultsVisible = false;
      this.searchResultsVisible = true;
      const response = await RecipeService.searchRecipes(this.searchTerm.trim());
      this.recipeSearchResults = response.data.recipeResults;
      this.tagSearchResults = response.data.tagResults;
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
}
</script>

<style lang="scss">
header {
  .header-inner {
    background-color: #fff;
    width: calc(100% - 234px);
    box-sizing: border-box;
    margin-left: auto;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px 0px;

    #nav {
      text-align: left;

      > li {
        display: inline-block;

        &.my-recipes {
          a {
            color: #000;
            border-bottom: solid 3px #e4ad3e;
          }
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
}
</style>

