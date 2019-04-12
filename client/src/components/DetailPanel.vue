<template>
  <div id="detail-panel">
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
    EventBus.$on('RECIPE_SELECTED', recipe => {
      console.log('RECIPE_SELECTED');
      this.recipe = recipe;
    });
  }
}
</script>



