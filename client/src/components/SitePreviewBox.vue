<template>
  <div id="site-preview-box">
    <div id="heading-and-sort">
      <div class="heading">All Recipes</div>
      <div class="sort-section">
        <div id="sort">
          <span>Sort by: </span>
          <span id="sort-selection">a - z</span>
        </div>
        <img class="layout-icon image-icon" src="../assets/layout-image-icon.svg">
      </div>

		</div>

    <ul id="recipe-list">
      <li v-for="recipe in recipes" :key="recipe.title" class="recipe-entry">
        <img :src="recipe.image">
        <span class="recipe-entry-left">{{ recipe.title }}</span>
        <span class="recipe-entry-right">{{ recipe.date }}</span>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  name: 'site-preview-box',
  data() {
    return {
      recipes: [
        {
          title: '4-Flavor Pork Belly',
          date: '6/7/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893332/akepkkrhkbgwbbtk33zd.jpg'
        },
        {
          title: 'Grilled Corn on the Cob with Garlic Butter',
          date: '2/4/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893333/cs1yzzvmdu1syynjvtek.jpg'
        },
        {
          title: 'Shack Shack Burger',
          date: '12/10/18',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893333/qrtnjlmgl9im9alvpwfm.jpg'
        },
        {
          title: 'Tartine with Grilled Peaches',
          date: '8/30/18',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893336/weogavskynzrifbruoxu.jpg'
        },
        {
          title: 'Avocado on Toast with Lemon Zest',
          date: '8/1/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893337/jursvzqdn2ajcdlnv6ec.jpg'
        },
        {
          title: 'Fluffy Pancakes',
          date: '8/16/10',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893337/rqknuttkdlkpiyll8ik7.jpg'
        },
        {
          title: 'Oven-Roasted Sweet Potato Wedges',
          date: '1/2/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893341/yldit66vd9m4tzhcw6qv.jpg'
        },
        {
          title: 'Gourmet Steak Burgers',
          date: '3/3/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893343/lwqztod0hlbrj3mv3kll.jpg'
        },
        {
          title: 'Vegan Jalapeno Poppers',
          date: '3/15/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893354/u4w5fgckko9hirt5nzo3.jpg'
        },
        {
          title: 'Roasted Rack of Lamb',
          date: '1/20/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893355/ry6fcpzt4npsbp9nhc2i.jpg'
        },
        {
          title: 'Eggplant with Spicy Garlic Sauce',
          date: '4/16/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893504/qynou8arpuajdyrnbzek.jpg'
        },
        {
          title: 'Panna Cotta',
          date: '2/25/19',
          image: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1564893478/ptpkfxujscwg2a7eaush.jpg'
        }
      ]
    }
  }
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

    .heading {
      font-size: 22px;
      position: relative;
      top: 1px;
    }

    .sort-section {
      display: flex;

      #sort {
        position: relative;
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

        &.image-icon {
          width: 24px;
        }
      }
    }
  }

  #recipe-list {
    font-size: 16px;
    position: relative;
    max-height: 291px;
    overflow-y: auto;

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

