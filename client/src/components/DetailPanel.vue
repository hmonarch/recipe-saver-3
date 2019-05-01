<template>
  <div id="detail-panel" class="panel" :class="{ 'edit-mode' : editMode === true }">

    <ul id="utility-bar">
      <li>
        <div class="utility-btn" @click="toggleFavorite()">
          <icon v-if="recipe.favorite" name="starFilled"/>
          <icon v-else name="star"/>
        </div>
        <div class="utility-tooltip">
          <div class="utility-tooltip-text">{{ favoriteToggleText }}</div>
        </div>
      </li>
      <li id="more-actions-container">
        <div class="utility-btn" @click="actionsVisible = !actionsVisible">
          <icon name="dots"/>
        </div>
        <div class="utility-tooltip" v-show="!actionsVisible">
          <div class="utility-tooltip-text">Actions</div>
        </div>
        <ul v-show="actionsVisible" id="more-actions-menu" class="box">
          <li @click="editRecipe()">Edit Recipe</li>
          <li @click="toggleSreen()">{{ screenModeText }}</li>
          <li @click="print()">Print</li>
          <li v-if="!confirmActive" @click="confirmActive = true">Delete Recipe</li>
          <li v-else @click="deleteRecipe()" class="confirm-delete">Confirm Delete</li>
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

    <div v-if="!editMode" id="title-read-only">{{ recipe.title }}</div>
    <div v-else id="title-edit">
      <label>Title</label>
      <input v-model="recipe.title" id="title-input" type="text">
    </div>

    <div v-if="recipe.url && !editMode" id="url-read-only">
      <a :href="recipe.url" target="_blank">{{ recipe.url }}</a>
    </div>
    <div v-else-if="recipe.url === ''" style="display: none;"></div>
    <div v-else id="url-edit">
      <label>URL</label>
      <input v-model="recipe.url" id="url-input" type="text">
    </div>

    <label v-show="editMode">Ingredients / Description</label>
    <div v-show="recipe.description || editMode" id="description">
      <editor-menu-bar :editor="editor" v-show="editMode === true">
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
      <editor-content :editor="editor" id="editor" v-model="recipe.description"></editor-content>
    </div>

    <div v-show="recipe.image || editMode" class="recipe-image-container">
      <img v-if="!editMode" class="recipe-image" :src="recipeImage">
      <img v-else class="recipe-image recipe-image-preview" :src="imagePreview || blankImage">
      <div class="recipe-image-overlay" v-show="editMode">
        <form id="image-form" onsubmit="event.preventDefault();">
          <div class="recipe-image-overlay-text">
            <span class="recipe-image-overlay-text-drag">Drag Photo Here</span>
            <span class="recipe-image-overlay-text-prefer">Or, if you prefer...</span>
          </div>
          <button @click="triggerUpload()" id="image-input-btn">Choose File</button>
          <input type="file" id="image-input" accept="image/*" @change="handleImage" ref="imageInput">
        </form>
      </div>
    </div>

    <ul id="tags">
      <li class="tag" v-for="tag in recipe.tags" :key="tag.id" @click="selectTag(tag)">
        <router-link :style="backgroundColor(tag.color)" :to="{path: `/recipes/tag/${tag.name}`}">
          <span class="tag-name">{{ tag.name }}</span>
        </router-link>
      </li>
    </ul>

    <div v-show="editMode" class="save-cancel">
      <div @click="cancel()" class="cancel">Cancel</div>
      <div @click="saveRecipe()" class="save-recipe btn">Save</div>
    </div>

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
  props: ['screenModeText'],
  data() {
    return {
      recipe: {},
      editor: null,
      actionsVisible: false,
      editMode: true,
      confirmActive: false,
      imagePreview: '',
      blankImage: 'https://res.cloudinary.com/dormh2fvt/image/upload/v1556591475/blank_z9ggqs.jpg',
      imageAsset: null,
    };
  },
  mixins: [utils],
  beforeUpdate() {
    if (!this.recipe._id) this.closeDetails();
  },
  methods: {
    selectTag(tag) {
      EventBus.$emit('TAG_SELECTED', tag);
    },
    removeEditMode() {
      this.editMode = false;
      if (this.editor) {
        this.editor.setOptions({editable: false});
      }
      this.imagePreview = '';
    },
    async retrieveRecipe() {
      const recipeID = this.$route.query.id;
      if (!recipeID) return console.log('no recipe id');
      const response = await RecipeService.getRecipe(recipeID);
      this.recipe = response.data;
      this.editor.setContent(this.recipe.description);
    },
    toggleFavorite() {
      this.recipe.favorite = !this.recipe.favorite;
      const message = this.recipe.favorite ? 'favorited' : 'unfavorited';
      this.saveRecipe(message);
    },
    closeDetails() {
      this.removeEditMode();
      EventBus.$emit('CLOSE_DETAILS');
    },
    editRecipe() {
      this.actionsVisible = false;
      this.editMode = true;
      this.editor.setOptions({editable: true});
    },
    print() {
      this.actionsVisible = false;
      this.removeEditMode();
      setTimeout(window.print, 100);
    },
    confirmDelete() {
      this.actionsVisible = false;
      this.removeEditMode();
    },
    async deleteRecipe() {
      this.confirmActive = false;
      const recipeTitle = this.recipe.title;
      const response = await RecipeService.deleteRecipe(this.recipe._id);
      if (response.status !== 200) return console.log('Error deleting recipe');

      this.closeDetails();
      EventBus.$emit('MESSAGE', recipeTitle, 'deleted');
      EventBus.$emit('RECALUCATE_TAGS');

      const query = Object.assign({}, this.$route.query);
      delete query.id;
      this.$router.replace({ query });
    },
    toggleSreen() {
      this.actionsVisible = false;
      EventBus.$emit('TOGGLE_SCREEN');
    },
    saveDescription() {
      // Since tiptap does not use v-model we need to save the description manually
      const editorHTML = this.editor.getHTML();
      if (editorHTML === '<p></p>') {
        this.recipe.description = '';
      } else {
        this.recipe.description = this.editor.getHTML();
      }
    },
    cancel() {
      this.removeEditMode();
    },
    async saveRecipe(message = 'was saved!') {
      this.saveDescription();
      const response = await RecipeService.updateRecipe(this.recipe._id, this.recipe);
      this.removeEditMode();
      EventBus.$emit('RECIPE_SAVED');
      EventBus.$emit('MESSAGE', this.recipe.title, message);
    },
    triggerUpload() {
      this.$refs.imageInput.click();
    },
    handleImage(e, imageObj) {

      // imageObj is the result of a drag and drop
      if (imageObj) {
        if (imageObj.url) {
          this.imagePreview = imageObj.url;
          this.imageAsset = imageObj.url;
          return;
        } else {
          this.imageAsset = imageObj.image;
        }
      } else {
        this.imageAsset = e.target.files[0];
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.imageAsset);
      reader.addEventListener('load', e => {
        this.imagePreview = e.target.result;
      });

    }
  },
  computed: {
    favoriteToggleText() {
      return this.recipe.favorite ? 'Unfavorite' : 'Favorite';
    },
    recipeImage() {
      return this.recipe.image || 'https://res.cloudinary.com/dormh2fvt/image/upload/v1556591475/blank_z9ggqs.jpg';
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
    // The editor must be set to false first or editor buttons won't work
    this.editor.setOptions({editable: false});

    EventBus.$on('RECIPE_SELECTED', () => {
      // this.editMode = false;
    });

    const dropArea = document.querySelector('.recipe-image-overlay');
    dropArea.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/html', null);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => {
        dropArea.classList.add('highlight');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove('highlight');
      });
    });


    dropArea.addEventListener('drop', e => {
      const imageURL = e.dataTransfer.getData('Text');

      const draggedImage = {
        image: e.dataTransfer.files[0],
        url: imageURL ? imageURL : null,
      };

      this.handleImage(e, draggedImage);
    });


  },
  created() {
    document.addEventListener('click', e => {

      // More actions click off
      const isChildOfMoreActions = e.target.closest('#more-actions-container') || e.target.matches('#more-actions-container');
      if (!isChildOfMoreActions) {
        this.actionsVisible = false;
      }

      // Confirm delete click off
      const isMoreActions = e.target.matches('.confirm-delete');
      if (!isMoreActions) {
        this.confirmActive = false;
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
    },
    '$route': {
      handler() {
        this.removeEditMode();
      }
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
    width: 900px;
    margin: 0 auto;
  }

  &.edit-mode {
    border: solid 2px #0093ff;
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

      .utility-btn:hover {
        & + .utility-tooltip {
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

      &:last-child {
        float: right;

        .utility-tooltip {
          right: -4px;
          background-position-x: 25px;
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

        &.confirm-delete {
          background-color: red;
          color: #fff;
        }
      }

      &:hover {
        background-color: #008dff;
        color: white;
      }
    }
  }

  label {
    display: block;
    letter-spacing: 0.4px;
    font-size: 14px;
    color: #757a80;
  }

  #title-read-only {
    line-height: 30px;
    font-size: 24px;
    margin-bottom: 12px;
  }

  #url-read-only,
  #url-edit,
  #title-input {
    margin-bottom: 20px;
  }

  #url-read-only {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    a {
      color: #14aaf5;
      font-size: 14px;
    }
  }

  #url-input,
  #title-input {
    display: block;
    width: 100%;
    height: 38px;
    line-height: 38px;
    padding: 0 5px;
    margin-top: 5px;
    color: #757a80;
    box-sizing: border-box;
    border: solid 1px #dadada;
  }

  #description {
    border: solid 1px #dadada;
    margin-top: 5px;
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
        outline: 0;
        word-break: break-word;
        min-height: 100px;
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

  .recipe-image-container {
    position: relative;

    .recipe-image {
      border-radius: 5px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;
      height: 285px;
      width: 285px;
      object-fit: contain;
    }

    .recipe-image-overlay {
      position: absolute;
      z-index: 1;
      width: 100%;
      top: 0;
      width: 287px;
      height: 285px;
      color: #fff;
      border: dashed 4px #ddd;
      text-align: center;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.05);

      &.highlight {
        border: solid 2px #089de3;
        background-color: rgba(48, 152, 255, 0.1);
      }

      .recipe-image-overlay-text {
        color: #000;
        background-color: #ffffff9e;
        display: block;
        width: 185px;
        padding: 10px 0;
        margin: 80px auto 12px auto;

        .recipe-image-overlay-text-drag,
        .recipe-image-overlay-text-prefer {
          display: block;
        }

        .recipe-image-overlay-text-drag {
          font-size: 20px;
          margin-bottom: 4px;
        }
      }

      #image-input-btn {
        outline: 0;
        border: none;
        background-color: #089de3;
        color: #fff;
        padding: 10px 20px;
        display: inline-block;

        &:hover {
          background-color: #23d82f;
        }
      }

      #image-input {
        display: none;
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

  .save-cancel {
    display: flex;
    justify-content: space-between;

    .save-recipe,
    .cancel {
      cursor: pointer;
      height: 42px;
      line-height: 42px;
      width: 140px;
      box-sizing: border-box;
      padding: 0 20px;
    }

    .save-recipe {
      color: #fff;
    }

    .cancel {
      border: solid 1px #c1c1c1;
      color: #c1c1c1;
      text-align: center;
      
      &:hover {
        background-color: #c1c1c1;
        color: #fff;
      }
    }
  }
  
}

</style>

