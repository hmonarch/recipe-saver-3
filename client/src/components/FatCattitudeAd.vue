<template>
  <div id="fat-cattitude" v-if="showAd">
    <span class="fc-close" @click="hideAd()">
      <Icon name="close"/>
    </span>
    <div class="fc-partner">Recipe Saver Partner</div>
    <a class="fc-link" href="https://www.fatcattitude.com/?partner=rs" target="_blank" @click="trackClick()">
      <div class="fc-product-title">T-Shirts for Fat Cats 😺</div>
      <div class="fc-biz-title">From Fat Cattitude</div>
      <img class="fc-image" src="https://res.cloudinary.com/dormh2fvt/image/upload/v1598069257/Fat%20Cattitude/fat-caturday.jpg">
    </a>
  </div>
</template>

<script>
import Icon from '@/components/Icons';
export default {
  components: {
    Icon,
  },
  data() {
    return {
      showAd: true
    };
  },
  methods: {
    hideAd() {
      this.showAd = false;
      sessionStorage.showAd = false;
    },
     trackClick() {
      this.$ga.event({
        eventCategory: 'Ad Click',
        eventAction: 'fat cattitude ad clicked'
      });
    }
  },
  mounted() {
  },
  created() {
    if (sessionStorage.showAd === 'false') {
      this.showAd = false;
    }
  }
}
</script>

<style lang="scss">
  #side-nav-menu-tags.open + .fat-cattitude-section {
    background-color: #000;
  }
  .fat-cattitude-section {
    position: absolute;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.38);
    &:empty {
      display: none;
    }

    #fat-cattitude {
      .fc-close {
        display: inline-block;
        position: absolute;
        right: 4px;
        top: 4px;
        z-index: 2;
        .icon--close {
          svg {
            height: 18px;
            height: 18px;
            color: #808080;
          }
        }
      }
      .fc-partner {
        color: #9a9a9a;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.2px;
        text-align: center;
        margin-bottom: 4px;
      }
      a {
        text-decoration: none;
      }
      .fc-product-title {
        color: #fff;
        line-height: 20px;
        text-align: center;
        margin-bottom: 4px;
      }
      .fc-biz-title {
        color: #dc782f;
        font-size: 14px;
        text-align: center;
        margin-bottom: 4px;
      }
      .fc-image {
        width: 100%;
      }
    }
  }
</style>