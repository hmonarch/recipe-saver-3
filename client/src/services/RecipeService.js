import Api from '@/services/Api';

export default {
  getRecipes(view = '', sort) {
    return Api().get(`recipes/${view}?sort=${sort}`);
  },
  getTaggedRecipes(tag, sort) {
    return Api().get(`tag/${tag}?sort=${sort}`);
  }
}