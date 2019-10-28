import Api from '@/services/Api';

export default {
  charge(data) {
    return Api().post('/charge', data);
  },
  cancelSubscription() {
    return Api().get('/cancel-subscription');
  },
  deleteAccount() {
    return Api().get('/delete-account');
  }
}