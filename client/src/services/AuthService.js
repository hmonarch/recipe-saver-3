import Api from '@/services/Api';

export default {
  login(data) {
    return Api().post('/local/login', data);
  },
  register(data) {
    return Api().post('/local/register', data);
  },
  logout() {
    return Api().post('/logout');
  },
  getUserData() {
    return Api().get('/user-data');
  },
  charge(data) {
    return Api().post('/charge', data);
  }
}