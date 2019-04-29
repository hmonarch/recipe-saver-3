<template>
  <div id="list-panel" class="panel">
    <div id="heading-and-sort">
      <h1 id="list-panel-heading">{{ view }}</h1>


      <div id="layout-sort">
        <div id="sort" @click="sortVisible = !sortVisible">
          <span>Sort by: </span><span id="sort-selection">{{ sortBy }}</span>
          <img src="../assets/arrow-down-small.png">
        </div>

        <ul class="box" id="sort-options" v-show="sortVisible">
          <li class="sort-option" @click="sortRecipes($event, 'title', '-1')">a - z</li>
          <li class="sort-option" @click="sortRecipes($event, 'title', '1')">z - a</li>
          <li class="sort-option" @click="sortRecipes($event, 'creationDate', '1')">newest</li>
          <li class="sort-option" @click="sortRecipes($event, 'creationDate', '-1')">oldest</li>
        </ul>

        <div id="layout-toggle">
          <img v-show="imageLayout" class="layout-icon list-icon" src="../assets/layout-list-icon.svg" @click="imageLayout = !imageLayout">
          <div class="utility-tooltip">
            <div class="utility-tooltip-text">Image Layout</div>
          </div>
          <img v-show="!imageLayout" class="layout-icon image-icon" src="../assets/layout-image-icon.svg" @click="imageLayout = !imageLayout">
          <div class="utility-tooltip">
            <div class="utility-tooltip-text">List Layout</div>
          </div>
        </div>
      </div>
		</div>

    <div v-show="getTaggedView()" class="selected-tag" :style="backgroundColor(selectedTag.color)">
      <span class="tag-name">{{ selectedTag.name }}</span>
    </div>

    <ul id="recipe-list" class="list-panel-body" :class="{ 'image-layout' : imageLayout === true }">
      <li class="recipe-entry" v-for="recipe in recipes" :key="recipe.id" @click="selectRecipe(recipe._id)">
        <router-link :to="{ query: { id: recipe._id }}">
          <img class="recipe-image" :src="recipe.image || 'http://res.cloudinary.com/dormh2fvt/image/upload/v1527317481/placeholder_rjy55k.jpg'">
          <span class="recipe-entry-left">{{ recipe.title }}</span>
          <span class="recipe-entry-right">{{ formatDate(recipe.creationDate) }}</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import EventBus from '@/EventBus';
import RecipeService from '@/services/RecipeService';
import utils from '@/mixins/utils';
import SimpleBar from 'simplebar';


export default {
  data() {
    return {
      sortBy: null,
      sortVisible: false,
      imageLayout: false,
      recipes: [],
      selectedTag: {},
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
    createSimpleBar() {
      new SimpleBar(document.getElementById('list-panel'));
    },
    getViewName() {
      return this.$route.path.replace('/recipes/', '');
    },
    scrollToImage(id) {
      if (!document.querySelector('#list-panel').classList.contains('full-width') ||
        !document.querySelector('#recipe-list').classList.contains('image-layout')) { 
        return;
      }
      setTimeout(() => {
        const clickedRecipe = document.querySelector(`.recipe-entry a[href*="${id}"]`);
        const recipePos = clickedRecipe.offsetTop;
        document.querySelector('#list-panel .simplebar-content').scrollTop = recipePos - 20;
      }, 50);
    },
    selectRecipe(id) {
      this.scrollToImage(id);
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
      this.createSimpleBar();
    },
  },
  mounted() {
    EventBus.$on('TAG_SELECTED', tag => {
      this.selectedTag = tag;
    });
    EventBus.$on('RECIPE_SAVED', this.retrieveRecipes);
  },
  created() {
    this.initTag();
    document.addEventListener('click', e => {
      const isChildOfSort = e.target.closest('#sort-options') || e.target.closest('#sort') || e.target.matches('#sort');
      if (!isChildOfSort) {
        this.sortVisible = false;
      }
    });
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
  padding: 20px;
  width: 40%;
  max-width: 400px;
  min-width: 220px;
  margin-left: auto;
  margin-right: 20px;
  user-select: none;

  &.full-width {
    max-width: 100%;
    width: 1000px;
    margin: 0 auto;

    .list-panel-body.image-layout {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
    }

  }

  #heading-and-sort {
    overflow: auto;

    #list-panel-heading {
      margin: 0;
      font-size: 24px;
      margin-bottom: 20px;
      float: left;
      text-transform: capitalize;
    }

    #layout-sort {
      float: right;

      #sort {
        display: inline-block;
        margin-top: 10px;
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
    }

    #sort-options {
      z-index: 2;
      position: absolute;
      right: 24px;
      top: 54px;
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

    #layout-toggle {
      display: inline-block;
      margin-left: 12px;

      .layout-icon {
        width: 20px;
        position: relative;
        top: 4px;
        cursor: pointer;
        opacity: 0.7;

        &:hover + .utility-tooltip {
          display: inline-block;
          top: 50px;
          right: 6px;
        }

        &.image-icon + .utility-tooltip {
          background-position-x: 46px; 
        }

        &.list-icon + .utility-tooltip {
          background-position-x: 60px; 
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
    box-sizing: border-box;

    &.image-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
      justify-items: center;
      width: 100%;

      .recipe-entry {
        margin-bottom: 6px;

        a {
          height: auto;
          border: none;

          &.router-link-exact-active {

            .recipe-image {
              border: solid 1px #089de3
            }

            .recipe-entry-left,
            .recipe-entry-right {
              font-weight: 500;
            }
          }

          .recipe-image {
            display: inline;
            width: 100%;
            border: solid 1px #dadada;
            box-sizing: border-box;
          }

          .recipe-entry-left {
            line-height: 16px;
            font-size: 14px;
            max-height: 178px;
            position: relative;
            top: -2px;
          }

          .recipe-entry-right {
            background: rgba(0,164,228,.69);
            border-radius: 0 0 0 80px;
            padding-right: 3px;
            padding-top: 2px;
            color: white;
            padding-left: 14px;
            font-size: 12px;
            line-height: 20px;
            letter-spacing: 0.3px;
            right: 1px;
            top: 1px;
          }
        }
      }
    }


    .recipe-entry {
      a {
        color: #000;
        overflow: auto;
        display: block;
        clear: both;
        position: relative;
        overflow: auto;
        border-top: solid 1px #dadada;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        overflow-y: hidden;
        text-align: left;

        &.router-link-exact-active {
          color: #0093ff;
          font-weight: 600;
        }

        .recipe-image {
          display: none;
        }

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
}
</style>

