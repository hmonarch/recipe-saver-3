<template>
  <div id="list-panel" class="panel">
    <div id="heading-and-sort">
      <h1 id="list-panel-heading">{{ heading }}</h1>

      <div v-if="view !== 'tags'" id="sort" @click="sortVisible = !sortVisible">
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

    <ul v-if="view === 'tags'" id="tag-list" class="list-panel-body">
      <li class="recipe-entry" v-for="tag in sortedTags" :key="tag.id">
        <span class="recipe-entry-left">{{ tag.name }}</span>
      </li>
    </ul>

    <ul v-else id="recipe-list" class="list-panel-body">
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

export default {
  data() {
    return {
      view: 'all',
      sortBy: null,
      sortVisible: false,
      recipes: [],
      tags: []
    };
  },
  computed: {
    heading() {
      return this.view === 'all' ? 'all recipes': this.view;
    },
    sortedTags() {
      return this.tags.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      });
    }
  },
  methods: {
    selectRecipe(id) {
      EventBus.$emit('RECIPE_SELECTED', id);
    },
    sortRecipes(e, critea, order) {
      this.sortBy = e.target.innerText.toLowerCase();
      this.sortVisible = false;
      this.retrieveRecipes(this.view, this.sortBy);
    },
    formatDate(data) {
      return new Date(data).toLocaleDateString().replace(/\/20(\d\d)$/, '/$1');
    },
    async retrieveRecipes(view) { 
      const response = await RecipeService.getRecipes(view, this.sortBy);
      if (view === 'tags') {
        this.tags = response.data;
      } else this.recipes = response.data;
    },
  },
  created() {
    this.retrieveRecipes('all');
  },
  mounted() {
    EventBus.$on('VIEW_SELECTED', view => {
      this.view = view;
      this.retrieveRecipes(view);
    });
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
      display: inline-block;
      float: left;
      text-transform: capitalize;
    }

    #sort {
      margin-top: 10px;
      display: inline-block;
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

