<template>
  <div id="recipes">
    <SideNav></SideNav>
    <section id="panels">
      <ListPanel></ListPanel>
      <DetailPanel></DetailPanel>
    </section>
  </div>
</template>

<script>
// Components
import SideNav from './SideNav.vue';
import ListPanel from './ListPanel.vue';
import DetailPanel from './DetailPanel.vue';

export default {
  name: 'recipes',
  components: {
    SideNav,
    ListPanel,
    DetailPanel
  }
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

  .panel {
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 3px 0px;
    background-color: white;
    position: relative;
    margin-top: 15px;
    overflow-y: auto;
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
</style>

