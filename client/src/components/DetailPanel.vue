<template>
  <div id="detail-panel" class="panel">

    <ul id="utility-bar">
      <li>
        <div class="utility-btn">
          <icon name="star"/>
        </div>
        <div class="utility-tooltip">
          <div class="utility-tooltip-text">Favorite</div>
        </div>
      </li>
      <li id="more-actions-container">
        <div class="utility-btn" @click="actionsVisible = !actionsVisible">
          <icon name="dots"/>
        </div>
        <div class="utility-tooltip">
          <div class="utility-tooltip-text">Actions</div>
        </div>
        <ul v-show="actionsVisible" id="more-actions-menu" class="box">
          <li @click="editRecipe()">Edit Recipe</li>
          <li @click="fullScreen()">Full Screen</li>
          <li @click="print()">Print</li>
          <li>Delete Recipe</li>
        </ul>  
      </li>
      <li @click="closeDetails()">
        <div class="utility-btn">
          <icon name="close"/>
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
      <div id="description-read-only"></div>
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
      <li class="tag" v-for="tag in recipe.tags" :key="tag.id" @click="selectTag(tag)">
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
      editor: null,
      actionsVisible: false,
      editMode: false,
    };
  },
  mixins: [utils],
  methods: {
    selectTag(tag) {
      EventBus.$emit('TAG_SELECTED', tag);
    },
    async retrieveRecipe() {
      const recipeID = this.$route.query.id;
      if (!recipeID) return console.log('no recipe id');
      const response = await RecipeService.getRecipe(recipeID);
      this.recipe = response.data;
      this.editor.setContent(this.recipe.description);
    },
    closeDetails() {
      EventBus.$emit('CLOSE_DETAILS');
    },
    editRecipe() {
      this.actionsVisible = false;
      this.editMode = true;
      this.editor.setOptions({editable: false})
    },
    print() {
      this.actionsVisible = false;
      window.print();
    },
    fullScreen() {
      this.actionsVisible = false;
      EventBus.$emit('CLOSE_LIST');
    }
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
  created() {
    document.addEventListener('click', e => {
      const isChildOfMoreActions = e.target.closest('#more-actions-container') || e.target.matches('#more-actions-container');
      if (!isChildOfMoreActions) {
        this.actionsVisible = false;
      }
    });
  },
  beforeDestroy() {
    this.editor.destroy();
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

  &.full-width {
    max-width: 100%;
    width: 1000px;
    margin: 0 auto;
  }

  #utility-bar {
    border-bottom: solid 1px #dadada;
    padding-bottom: 6px;
    margin-bottom: 20px;

    > li {
      display: inline-block;
      height: 25px;
      width: 25px;
      position: relative;

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

  #more-actions-menu {
    z-index: 2;
    position: absolute;
    text-align: left;
    width: 144px;
    left: 2px;

    li {
      padding: 3px 15px;
      cursor: pointer;
      text-transform: capitalize;
      height: 20px;
      line-height: 20px;

      &:last-child {
        margin-top: 10px;
        border-top: solid 1px #dadada;
      }

      &:hover {
        background-color: #008dff;
        color: white;
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
      font-size: 14.5px;
      line-height: 20px;

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

