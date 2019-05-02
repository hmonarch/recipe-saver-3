import Api from '@/services/Api';

export default {
  getTags() {
    return Api().get('tags');
  },
  getRecipes(sort) {
    return Api().get(`${window.location.pathname}?sort=${sort}`);
  },
  getRecipe(id) {
    return Api().get(`recipe/${id}`);
  },
  updateRecipe(id, recipe, image) {

    // If the image was an object use a second request to handle upload
    if (image && typeof(image) === 'object') {
      const fd = new FormData();
      fd.append('image-asset', image);

      Api().post(`recipe-image/${id}`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data;',
        }
      });
    }

    Api().post(`recipe/${id}`, recipe);
  },
  deleteRecipe(id) {
    return Api().delete(`recipe/${id}`);
  }
}