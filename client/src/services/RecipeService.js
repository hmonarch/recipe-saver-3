import Api from '@/services/Api';

export default {
  getTags() {
    return Api().get('tags');
  },
  getRecipes(sort) {
    return Api().get(`${window.location.pathname}?sort=${sort}`);
  }
}