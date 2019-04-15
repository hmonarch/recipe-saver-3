import Api from '@/services/Api';

export default {
  getRecipes(view = '', sort) {
    return Api().get(`recipes/${view}?sort=${sort}`);
  },
}