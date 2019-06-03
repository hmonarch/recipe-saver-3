import Api from '@/services/Api';

export default {
  login(data) {
    return Api().post('/login', data);
  },
  logout() {
    return Api().post('/logout');
  },
  getUserData() {
    return Api().get('/user-data');
  }
}