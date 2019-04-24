<template>
  <div id="recipes">
    <SideNav></SideNav>
    <section id="panels">
      <ListPanel :class="{ 'full-width' : detailsOpen === false }"></ListPanel>
      <DetailPanel v-show="detailsOpen"></DetailPanel>
    </section>
  </div>
</template>

<script>
import SideNav from './SideNav.vue';
import ListPanel from './ListPanel.vue';
import DetailPanel from './DetailPanel.vue';
import EventBus from '@/EventBus';



export default {
  name: 'recipes',
  components: {
    SideNav,
    ListPanel,
    DetailPanel
  },
  data() {
    return {
      detailsOpen: true
    }
  },
  mounted() {
    EventBus.$on('CLOSE_DETAILS', () => {
      this.detailsOpen = false;
    });
    EventBus.$on('RECIPE_SELECTED', () => {
      this.detailsOpen = true;
    });
  },
}
</script>

<style lang="scss">
body {
  background: url('../assets/bg-recipes.jpg') no-repeat center center fixed;
  background-size: cover;
}

#panels {
  height: calc(100% - 50px);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0 20px;

  .panel {
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 3px 0px;
    background-color: white;
    position: relative;
    overflow-y: auto;
    text-align: left;
  }
}


// Shared classes
.btn {
  width: 167px;
  text-align: center;
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  font-size: 18px;
  cursor: pointer;
  background-color: #089de3;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0,0,0,0.3);

  &:hover {
    background-color: #23d82f;
  }
}

.box {
  background-color: white;
  padding: 10px 0;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #B9BCC0;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.3);
}

.tag {
  a {
    border-radius: 14px;
    font-size: 13px;
    padding: 8px;
    display: inline-block;
    color: white;
    margin-bottom: 6px;
    text-decoration: none;
    

    &:hover {
      .tag-name,
      .tag-count {
        text-decoration: underline;
      }
    }

    .tag-count {
      margin-left: 4px;
    }
  }
}
</style>

