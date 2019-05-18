<template>
  <div id="app">
    <router-view/>
    <div class="mobile overlay" @click="closeMenus" :class="{ 'active': showOverlay === true }"></div>
  </div>
</template>

<script>
import EventBus from '@/EventBus';
export default {
  data() {
    return {
      showOverlay: false,
    }
  },
  methods: {
    closeMenus() {
      EventBus.$emit('CLOSE_MENUS');
      this.showOverlay = false;
    }
  },
  mounted() {
    EventBus.$on('SHOW_MOBILE_MENU', () => {
      this.showOverlay = true;
    });
    EventBus.$on('NEW_RECIPE', () => {
      this.showOverlay = false;
    });
  },
  watch: {
    '$route': {
      handler() {
        this.showOverlay = false;
      }
    },
  }
}
</script>


<style lang="scss">
@import '@/styles/_reset.scss';

html,
body,
#app,
#recipes {
  height: 100%;
}

#app {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
