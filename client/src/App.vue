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

    // Show functionality warning for IE
    if (/MSIE|Trident\//.test(window.navigator.userAgent) &&
        !document.querySelector('.ie-warning')) {
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="ie-warning"><b>Warning:</b> Recipe Saver is not supported for Internet Explorer. Please download a different browser to use this application.</div>
      `);
    }
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

.ie-warning {
  background-color: #f00;
  color: #fff;
  padding: 30px;
  text-align: center;
}
</style>
