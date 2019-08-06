<template>
  <div id="site-preview-box">
    <div id="heading-and-sort">
      <div class="heading">All Recipes</div>
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
      <li v-for="recipe in recipes" :key="recipe.title" class="recipe-entry">
        <img :src="recipe.image">
        <span class="recipe-entry-left">{{ recipe.title }}</span>
        <span class="recipe-entry-right">{{ formatDate(recipe.date) }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import utils from '@/mixins/utils';

export default {
  name: 'site-preview-box',
  mixins: [utils],
  data() {
    return {
      imageView: false,
      sortVisible: false,
      sortBy: 'Newest',
      recipes: [
        {
          "title": "Gourmet Steak Burgers",
          "date": 1565063396975,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893343/lwqztod0hlbrj3mv3kll.jpg"
        },
        {
          "title": "Grilled Corn on the Cob with Garlic Butter",
          "date": 1562052210948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893333/cs1yzzvmdu1syynjvtek.jpg"
        },
        {
          "title": "Panna Cotta",
          "date": 1561062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893478/ptpkfxujscwg2a7eaush.jpg"
        },
        {
          "title": "Fluffy Pancakes",
          "date": 1560062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893337/rqknuttkdlkpiyll8ik7.jpg"
        },
        {
          "title": "Avocado on Toast with Lemon Zest",
          "date": 1555062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893337/jursvzqdn2ajcdlnv6ec.jpg"
        },
        {
          "title": "Roasted Rack of Lamb",
          "date": 1550062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893355/ry6fcpzt4npsbp9nhc2i.jpg"
        },
        {
          "title": "Eggplant with Spicy Garlic Sauce",
          "date": 1541002610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893504/qynou8arpuajdyrnbzek.jpg"
        },
        {
          "title": "4-Flavor Pork Belly",
          "date": 1535252610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893332/akepkkrhkbgwbbtk33zd.jpg"
        },
        {
          "title": "Oven-Roasted Sweet Potato Wedges",
          "date": 1530062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893341/yldit66vd9m4tzhcw6qv.jpg"
        },
        {
          "title": "Shack Shack Burger",
          "date": 1515062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893333/qrtnjlmgl9im9alvpwfm.jpg"
        },
        {
          "title": "Tartine with Grilled Peaches",
          "date": 1505062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893336/weogavskynzrifbruoxu.jpg"
        },
        {
          "title": "Vegan Jalapeno Poppers",
          "date": 1501062610948,
          "image": "https://res.cloudinary.com/dormh2fvt/image/upload/v1564893354/u4w5fgckko9hirt5nzo3.jpg"
        }
      ]
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
  background-color: #fff;
  border-radius: 4px;
  width: 665px;
  height: 365px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.24);
  font-family: 'Source Sans Pro', Arial;

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

  @media (min-width: 768px) {
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(178, 195, 213, 0.9); 
      -webkit-box-shadow: inset 0 0 6px rgba(178, 195, 213, 0.9); 
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: rgba(178, 195, 213, 0.6); 
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
    ::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(246, 245, 245, 0.3); 
    }
  }
}
</style>

