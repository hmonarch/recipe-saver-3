<template>
  <div id="side-nav">

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
        <a @click.prevent.self="toggleTagList">
          <img class="side-nav-menu-icon" src="../assets/icon-tag.png">
          <span>Tags</span>
          <svg viewBox="0 0 64 36.26">
            <g><path d="M35,35,62.75,7.31a4.28,4.28,0,1,0-6-6.06L32,26,7.29,1.25a4.28,4.28,0,0,0-6,6.06L29,35a4.4,4.4,0,0,0,3,1.25A4.26,4.26,0,0,0,35,35Zm0,0">
            </path></g>
          </svg>
        </a>

        <div id="tag-list-container">
          <ul id="tag-list">
            <li class="tag" v-for="tag in sortedTags" :key="tag.id" @click="selectTag(tag)">
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
import SimpleBar from 'simplebar';

export default {
  data() {
    return {
      tags: [],
      tagListOpen: (localStorage.tagListOpen === 'true') ? true : false,
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
      this.createSimpleBar();
      window.tagColorMap = {};
      this.tags.forEach(tag => {
        window.tagColorMap[tag.name] = tag.color;
      });
    },
    createSimpleBar() {
      new SimpleBar(document.getElementById('tag-list-container'));
    },
    selectTag(tag) {
      EventBus.$emit('TAG_SELECTED', tag);
    },
  },
  mounted() {
    EventBus.$on('RECALUCATE_TAGS', this.getTags);
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
      font-size: 23px;
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

          > a svg {
            transform: rotate(180deg);
          }

          #tag-list-container {
            display: block;
          }
        }

        > a {
          display: block;

          svg {
            height: 8px;
            position: relative;
            top: 13px;
            right: 11px;
            float: right;

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

</style>