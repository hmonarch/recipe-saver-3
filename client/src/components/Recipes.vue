<template>
  <div id="recipes">

    <SideNav :class="{ 'full-screen-hide': !listOpen }"></SideNav>
    <Header></Header>
    <section id="panels">
      <ListPanel :class="{ 'list-open': listOpen, 'full-width' : detailsOpen === false }"></ListPanel>
      <DetailPanel :class="{ 'full-width' : listOpen === false, 'close': !detailsOpen, 'open': detailsOpen }" :screenModeText="screenModeText"></DetailPanel>
    </section>

    <div :class="{ 'active' : showMessage === true, 'error': isError === true }" id="message-box" class="box">
      <div class="message-inner">
        <div class="message-block">
          <span class="message-subject">{{ messageSubject }}</span>
          <span class="message-verb">{{ messageVerb }}</span>
        </div>
        <div @click="showMessage = false" class="message-icon">
          <icon name="close"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue';
import Header from '@/components/Header.vue';
import ListPanel from '@/components/ListPanel.vue';
import DetailPanel from '@/components/DetailPanel.vue';
import EventBus from '@/EventBus';
import Icon from '@/components/Icons';

export default {
  name: 'recipes',
  components: {
    SideNav,
    Header,    
    ListPanel,
    DetailPanel,
    Icon
  },
  data() {
    return {
      detailsOpen: true,
      listOpen: true,
      showMessage: false,
      messageSubject: null,
      messageVerb: null,
      isError: false,
    }
  },
  computed: {
    screenModeText() {
      return this.listOpen ? 'Full Screen' : 'Half Screen';
    }
  },
  mounted() {
    EventBus.$on('CLOSE_DETAILS', () => {
      this.detailsOpen = false;
      if (this.listOpen === false) this.listOpen = true;

      EventBus.$emit('LISTOPEN_HEADER', true);
    });
    EventBus.$on('TOGGLE_SCREEN', (forceListOpen) => {
      this.listOpen = forceListOpen || !this.listOpen;

      EventBus.$emit('LISTOPEN_HEADER', forceListOpen || this.listOpen);
    });
    EventBus.$on('NEW_RECIPE', () => {
      this.listOpen = false;
      this.detailsOpen = true;
      console.log('NEW_RECIPE, closed list, opened details')

      EventBus.$emit('LISTOPEN_HEADER', false);
    });
    EventBus.$on('RECIPE_SAVED', () => {
      this.listOpen = true;
      this.detailsOpen = true;
    });
    EventBus.$on('RECIPE_SELECTED', () => {
      this.detailsOpen = true;
    });
    EventBus.$on('MESSAGE', (title, message, isError, timeout = 3000) => {
      if (isError) this.isError = true;
      this.showMessage = false;
      clearInterval(window.messageTimer);
      window.messageTimer = setTimeout(() => {
        this.showMessage = false;
        this.isError = false;
      }, timeout);

      this.messageSubject = title;
      this.messageVerb = ` ${message}`;
      this.showMessage = true;
    });
  },
}
</script>

<style lang="scss">
#panels {
  height: calc(100% - 50px);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px 20px 0 20px;

  .panel {
    box-sizing: border-box;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 3px 0px;
    background-color: white;
    position: relative;
    text-align: left;
  }
}

#message-box {
  position: fixed;
  box-sizing: border-box;
  z-index: 100;
  background-color: white;
  max-width: 500px;
  bottom: 10px;
  right: 10px;
  padding: 20px;
  border-top: solid 5px #23d82f;
  line-height: 20px;
  right: -500px;
  transition: 1s;
  text-align: left;

  &.active {
    right: 20px;
  }

  &.error {
    border-top: solid 5px #f00;
  }

  .message-inner {
    .message-block {
      padding-right: 20px;

      .message-subject {
        font-weight: bold;
      }

      .message-verb {
        margin-right: 10px;
      }
    }
    .message-icon {
      display: inline-block;
      position: absolute;
      top: 20px;
      right: 20px;

      .icon--close {
        svg {
          fill: #4d4d4d;
          cursor: pointer;
          height: 22px;
          width: 22px;
        }
      }
    }
  }
}
</style>

