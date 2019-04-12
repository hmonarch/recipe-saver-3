<template>
  <div id="detail-panel" class="panel">
    THIS IS THE DETAIL PANEL
    HERE IS THE RECIPE: {{ recipe }}
  </div>
</template>

<script>
// Event Bus
import EventBus from '@/EventBus';

export default {
  data() {
    return {
      recipe: null
    };
  },
  methods: {
  },
  mounted() {
    EventBus.$on('RECIPE_SELECTED', id => {
      console.log('RECIPE_SELECTED');
      this.recipe = id;
      localStorage.lastAccessedRecipe = id
    });
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

