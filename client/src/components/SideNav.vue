<template>
  <div id="side-nav">

    <div class="side-nav-logo">
      <img src="../assets/logo-37x37.png">
      <div class="side-nav-logo-text">Recipe Saver</div>
    </div>

    <div id="add-recipe" class="btn">New Recipe</div>

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
			<li>
        <a :class="{ active : view === 'tags' }" href="#">
          <img class="side-nav-menu-icon" src="../assets/icon-tag.png">
          <span>Tags</span>
        </a>

        <ul id="tag-list">
          <li class="tag" v-for="tag in sortedTags" :key="tag.id" @click="selectTag(tag)">
            <router-link :style="backgroundColor(tag.color)" :to="{path: `/recipes/tag/${tag.name}`}" @click="selectTag()">
              <span class="tag-name">{{ tag.name }}</span>
              <span class="tag-count">({{ tag.count }})</span>
            </router-link>
          </li>
        </ul>

      </li>
		</ul>

  </div>
</template>

<script>
import EventBus from '@/EventBus';
import RecipeService from '@/services/RecipeService';
import utils from '@/mixins/utils';

export default {
  data() {
    return {
      tags: [],
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
    async getTags() {
      const response = await RecipeService.getTags();
      this.tags = response.data;
      console.log(this.tags);
    },
    selectTag(tag) {
      EventBus.$emit('TAG_SELECTED', tag);
    }
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
  overflow-y: scroll;

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
    border-radius: 8px;
  }

  #side-nav-menu {
    text-align: left;

    li {
      a {
        display: block;
        text-decoration: none;
        cursor: pointer;
        color: white;
        height: 32px;
        line-height: 32px;
        font-size: 17px;
        margin-bottom: 6px;
        padding: 0 0 0 15px;
        border-radius: 8px;
        display: flex;
        align-items: center;
          
        &:hover {
          //background-color: #b2c3d5;
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
    }
  }

  #tag-list {
    background-color: rgba(0, 0, 0, 0.35);
    overflow: auto;
    padding: 20px 0 20px 26px;
    border-radius: 14px;

    li.tag {
      float: left;
      clear: both;
      padding: 0 13px;

      a {
        border-radius: 14px;
        font-size: 13px;
        padding: 0px 9px 0px 9px;

        .tag-count {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>