<template>
  <div id="side-nav">

    <div class="side-nav-logo">
      <img src="../assets/logo-37x37.png">
      <div class="side-nav-logo-text">Recipe Saver</div>
    </div>

    <div id="add-recipe" class="btn">Add New Recipe</div>

    <ul id="side-nav-menu">
			<li @click="selectView()">
        <img class="side-nav-menu-icon" src="../assets/icon-card.png">
        <span>All Recipes</span>
      </li>
			<li @click="selectView('favorites')">
        <img class="side-nav-menu-icon" src="../assets/icon-star.png">
        <span>Favorites</span>
      </li>
			<li @click="selectView('tags')">
        <img class="side-nav-menu-icon" src="../assets/icon-tag.png">
        <span>Tags</span>
      </li>
			<li @click="selectView('untagged')">
        <img class="side-nav-menu-icon" src="../assets/icon-stack.png">
        <span>Untagged</span>
      </li>
		</ul>

  </div>
</template>

<script>
// Event Bus
import EventBus from '@/EventBus';

export default {
  methods: {
    selectView(view) {
      EventBus.$emit('VIEW_SELECTED', view);
    }
  }
}
</script>

<style lang="scss">
#side-nav {
  border: solid 1px black;
  width: 225px;
  float: left;
  background-color: rgba(22, 22, 22, 0.95);
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  color: white;
  padding: 20px;

  .side-nav-logo {
    display: flex;
    align-items: center;

    .side-nav-logo-text {
      margin-left: 12px;
      font-size: 23px;
    }
  }

  #add-recipe {
    margin: 62px auto 62px auto;
  }

  #side-nav-menu {
    text-align: left;
    margin-left: 10px;

    li {
      cursor: pointer;
      color: white;
      height: 38px;
      line-height: 38px;
      font-size: 18px;
      margin-bottom: 2px;

      .side-nav-menu-icon {
        width: 20px;
        margin-right: 12px;
        vertical-align: middle;
      }
    }
  }
}
</style>