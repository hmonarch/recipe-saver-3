import Api from '@/services/Api';

export default {
  getTags(query) {
    return Api().get(`tags?search=${query ? query : null}`);
  },
  updateTagColor(data) {
    return Api().post('tag-color', data);
  },
  getRecipes(sort) {
    return Api().get(`${window.location.pathname}?sort=${sort}`);
  },
  getRecipe(id) {
    return Api().get(`recipe/${id}`);
  },
  searchRecipes(term) {
    return Api().get(`search/${term}`);
  },
  shareRecipe(id) {
    return Api().get(`share-recipe/${id}`);
  },
  updateRecipe(id, recipe, updateImage, removeImage) {

    const fd = new FormData();
    fd.append('favorite', recipe.favorite);
    fd.append('title', recipe.title);
    fd.append('url', recipe.url);
    fd.append('description', recipe.description);
    fd.append('tags', JSON.stringify(recipe.tags));

    if (removeImage) {
      fd.append('removeImage', true);
      console.log('removing image');
    }

    if (updateImage) {
      if (typeof(recipe.image) === 'object') {
        fd.append('image-asset', recipe.image);
      } else {
        fd.append('image', recipe.image);
      }
    }


    return Api().post(`recipe/${id ? id : 'new'}`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data;',
      }
    });

  },
  deleteRecipe(id) {
    return Api().delete(`recipe/${id}`);
  }
}