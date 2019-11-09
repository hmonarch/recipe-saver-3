<template>
  <div id="share">
    <div id="share-container">

      <div v-if="recipe._id" class="actions">
        <div v-if="!importedRecipeID" @click="addToMyRecipes()" class="add">Add To My Recipes</div>
        <div v-else class="added-block">
          <icon name="checkCircle"/>
          <span class="recipe-added">Recipe added to your collection!</span>
          <router-link class="recipe-added-link" :to="{ path: `/recipes/all?id=${importedRecipeID}` }">Go to recipe</router-link>
        </div>
        <div v-show="errorMessage" class="error-message">
          <icon name="info"/>
          <router-link class="error-message-text" :to="{ path: '/login' }">
            Please login to save this recipe
          </router-link>
        </div>
      </div>

      <div class="panel">

        <div class="title">{{ recipe.title }}</div>

        <div class="url">
          <a :href="recipe.url" target="_blank">{{ recipe.url }}</a>
        </div>
        
        <div class="description" v-html="recipe.description"></div>

        <img v-show="recipe.image" class="image" :src="getRecipeImage()">

      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icons';
import RecipeService from '@/services/RecipeService';

export default {
  components: {
    Icon
  },
  data() {
    return {
      recipe: {},
      errorMessage: null,
      importedRecipeID: null,
    };
  },
  computed: {
  },
  methods: {
    async retrieveRecipe() {
      const recipeID = encodeURIComponent(this.$route.params.recipe);
      const response = await RecipeService.retrieveSharedRecipe(recipeID);
      this.recipe = response.data;

      if (!response.data) {
        this.recipe = {
          title: 'Recipe Not Found',
          description: 'The recipe you requested may have been deleted by it\'s owner.'
        }
      }
    },
    getRecipeImage() {
      return this.recipe.image;
    },
    async addToMyRecipes() {
      this.errorMessage = null;
      const recipeID = encodeURIComponent(this.$route.params.recipe);
      const response = await RecipeService.addSharedRecipe(recipeID);

      if (response.data.error === 'User not logged in') {
        return this.errorMessage = 'Please login to save this recipe';
      } 

      this.importedRecipeID = response.data.recipeID;
    }
  },
  created() {
    this.retrieveRecipe();
  },
  beforeCreate() {
    document.body.className = 'share';
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

    .icon {
      height: 30px;
      width: 30px;
      margin-right: 6px;
    }

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

    .added-block,
    .error-message {
      display: flex;
      align-items: center;
      font-weight: bold;
      padding: 10px;

      a:hover {
        text-decoration: none;
      }
    }

    .added-block {
      background-color: #b0f8b0;
      color: #04a41f;
      margin-top: 3px;

      .recipe-added-link {
        margin-left: 10px;
        color: #14a2bc;
      }
    }

    .error-message {
      color: #ff0000;
      background-color: #ffd1d0;
      margin-top: 12px;

      a {
        color: #ff0000;
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
    padding: 10px;

    #share-container {
      width: 100%;
    }

    .panel {
      .image {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>

