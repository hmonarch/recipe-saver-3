import Api from '@/services/Api';

export default {
  getRecipes(criteria = '') {
    return Api().get(`recipes/${criteria}`);
  },
}