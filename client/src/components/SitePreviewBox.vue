<template>
  <div class="site-preview-box-and-controls">
    <div class="site-preview-box" @click="hasEngaged = true" :class="{ 'detail': !listOrImageMode, 'full-size': hasEngaged }">

      <div id="list-mode" v-if="listOrImageMode">
        <div id="heading-and-sort">
          <div class="heading">My Recipes</div>
          <div class="sort-section">
            <div id="sort" @click="sortVisible = true">
              <span>Sort by: </span>
              <span id="sort-selection">{{ sortBy }}</span>
            </div>
            <img v-if="imageView" @click="setListView()" class="layout-icon list-icon" src="../assets/layout-list-icon.svg">
            <img v-else @click="setImageView()" class="layout-icon image-icon" src="../assets/layout-image-icon.svg">
          </div>

          <ul id="sort-options" v-show="sortVisible">
            <li class="sort-option" @click="sortRecipes($event, 'title', '-1')">a - z</li>
            <li class="sort-option" @click="sortRecipes($event, 'title', '1')">z - a</li>
            <li class="sort-option" @click="sortRecipes($event, 'date', '1')">newest</li>
            <li class="sort-option" @click="sortRecipes($event, 'date', '-1')">oldest</li>
          </ul>
        </div>

        <ul id="recipe-list" :class="{ 'image-view': imageView }">
          <li v-for="recipe in recipes" :key="recipe.title" class="recipe-entry" @click="setDetailView(recipe.title)">
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
          <div class="top-bar-icon" @click="closeDetailView()">
            <Icon name="close"/>
          </div>
        </div>
        <div class="recipe-title">{{ recipe.title }}</div>
        <div class="recipe-url-container">
          <a class="recipe-url" :href="recipe.url" target="_blank">{{ recipe.url }}</a>
        </div>
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

    <div class="site-preview-controls-container">
      <ul class="site-preview-controls" @click="hasEngaged = true">
        <li @click="setListView()" :class="{ active: activeItem === 'List' }">List View</li>
        <li @click="setImageView()" :class="{ active: activeItem === 'Image' }">Image View</li>
        <li @click="setDetailView()" :class="{ active: activeItem === 'Detail' }">Detail View</li>
        <li class="selection"></li>
      </ul>

      <div class="site-preview-cta-container">
        <router-link :to="{ path: '/login' }" class="site-preview-cta">Start Now</router-link>
      </div>
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
      listOrImageMode: true,
      imageView: false,
      isFavorite: false,
      activeItem: 'List',
      sortVisible: false,
      sortBy: 'Newest',
      recipes: sitePreviewRecipes,
      recipe: {},
      hasEngaged: false,
    }
  },
  methods: {
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
    setListView() {
      this.setActiveItem('List');
      this.listOrImageMode = true;
      this.imageView = false;
    },
    setImageView() {
      this.setActiveItem('Image');
      this.listOrImageMode = true;
      this.imageView = true;
    },
    setDetailView(title) {
      this.setActiveItem('Detail');
      this.listOrImageMode = false;
      if (title) {
        this.recipe = this.recipes.find(recipe => recipe.title === title);
      } else {
        this.recipe = this.recipes[0];
      }
    },
    closeDetailView() {
      if (this.imageView) this.setImageView();
      else this.setListView();
    },
    setActiveItem(item) {
      this.activeItem = item;
      let selectionDivPos = -124;

      switch(item) {
        case 'List':
          selectionDivPos = -124;
          break;
        case 'Image':
          selectionDivPos = -83;
          break;
        case 'Detail':
          selectionDivPos = -42;
          break;
      }

      document.querySelector('.site-preview-controls li.selection').style = `    transform: translateY(${selectionDivPos}px);`;
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
.site-preview-box-and-controls {
  display: flex;
  justify-content: space-around;
  padding-left: 50px;

  .site-preview-box {
    position: relative;
    z-index: 10;
    background-color: #fff;
    border-radius: 4px;
    width: 665px;
    height: 365px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.24);
    font-family: 'Source Sans Pro', Arial;
    transition: all .25s ease;

    &.detail {
      overflow-y: auto;
    }

    &.full-size {
      height: 440px;

      #recipe-list {
        max-height: 371px;

        &.image-view {
          max-height: 392px;
        }
      }
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
      transition: all .25s ease;

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

      .recipe-url-container {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .recipe-url {
          display: inline-block;
          color: #14aaf5;
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 16px;
        }
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

  .site-preview-controls-container {
    .site-preview-controls {
      width: 200px;
      box-sizing: border-box;
      box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.24);
      background-color: #f4f4f4;
      border-radius: 4px;
      padding: 10px;
      height: 140px;
      position: relative;
      
      li {
        font-size: 15px;
        padding: 8px 8px 8px 38px;
        border-radius: 2px;
        margin-bottom: 10px;
        cursor: pointer;
        color: #6772e5;
        font-weight: 600;
        position: relative;
        z-index: 10;;
        transition: all .25s ease;

        &:not(.selection)::before {
          content: '';
          width: 22px;
          height: 24px;
          display: inline-block;
          background-size: 22px 24px;
          background-repeat: no-repeat;
          position: absolute;
          left: 5px;
          top: 4px;
        }

        &:hover {
          color: #000;
        }
        
        &.active {
          color: #24b47e;
        }

        &.selection {
          box-shadow: 0 2px 4px rgba(50,50,93,.1);
          background-color: #fff;
          position: absolute;
          z-index: 0;
          height: 16px;
          width: 69%;
          transform: translateY(-124px);
        }
      }

      li:nth-child(1) {
        &::before {
          background-image: url(../assets/layout-list-icon-purple.svg);
        }

        &.active::before {
          background-image: url(../assets/layout-list-icon-green.svg);
        }
      }

      li:nth-child(2) {
        &::before {
          background-image: url(../assets/layout-image-icon-purple.svg);
        }

        &.active::before {
          background-image: url(../assets/layout-image-icon-green.svg);
        }
      }

      li:nth-child(3) {
        &::before {
          background-image: url(../assets/icon-clipboard-purple.svg);
        }

        &.active::before {
          background-image: url(../assets/icon-clipboard-green.svg);
        }
      }
    }

    .site-preview-cta-container {
      margin-top: 20px;

      .site-preview-cta {
        box-sizing: border-box;
        width: 100%;
        display: inline-block;
        background-color: #3ecf8e;
        font-size: 16px;
        color: #fff;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        transition: all .15s ease;
        letter-spacing: 0.9px;
        padding: 15px 60px 15px 20px;
        background-image: url(../assets/arrow-long.png);
        background-repeat: no-repeat;
        background-position: right 20px center;
        text-decoration: none;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
        }
      }
    }
  }
}
</style>

