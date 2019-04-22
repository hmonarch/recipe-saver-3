<template>
  <div id="detail-panel" class="panel">
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
  </div>
</template>

<script>
import EventBus from '@/EventBus';
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
}

</style>

