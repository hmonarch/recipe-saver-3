<template>
  <div id="site-preview-box" :class="{ 'detail': !listMode }">

    <div id="list-mode" v-if="listMode">
      <div id="heading-and-sort">
        <div class="heading">My Recipes</div>
        <div class="sort-section">
          <div id="sort" @click="sortVisible = true">
            <span>Sort by: </span>
            <span id="sort-selection">{{ sortBy }}</span>
          </div>
          <img v-if="imageView" @click="toggleImageView(false)" class="layout-icon list-icon" src="../assets/layout-list-icon.svg">
          <img v-else @click="toggleImageView(true)" class="layout-icon image-icon" src="../assets/layout-image-icon.svg">
        </div>

        <ul id="sort-options" v-show="sortVisible">
          <li class="sort-option" @click="sortRecipes($event, 'title', '-1')">a - z</li>
          <li class="sort-option" @click="sortRecipes($event, 'title', '1')">z - a</li>
          <li class="sort-option" @click="sortRecipes($event, 'date', '1')">newest</li>
          <li class="sort-option" @click="sortRecipes($event, 'date', '-1')">oldest</li>
        </ul>
      </div>

      <ul id="recipe-list" :class="{ 'image-view': imageView }">
        <li v-for="recipe in recipes" :key="recipe.title" class="recipe-entry" @click="showDetail(recipe.title)">
          <img :src="recipe.image">
          <span class="recipe-entry-left">{{ recipe.title }}</span>
          <span class="recipe-entry-right">{{ formatDate(recipe.date) }}</span>
        </li>
      </ul>
    </div>

    <div id="recipe-detail" v-else>
      <div class="top-bar">
        <div class="top-bar-icon" @click="toggleFavorite()">
          <Icon v-if="isFavorite" name="starFilled"/>
          <Icon v-else name="star"/>
        </div>
        <div class="top-bar-icon" @click="listMode = true">
          <Icon name="close"/>
        </div>
      </div>
      <div class="recipe-title">{{ recipe.title }}</div>
      <a class="recipe-url" :href="recipe.url" target="_blank">{{ recipe.url }}</a>
      <ul class="recipe-tags">
        <li v-for="tag in recipe.tags" :key="tag.name" :style="backgroundColor(tag.color)">{{ tag.name }}</li>
      </ul>
      <label>Ingredients</label>
      <ul class="recipe-ingredients">
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
      <label>Description</label>
      <ul class="recipe-description">
        <li v-for="line in recipe.description" :key="line">{{ line }}</li>
      </ul>
      <img class="recipe-image" :src="recipe.image">
    </div>

  </div>
</template>

<script>
import utils from '@/mixins/utils';
import Icon from '@/components/Icons';
import sitePreviewRecipes from '@/model/site-preview-recipes';

export default {
  name: 'site-preview-box',
  components: {
    Icon
  },
  mixins: [utils],
  data() {
    return {
      listMode: true,
      isFavorite: false,
      imageView: false,
      sortVisible: false,
      sortBy: 'Newest',
      recipes: sitePreviewRecipes,
      recipe: {},
    }
  },
  methods: {
    toggleImageView(imageView) {
      this.imageView = imageView;
    },
    sortRecipes(e, critea, order) {
      this.sortVisible = false;
      this.sortBy = e.target.innerText;

      this.recipes.sort((a, b) => {
        const oppositeOrder = (order == -1) ? 1 : -1;
        let itemA = a[critea];
        let itemB = b[critea];
        if (critea === 'title') {
          itemA = itemA.toLowerCase();
          itemB = itemB.toLowerCase();
        }	
        if (itemA < itemB) return Number(order);	
        else if (itemA > itemB) return Number(oppositeOrder);	
        else return 0;	
      });
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    showDetail(title) {
      this.recipe = this.recipes.find(recipe => recipe.title === title);
      this.listMode = false;
    }
  },
  created() {
    document.addEventListener('click', e => {

      // Sort Options Menu
      const isChildOfSort = e.target.closest('#sort-options') || e.target.closest('#sort') || e.target.matches('#sort');
      if (!isChildOfSort) {
        this.sortVisible = false;
      }
    });
  },
}
</script>

<style lang="scss">
#site-preview-box {
  position: relative;
  z-index: 10;
  background-color: #fff;
  border-radius: 4px;
  width: 665px;
  height: 365px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.24);
  font-family: 'Source Sans Pro', Arial;

  &.detail {
    overflow-y: auto;
  }

  #heading-and-sort,
  #recipe-list {
    padding: 12px;
  }

  #heading-and-sort {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    position: relative;
    z-index: 10;

    .heading {
      font-size: 22px;
      position: relative;
      top: 1px;
    }

    .sort-section {
      display: flex;

      #sort {
        position: relative;
        cursor: pointer;
        top: 4px;
        background-image: linear-gradient(to right, black 33%, rgba(255, 255, 255, 0) 0%);
        background-position: 0 18px;
        background-size: 3px 1px;
        background-repeat: repeat-x;

        #sort-selection {
          color: #089de3;
          font-weight: bold;
          text-transform: capitalize;
        }
      }

      .layout-icon {
        margin-left: 12px;
        cursor: pointer;
        width: 24px;
      }
    }

    #sort-options {
      z-index: 2;
      position: absolute;
      right: 41px;
      top: 44px;
      text-align: left;
      background-color: white;
      padding: 10px 0;
      border-radius: 3px 3px 3px 3px;
      border: 1px solid #B9BCC0;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);

      li {
        padding: 3px 21px;
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

  #recipe-list {
    font-size: 16px;
    position: relative;
    max-height: 291px;
    overflow-y: auto;

    &.image-view {
      display: grid;
      padding-top: 20px;
      padding-bottom: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      justify-items: center;
      box-sizing: border-box;
      max-height: 317px;
      
      .recipe-entry {
        height: auto;

        &:last-child {
          padding-bottom: 30px;
        }

        img {
          display: block;
          width: 100%;
        }

        .recipe-entry-left {
          line-height: 20px;
          font-size: 16px;
          max-height: 178px;
          position: relative;
          padding-top: 2px;
        }

        .recipe-entry-right {
          background: rgba(0, 164, 228, 0.69);
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

    .recipe-entry {
      color: #000;
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

      &:hover {
        color: #0093ff;
      }

      &:first-child {
        border: none;
      }

      img {
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
        color: #898e95;
        font-size: 14px;
        line-height: 30px;
        background-color: white;
        padding-left: 46px;
        background: linear-gradient(-90deg, white, white, white, rgba(255, 255, 255, 0.3));
      }

    }
  }

  #recipe-detail {
    padding: 20px;

    .top-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px #dadada;
      margin-bottom: 20px;
      padding-bottom: 8px;

      .top-bar-icon {
        .icon {
          cursor: pointer;

          svg {
            height: 22px;
            width: 22px;
          }
        }
      }
    }

    .recipe-title {
      line-height: 30px;
      font-size: 24px;
      margin-bottom: 12px;
    }

    .recipe-url {
      display: inline-block;
      color: #14aaf5;
      font-size: 14px;
      margin-bottom: 20px;
      line-height: 16px;
    }

    .recipe-tags {
      margin-bottom: 20px;

      li {
        background-color: rgb(222, 198, 136);
        border-radius: 14px;
        font-size: 13px;
        padding: 8px;
        margin-right: 8px;
        display: inline-block;
        color: white;
      }
    }

    label {
      font-weight: bold;
      display: inline-block;
      margin-bottom: 10px;
    }

    .recipe-ingredients {
      list-style-type: disc;
      padding-left: 20px;
      margin-bottom: 20px;

      li {
        margin-bottom: 5px;
      }
    }

    .recipe-description {
      margin-bottom: 20px;
      line-height: 20px;

      li {
        padding-bottom: 8px;
      }
    }

    .recipe-image {
      border-radius: 5px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;
      height: 285px;
      width: 285px;
      object-fit: cover;
    }
  }
}
</style>

