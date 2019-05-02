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
    if (image) {
      console.log('image to process!');
      Api().post(`recipe-image/${id}`, image, {
        headers: {
          'Content-Type': 'multipart/form-data;',
        }
      });
    }
    //return Api().post(`recipe/${id}`, recipe);
  },
  deleteRecipe(id) {
    return Api().delete(`recipe/${id}`);
  }
}