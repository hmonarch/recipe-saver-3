<template>
  <div id="list-panel" class="panel">
    <div id="heading-and-sort">
      <h1 id="list-panel-heading">{{ view }}</h1>

      <div id="sort" @click="sortVisible = !sortVisible">
        <span>Sort by: </span><span id="sort-selection">{{ sortBy }}</span>
        <img src="../assets/down-arrow.png">
      </div>

      <ul class="box" id="sort-options" v-show="sortVisible">
        <li class="sort-option" @click="sortRecipes($event, 'title', '-1')">a - z</li>
        <li class="sort-option" @click="sortRecipes($event, 'title', '1')">z - a</li>
        <li class="sort-option" @click="sortRecipes($event, 'creationDate', '1')">newest</li>
        <li class="sort-option" @click="sortRecipes($event, 'creationDate', '-1')">oldest</li>
      </ul>
		</div>

    <div v-show="getTaggedView()" class="selected-tag" :style="backgroundColor(selectedTag.color)">
      <span class="tag-name">{{ selectedTag.name }}</span>
      <span class="tag-count">({{ selectedTag.count }})</span>
    </div>

    <ul id="recipe-list" class="list-panel-body">
      <li class="recipe-entry" v-for="recipe in recipes" :key="recipe.id" @click="selectRecipe(recipe._id)">
        <span class="recipe-entry-left">{{ recipe.title }}</span>
        <span class="recipe-entry-right">{{ formatDate(recipe.creationDate) }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import EventBus from '@/EventBus';
import RecipeService from '@/services/RecipeService';
import utils from '@/mixins/utils';

export default {
  data() {
    return {
      sortBy: null,
      sortVisible: false,
      recipes: [],
      selectedTag: {}
    };
  },
  mixins: [utils],
  computed: {
    view() {
      let view = this.getViewName();
      view = (view === 'all') ? 'all recipes': view; 
      return view;
    }
  },
  methods: {
    initTag() {
      const name = this.getTaggedView();
      const selector = '#tag-list .tag';
      let color = '';
      let count = 0;
      this.waitFor(() => document.querySelector(selector),
      () => {
        [...document.querySelectorAll(selector)].forEach(tag => {
          if (tag.querySelector('.tag-name').innerText.trim() === name) {
            color = tag.querySelector('a').style.backgroundColor;
            count = tag.querySelector('.tag-count').innerText.trim().replace(/(\(|\))/g, '');
          }
        });
        this.selectedTag = { name, color, count };
      });
    },
    getViewName() {
      return this.$route.path.replace('/recipes/', '');
    },
    selectRecipe(id) {
      EventBus.$emit('RECIPE_SELECTED', id);
    },
    getTaggedView() {
      return (this.$route.path.match(/\/recipes\/tag\/(.+)/) || [])[1];
    },
    sortRecipes(e, critea, order) {
      this.sortBy = e.target.innerText.toLowerCase();
      this.sortVisible = false;
      this.retrieveRecipes(this.sortBy);
    },
    formatDate(data) {
      return new Date(data).toLocaleDateString().replace(/\/20(\d\d)$/, '/$1');
    },
    async retrieveRecipes() {
      const response = await RecipeService.getRecipes(this.sortBy);
      this.recipes = response.data;
    },
  },
  mounted() {
    EventBus.$on('TAG_SELECTED', tag => {
      this.selectedTag = tag;
    });
  },
  created() {
    this.retrieveRecipes();
    this.initTag();
  },
  watch: {
    '$route.params': {
      handler() {
        this.retrieveRecipes();
      },
      immediate: true,
    }
  }
}
</script>

<style lang="scss">
#list-panel {
  padding: 25px;
  width: 40%;
  max-width: 400px;
  min-width: 220px;
  margin-left: auto;
  margin-right: 20px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  #heading-and-sort {
    overflow: auto;

    #list-panel-heading {
      margin: 0;
      font-size: 24px;
      margin-bottom: 20px;
      float: left;
      text-transform: capitalize;
    }

    #sort {
      margin-top: 10px;
      float: right;
      background-image: linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%);
      background-position: bottom;
      background-size: 3px 1px;
      background-repeat: repeat-x;
      cursor: pointer;
      padding-bottom: 2px;

      #sort-selection {
        color: #089de3;
        font-weight: bold;
        text-transform: capitalize;
      }
    }

      #sort-options {
        z-index: 2;
        position: absolute;
        right: 24px;
        top: 65px;
        text-align: left;

        li {
          padding: 3px 15px;
          cursor: pointer;
          height: 20px;
          line-height: 20px;
          text-transform: capitalize;

          &:hover {
            background-color: #008dff;
            color: white;
          }
        }
      }
  }

  .selected-tag {
    border-radius: 15px;
    color: white;
    background-color: #fff;
    display: inline-block;
    padding: 8px;
    font-size: 12px;
    margin-bottom: 15px;

    .tag-count {
      margin-left: 4px;
    }
  }

  .list-panel-body {
    .recipe-entry {
      clear: both;
      position: relative;
      overflow: auto;
      border-top: solid 1px #dadada;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      overflow-y: hidden;
      text-align: left;

      .recipe-entry-left {
        float: left;
      }

      .recipe-entry-right {
        float: right;
        position: absolute;
        right: 0;
        z-index: 1;
        padding-left: 3px;
        color: #898e95;
        font-size: 14px;
        line-height: 30px;
        background-color: white;
        padding-left: 46px;
        background: -webkit-linear-gradient(-90deg, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0.3));
        background: -o-linear-gradient(-90deg, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0.3));
        background: -moz-linear-gradient(-90deg, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0.3));
        background: linear-gradient(-90deg, rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0.3));
      }
    }
  }
}
</style>

