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
  updateRecipe(id, recipe) {
    return Api().post(`recipe/${id}`, recipe);
  },
  deleteRecipe(id) {
    return Api().delete(`recipe/${id}`);
  }
}