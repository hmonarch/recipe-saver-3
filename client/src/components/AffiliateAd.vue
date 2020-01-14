<template>
  <div id="affiliate" v-if="showAd">
    <span class="srf-close" @click="hideAd()">
      <Icon name="close"/>
    </span>
    <div class="srf-partner">Recipe Saver Partner</div>
    <a class="srf-link" href="https://www.shareasale.com/m-pr.cfm?merchantID=51308&userID=2269612&productID=914293645" target="_blank">
      <div class="srf-product-title">Dry-Aged American Wagyu Bone-In NY Strip</div>
      <div class="srf-biz-title">From Snake River Farms</div>
      <img class="srf-image" src="../assets/wagyu-ad.jpg">
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
  #side-nav-menu-tags.open + .srf-section {
    background-color: #000;
  }

  .srf-section {
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

    #affiliate {
      .srf-close {
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

      .srf-partner {
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

      .srf-product-title {
        color: #fff;
        line-height: 20px;
        text-align: center;
        margin-bottom: 4px;
      }

      .srf-biz-title {
        color: #dc782f;
        font-size: 14px;
        text-align: center;
        margin-bottom: 4px;
      }

      .srf-image {
        width: 100%;
      }
    }
  }
</style>

