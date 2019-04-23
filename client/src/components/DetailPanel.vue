<template>
  <div id="detail-panel" class="panel">

    <ul id="utility-bar">
      <li>
        <div class="utility-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path xmlns="http://www.w3.org/2000/svg" d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16zm-127.2 92.5c-10 7.2-14.2 20.2-10.2 31.8l30.1 87.7c1.3 3.7-2.9 6.8-6.1 4.6l-77.4-55.2c-4.9-3.5-10.6-5.2-16.3-5.2-5.7 0-11.4 1.7-16.2 5.2l-77.4 55.1c-3.2 2.3-7.4-.9-6.1-4.6l30.1-87.7c4-11.8-.2-24.8-10.3-32l-81-57.1c-3.2-2.2-1.6-7.3 2.3-7.3H196c12 0 22.7-7.7 26.5-19.1l29.6-88.2c1.2-3.6 6.4-3.6 7.6 0l29.6 88.2c3.8 11.4 14.5 19.1 26.5 19.1h97.3c3.9 0 5.5 5 2.3 7.2l-79.6 57.5z"/>
          </svg>
        </div>
        <div class="utility-tooltip">
          <div class="utility-tooltip-text">Favorite</div>
        </div>
      </li>
      <li>
        <div class="utility-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M255.8 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM102 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM410 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38z"/>
          </svg>
        </div>
        <div class="utility-tooltip">
          <div class="utility-tooltip-text">Actions</div>
        </div>
      </li>
      <li>
        <div class="utility-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"/>
          </svg>
        </div>
        <div class="utility-tooltip">
          <div class="utility-tooltip-text">Close</div>
        </div>
      </li>
    </ul>

    <div id="title">{{ recipe.title }}</div>

    <div v-show="recipe.url" id="url">
      <a :href="recipe.url" target="_blank">{{ recipe.url }}</a>
    </div>

    <div id="description">
      <editor-menu-bar :editor="editor">
        <div slot-scope="{ commands, isActive }" class="menubar">

          <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
            <icon name="bold"/>
          </button>
          <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
            <icon name="italic"/>
          </button>
          <button class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
            <icon name="strike"/>
          </button>
          <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
            <icon name="underline"/>
          </button>
          <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
            <icon name="ul"/>
          </button>
          <button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
            <icon name="ol"/>
          </button>
          <button class="menubar__button" @click="commands.horizontal_rule">
            <icon name="hr"/>
          </button>
          <button class="menubar__button" @click="commands.undo">
            <icon name="undo"/>
          </button>
          <button class="menubar__button" @click="commands.redo">
            <icon name="redo"/>
          </button>

        </div>
      </editor-menu-bar>
      <editor-content :editor="editor" id="editor"></editor-content>
    </div>

    <ul id="tags">
      <li class="tag" v-for="tag in recipe.tags" :key="tag.id">
        <router-link :style="backgroundColor(tag.color)" :to="{path: `/recipes/tag/${tag.name}`}">
          <span class="tag-name">{{ tag.name }}</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import EventBus from '@/EventBus';
import utils from '@/mixins/utils';
import RecipeService from '@/services/RecipeService';
import Icon from '@/components/Icons';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  HardBreak,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';


export default {
  components: {
    EditorMenuBar,
    EditorContent,
    Icon
  },
  data() {
    return {
      recipe: {},
      editor: null
    };
  },
  mixins: [utils],
  methods: {
    async retrieveRecipe() {
      const recipeID = this.$route.query.id;
      if (!recipeID) return console.log('no recipe id');
      const response = await RecipeService.getRecipe(recipeID);
      this.recipe = response.data;
      this.editor.setContent(this.recipe.description);
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new HardBreak(),
        new BulletList(),
        new HorizontalRule(),
        new OrderedList(),
        new ListItem(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
      ],
    });
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  watch: {
    '$route.query': {
      handler() {
        this.retrieveRecipe();
      },
      immediate: true,
    }
  }
}
</script>

<style lang="scss">
#detail-panel {
  width: 40%;
  max-width: 700px;
  min-width: 305px;
  margin-right: auto;
  padding: 20px;

  #utility-bar {
    border-bottom: solid 1px #dadada;
    padding-bottom: 6px;
    margin-bottom: 20px;

    li {
      display: inline-block;
      height: 25px;
      width: 25px;

      &:hover {
        .utility-tooltip {
          display: inline-block;
        }
      }

      .utility-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
          height: 22px;
          width: 22px;

          path {
            fill: #4d4d4d;
          }
        }
      }

      .utility-tooltip {
        display: none;
        position: absolute;
        z-index: 1;
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

      &:last-child {
        float: right;

        .utility-tooltip {
          right: 0;
          background-position-x: 9px; 
        }
      }
    }
  }


  #title {
    line-height: 30px;
    font-size: 24px;
    margin-bottom: 20px;
  }

  #url {
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    a {
      color: #14aaf5;
      font-size: 14px;
    }
  }

  #description {
    border: solid 1px #dadada;
    margin-bottom: 20px;

    .menubar {
      padding: 10px 0 5px ;
      border-bottom: solid 1px #dadada;
      margin-bottom: 5px;

      .menubar__button {
        font-weight: 700;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        background: rgba(0,0,0,0);
        border: 0;
        color: #000;
        padding: .2rem .5rem;
        margin-right: .2rem;
        border-radius: 3px;
        cursor: pointer;

        &.is-active {
          background-color: rgba(0,0,0,.1);
        }
      }
    }

    #editor {
      > div {
        padding: 10px;
      }

      ol,
      ul {
        padding-left: 40px;
        margin: 15px 0;
        list-style-type: initial;
      }

      ol {
        list-style-type: decimal;
      }

      strong {
        font-weight: 600;
      }

      em {
        font-style: italic;
      }

    }
  }

  #tags {
    margin-bottom: 20px;

    li {
      display: inline-block;
      margin-right: 8px;
    }
  }
}

</style>

