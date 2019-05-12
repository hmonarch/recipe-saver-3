
<template>
  <div id="recipes">

    <SideNav v-show="listOpen"></SideNav>
    <section id="panels">
      <ListPanel v-show="listOpen" :class="{ 'full-width' : detailsOpen === false }"></ListPanel>
      <DetailPanel v-show="detailsOpen" :class="{ 'full-width' : listOpen === false }" :screenModeText="screenModeText"></DetailPanel>
    </section>

    <div :class="{ 'active' : showMessage === true }" id="message-box">
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
import SideNav from './SideNav.vue';
import ListPanel from './ListPanel.vue';
import DetailPanel from './DetailPanel.vue';
import EventBus from '@/EventBus';
import Icon from '@/components/Icons';

export default {
  name: 'recipes',
  components: {
    SideNav,
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
    }
  },
  computed: {
    screenModeText() {
      return this.listOpen ? 'Full Screen' : 'Half Screen';
    }
  },
  mounted() {
    EventBus.$on('CLOSE_DETAILS', () => {
      // this.detailsOpen = false;
      // if (this.listOpen === false) this.listOpen = true;
    });
    EventBus.$on('TOGGLE_SCREEN', () => {
      this.listOpen = !this.listOpen;
    });
    EventBus.$on('RECIPE_SELECTED', () => {
      this.detailsOpen = true;
    });
    EventBus.$on('MESSAGE', (title, message) => {
      this.showMessage = false;
      clearInterval(window.messageTimer);
      window.messageTimer = setTimeout(() => {
        this.showMessage = false;
      }, 3000);

      this.messageSubject = title;
      this.messageVerb = ` ${message}`;
      this.showMessage = true;
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


// Shared classes
.btn {
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  padding: 10px 20px;
  background-image: url(../assets/arrow-long.png);
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-color: #089de3;

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
  a,
  .tag-editable,
  .tag-suggestion
   {
    border-radius: 14px;
    font-size: 13px;
    padding: 8px;
    margin-right: 8px;
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

  .tag-editable {
    cursor: default;
    position: relative;
    padding-right: 22px;

    &:hover {
      .tag-name {
        text-decoration: none;
      }
    }

    .tag-delete {
      position: absolute;
      top: 8px;
      cursor: pointer;

      &:hover::after {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        position: relative;
        top: -15px;
        border-radius: 51%;
        left: 3px;
        background-color: rgba(255, 255, 255, 0.5);
      }

      svg {
        padding-left: 4px;
        height: 12px;
        width: 12px;
      }
    }
  }
}

.utility-tooltip {
  display: none;
  position: absolute;
  z-index: 5;
  background-image: url(../assets/caret.png);
  background-repeat: no-repeat;
  background-position-x: 4px;

  .utility-tooltip-text {
    background-color: #5f5d5d;
    color: white;
    padding: 10px;
    margin-top: 9px;
    border-radius: 4px;
    font-size: 13px;
  }
}
</style>

