<template>
  <div id="recipes">
    recipes component
    <SideNav></SideNav>
    <ListPanel></ListPanel>
    <DetailPanel></DetailPanel>
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



