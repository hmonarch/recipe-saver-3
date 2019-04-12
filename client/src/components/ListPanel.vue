<template>
  <div id="list-panel">
    <div id="heading-and-sort">
      <h1 id="list-panel-heading">All Recipes</h1>

      <div id="sort">
        Sort by: <span id="sort-selection"></span>
        <!-- <img src="images/down-arrow.png"> -->
      </div>

      <ul class="box" id="sort-options">
        <li class="sort-option" id="sort-newest">Newest</li>
        <li class="sort-option" id="sort-oldest">Oldest</li>
        <li class="sort-option" id="sort-a-z">A - Z</li>
        <li class="sort-option" id="sort-z-a">Z - A</li>
        <li class="sort-option" id="sort-color">Color</li>
      </ul>
		</div>

    <ul id="recipe-list">
      <li @click="selectRecipe">Chicken</li>
    </ul>
  </div>
</template>

<script>
// Event Bus
import EventBus from '@/EventBus';

export default {
  methods: {
    selectRecipe() {
      EventBus.$emit('RECIPE_SELECTED', 'chicken, yo');
    }
  }
}
</script>



