<template>
  <div id="list-panel" class="panel">
    <div id="heading-and-sort">
      <h1 id="list-panel-heading">{{ heading }}</h1>

      <div id="sort" @click="sortVisible = !sortVisible">
        <span>Sort by: </span><span id="sort-selection">{{ sortBy }}</span>
        <img src="../assets/down-arrow.png">
      </div>

      <ul class="box" id="sort-options" v-show="sortVisible">
        <li class="sort-option" @click="selectSort">Newest</li>
        <li class="sort-option" @click="selectSort">Oldest</li>
        <li class="sort-option" @click="selectSort">A - Z</li>
        <li class="sort-option" @click="selectSort">Z - A</li>
        <li class="sort-option" @click="selectSort">Color</li>
      </ul>
		</div>

    <ul id="recipe-list">
      <li class="recipe-entry" v-for="recipe in recipes" :key="recipe.id" @click="selectRecipe(recipe.id)">
        <span class="recipe-entry-left">{{ recipe.title }}</span>
        <span class="recipe-entry-right">4/16/19</span>
      </li>
    </ul>
  </div>
</template>

<script>
// Event Bus
import EventBus from '@/EventBus';

export default {
  data() {
    return {
      heading: 'All Recipes',
      sortBy: null,
      sortVisible: false,
      recipes: [
        {
          id: 1,
          title: 'Steak with Creamy Pan Sauce Recipe',
        },
        {
          id: 2,
          title: 'Juicy Lucy Burger Recipe'
        },
        {
          id: 3,
          title: 'Figgy Balsamic Pork'
        },
        {
          id: 4,
          title: 'Stealing Whiskey'
        },
        {
          id: 5,
          title: 'Skillet-Seared Tomatoes with Melted Gruyere'
        },
      ]
    };
  },
  methods: {
    selectSort(e) {
      this.sortBy = e.target.innerText;
      this.sortVisible = false;
    },
    selectRecipe(id) {
      EventBus.$emit('RECIPE_SELECTED', id);
    }
  },
  mounted() {
    EventBus.$on('VIEW_SELECTED', view => {
      console.log('VIEW_SELECTED');
      this.heading = view;
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

          &:hover {
            background-color: #008dff;
            color: white;
          }
        }
      }
  }

  #recipe-list {
    .recipe-entry {
      clear: both;
      position: relative;
      overflow: auto;
      border-top: solid 1px #dadada;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      overflow-y: hidden;

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

