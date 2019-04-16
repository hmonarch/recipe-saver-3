<template>
  <div id="detail-panel" class="panel">
    THIS IS THE DETAIL PANEL
    HERE IS THE RECIPE: {{ recipe }}
  </div>
</template>

<script>
// Event Bus
import EventBus from '@/EventBus';
import RecipeService from '@/services/RecipeService';

export default {
  data() {
    return {
      recipe: null
    };
  },
  methods: {
    async retrieveRecipe() {
      const recipeID = this.$route.query.id;
      if (!recipeID) return console.log('no recipe id');
      const response = await RecipeService.getRecipe(recipeID);
      this.recipe = response.data;
    },
  },
  mounted() {
    // EventBus.$on('RECIPE_SELECTED', id => {
    //   console.log('RECIPE_SELECTED');
    //   this.recipe = id;
    //   localStorage.lastAccessedRecipe = id
    // });
  },
  watch: {
    '$route.query': {
      handler() {
        console.log('hi!');
        this.retrieveRecipe();
      },
      immediate: true,
    }
  }
}
</script>

<style lang="scss">
#detail-panel {
  width: 40%;
  max-width: 700px;
  min-width: 305px;
  margin-right: auto;
  padding: 10px;
}
</style>

