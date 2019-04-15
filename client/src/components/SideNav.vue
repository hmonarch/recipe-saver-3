<template>
  <div id="side-nav">

    <div class="side-nav-logo">
      <img src="../assets/logo-37x37.png">
      <div class="side-nav-logo-text">Recipe Saver</div>
    </div>

    <div id="add-recipe" class="btn">Add New Recipe</div>

    <ul id="side-nav-menu">
			<li @click="selectView('all')" :class="{ active : view === 'all' }">
        <img class="side-nav-menu-icon" src="../assets/icon-card.png">
        <span>All Recipes</span>
      </li>
			<li @click="selectView('favorites')" :class="{ active : view === 'favorites' }">
        <img class="side-nav-menu-icon" src="../assets/icon-star.png">
        <span>Favorites</span>
      </li>
			<li @click="selectView('tags')" :class="{ active : view === 'tags' }">
        <img class="side-nav-menu-icon" src="../assets/icon-tag.png">
        <span>Tags</span>
      </li>
			<li @click="selectView('untagged')" :class="{ active : view === 'untagged' }">
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
  data() {
    return {
      view: 'all',
    };
  },
  methods: {
    selectView(view) {
      this.view = view;
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
  background-color: rgba(22, 22, 22, 0.76);
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
    border-radius: 8px;
  }

  #side-nav-menu {
    text-align: left;

    li {
      cursor: pointer;
      color: white;
      height: 32px;
      line-height: 32px;
      font-size: 18px;
      margin-bottom: 6px;
      padding: 0 0 0 15px;
      border-radius: 8px;
        
      &:hover {
        //background-color: #b2c3d5;
        background-color: rgba(228, 173, 62, 0.168);
        transition: .4s;
      }

      &.active {
        background-color: #e4ad3e;
      }

      .side-nav-menu-icon {
        width: 20px;
        margin-right: 12px;
        vertical-align: middle;
      }
    }
  }
}
</style>