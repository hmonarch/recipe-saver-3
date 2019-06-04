<template>
  <div id="share">
    <!-- <SideNav></SideNav>
    <Header></Header> -->

    <div id="share-container">

      <div class="actions">
        <div class="add">Add To My Recipes</div>
      </div>

      <div class="panel">

        <div class="title">Zucchini Nachos</div>

        <div class="url">
          <a href="https://www.allrecipes.com/recipe/268088/zucchini-nachos/?internalSource=staff%20pick&amp;referringId=742&amp;referringContentType=Recipe%20Hub" target="_blank">https://www.allrecipes.com/recipe/268088/zucchini-nachos/?internalSource=staff%20pick&amp;referringId=742&amp;referringContentType=Recipe%20Hub</a>
        </div>
        
        <div class="description">
          <ol>
            <li>
              <p>Cut zucchini into 1/4-inch slices using a mandoline slicer. Place slices in a colander, sprinkle with salt, and toss to coat. Let drain for 30 minutes. Place slices on a clean kitchen towel and pat dry.</p>
            </li>
            <li>
              <p>Preheat the oven to 400 degrees F (200 degrees C). Line a 12x18-inch baking sheet with parchment paper.</p>
            </li>
            <li>
              <p>Heat oil in a skillet over medium-high heat. Add onion and saute until translucent, 2 to 3 minutes. Add chicken and cook until lightly browned, breaking meat up into small crumbles, 5 to 6 minutes. Drain and discard any accumulated liquid.</p>
            </li>
            <li>
              <p>Return skillet to low heat and stir in chili powder, paprika, cumin, garlic powder, salt, oregano, and black pepper. Keep warm.</p>
            </li>
            <li>
              <p>Place zucchini slices on the prepared baking pan in a single layer.</p>
            </li>
            <li>
              <p>Bake in the preheated oven for 5 minutes.</p>
            </li>
            <li>
              <p>Remove zucchini from oven and top with chicken mixture and shredded Cheddar cheese. Return to the hot oven and bake until cheese is melted, 2 to 3 minutes more.</p>
            </li>
            <li>
              <p>Top nachos with dollops of sour cream, pico de gallo, jalapeno, and green onions. Serve immediately.</p>
            </li>
          </ol>
        </div>

        <img class="image" src="https://res.cloudinary.com/dormh2fvt/image/upload/v1559617965/r6ozxoarfasi55mkin1p.jpg">

      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Icon from '@/components/Icons';
import SideNav from '@/components/SideNav.vue';
import RecipeService from '@/services/RecipeService';

export default {
  components: {
    Header,
    Icon,
    SideNav
  },
  data() {
    return {
      recipe: {}
    };
  },
  computed: {

  },
  methods: {
    async retrieveRecipe() {
      const recipeID = decodeURIComponent(this.$route.params.recipe);
      if (!recipeID) return console.log('no recipe id');
      const response = await RecipeService.retrieveSharedRecipe(recipeID);
      this.recipe = response.data;
      console.log(response.data)
    },
  },
  created() {
    this.retrieveRecipe();
  }
}
</script>

<style lang="scss">
#share {
  background: linear-gradient(45deg, #6100ff 0%, #74d2ff 100%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  #share-container {
    width: 600px;
    margin: 0 auto;
    border-radius: 3px;
    max-height: 80%;
    overflow-y: auto;
  }

  .actions {
    margin-bottom: 20px;
    text-align: left;

    .add {
      color: #fff;
      display: inline-block;
      background-color: #e4ad3e;
      padding: 12px 60px 12px 20px;
      background-image: url(../assets/arrow-long.png);
      background-repeat: no-repeat;
      background-position: right 20px center;
      box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 3px 0px;
      cursor: pointer;

      &:hover {
        background-color: #089de3;
      }
    }
  }

  .panel {
    border-radius: 3px;
    padding: 20px;
    text-align: left;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 3px 0px;

    .title {
      line-height: 30px;
      font-size: 24px;
      margin-bottom: 12px;
      text-align: center;
    }

    .description,
    .url {
      margin-bottom: 20px;
    }

    .url {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      a {
        color: #14aaf5;
        font-size: 14px;
      }
    }

    .description {
      font-size: 16px;
      line-height: 20px;

      ol,
      ul {
        padding-left: 40px;
        margin: 15px 0;
        list-style-type: initial;
      }

      ol {
        list-style-type: decimal;
      }

      li {
        margin-bottom: 2px;
      }

      strong {
        font-weight: 600;
      }

      em {
        font-style: italic;
      }
    }

    .image {
      border-radius: 5px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;
      height: 285px;
      width: 285px;
      object-fit: cover;
    }
  }
}

@media (max-width: 767px) {
  #share {
    padding: 20px;

    #share-container {
      width: 100%;
    }
  }
}
</style>

