<template>
  <div id="side-nav" :class="{ 'open': mobileMenuOpen === true }">

    <div class="side-nav-logo">
      <img src="../assets/logo-37x37.png">
      <div class="side-nav-logo-text">Recipe Saver</div>
    </div>

    <div id="add-recipe" class="btn" @click="addNewRecipe()">New Recipe</div>

    <ul id="side-nav-menu">
			<li>
        <router-link :class="{ active : view === 'all' }" :to="{ path: '/recipes/all' }">
          <img class="side-nav-menu-icon" src="../assets/icon-card.png">
          <span>All Recipes</span>
        </router-link>
      </li>
			<li>
        <router-link :class="{ active : view === 'favorites' }" :to="{ path: '/recipes/favorites' }">
          <img class="side-nav-menu-icon" src="../assets/icon-star.png">
          <span>Favorites</span>
        </router-link>
      </li>
			<li>
        <router-link :class="{ active : view === 'untagged' }" :to="{ path: '/recipes/untagged' }">
          <img class="side-nav-menu-icon" src="../assets/icon-stack.png">
          <span>Untagged</span>
        </router-link>
      </li>
			<li id="side-nav-menu-tags" :class="{ open : tagListOpen === true }">
        <a @click.prevent.self="toggleTagList()">
          <img class="side-nav-menu-icon" src="../assets/icon-tag.png">
          <span>Tags</span>
          <icon name="caret"/>
        </a>

        <div id="tag-list-container" :class="{ open : tagListOpen === true }">
          <div @click="toggleTagList()" class="mobile back-arrow">
            <icon name="caret"/>
          </div>

          <ul id="tag-list">
            <li class="tag" v-for="tag in sortedTags" :key="tag.id">
              <router-link :style="backgroundColor(tag.color)" :to="{path: `/recipes/tag/${tag.name}`}">
                <span class="tag-name">{{ tag.name }}</span>
                <span class="tag-count" :data-tag-count="tag.count">({{ tag.count }})</span>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
		</ul>
  </div>
</template>

<script>
import EventBus from '@/EventBus';
import RecipeService from '@/services/RecipeService';
import utils from '@/mixins/utils';
import Icon from '@/components/Icons';

export default {
  components: {
    Icon
  },
  data() {
    return {
      tags: [],
      tagListOpen: (localStorage.tagListOpen === 'true') ? true : false,
      mobileMenuOpen: false,
    };
  },
  mixins: [utils],
  computed: {  
    view() {
      return this.$route.path.replace('/recipes/', '');
    },
    sortedTags() {
      return this.tags.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      });
    }
  },
  methods: {
    addNewRecipe() {
      EventBus.$emit('NEW_RECIPE');
    },
    toggleTagList() {
      localStorage.tagListOpen = !this.tagListOpen;
      this.tagListOpen = !this.tagListOpen;
    },
    async getTags() {
      const response = await RecipeService.getTags();
      this.tags = response.data;
      window.tagColorMap = {};
      this.tags.forEach(tag => {
        window.tagColorMap[tag.name] = tag.color;
      });
    },
  },
  mounted() {
    EventBus.$on('RECALUCATE_TAGS', this.getTags);
    EventBus.$on('SHOW_MOBILE_MENU', () => {
      this.mobileMenuOpen = true;
    });
    EventBus.$on('CLOSE_MENUS', () => {
      this.closeMenus = false;
      this.mobileMenuOpen = false;
    });
  },
  created() {
    this.getTags();
  }
}
</script>

<style lang="scss">
#side-nav {
  border: solid 1px black;
  width: 234px;
  float: left;
  background-color: rgba(22, 22, 22, 0.76);
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  color: white;
  padding: 20px;
  overflow-y: hidden;

  .side-nav-logo {
    display: flex;
    align-items: center;

    .side-nav-logo-text {
      margin-left: 12px;
      font-size: 22px;
      font-family: 'Merriweather', serif;
    }
  }

  #add-recipe {
    margin: 62px auto 62px auto;
  }

  #side-nav-menu {
    text-align: left;

    > li {
      > a {
        display: block;
        text-decoration: none;
        cursor: pointer;
        color: white;
        height: 32px;
        line-height: 32px;
        font-size: 17px;
        margin-bottom: 6px;
        padding: 0 0 0 15px;
        display: flex;
        align-items: center;
          
        &:hover {
          background-color: rgba(228, 173, 62, 0.168);
          transition: .4s;
        }

        &.active {
          background-color: #e4ad3e;
        }

        .side-nav-menu-icon {
          width: 20px;
          margin-right: 12px;
          vertical-align: middle;
        }
      }

      &#side-nav-menu-tags {
        &.open {
          background-color: rgba(0, 0, 0, 0.35);

          > a {
            svg {
              transform: rotate(180deg);
            }
          }

          #tag-list-container {
            display: block;
          }
        }

        > a {
          display: block;

          .icon--caret {
            float: right;
          }

          svg {
            height: 8px;
            position: relative;
            right: 6px;

            path {
              fill: white;
              
            }
          }
        }
      }
    }
  }

  #tag-list-container {
    overflow: auto;
    padding: 5px 0 20px 26px;
    max-height: calc(100vh - 417px);
    display: none;

    #tag-list {
      .tag {
        clear: both;
        margin-left: 14px;
        margin-bottom: 6px;
      }
    }
  }

}
@import '@/styles/_side-nav-mobile.scss';
</style>