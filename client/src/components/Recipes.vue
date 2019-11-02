<template>
  <div id="recipes">

    <SideNav :class="{ 'full-screen-hide': !listOpen }"></SideNav>
    <Header></Header>
    <section id="panels">
      <ListPanel :class="{ 'list-open': listOpen, 'full-width': !detailsOpen }"></ListPanel>
      <DetailPanel :class="{ 'full-width': !listOpen, 'close': !detailsOpen, 'open': detailsOpen }" :screenModeText="screenModeText" :isPaidPlan="isPaidPlan"></DetailPanel>
    </section>

    <input id="rs-id" type="hidden" :value="rs_id">
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue';
import Header from '@/components/Header.vue';
import ListPanel from '@/components/ListPanel.vue';
import DetailPanel from '@/components/DetailPanel.vue';
import EventBus from '@/EventBus';
import Icon from '@/components/Icons';
import MiscService from '@/services/MiscService';



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
      rs_id: null,
      isPaidPlan: null,
      detailsOpen: true,
      listOpen: true,
    }
  },
  computed: {
    screenModeText() {
      return this.listOpen ? 'Full Screen' : 'Half Screen';
    }
  },
  methods: {
    async retrieveUserData() {
      const response = await MiscService.getUserInfo();
      this.rs_id = response.data.rs_id;
      this.isPaidPlan = response.data.isPaidPlan;

      const event = new CustomEvent('signin',
        { detail: this.rs_id }
      );
      document.dispatchEvent(event);
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

      EventBus.$emit('LISTOPEN_HEADER', false);
    });
    EventBus.$on('RECIPE_SAVED', () => {
      this.listOpen = true;
      this.detailsOpen = true;
    });
    EventBus.$on('RECIPE_SELECTED', () => {
      this.detailsOpen = true;
    });

    
    this.retrieveUserData();
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
</style>

