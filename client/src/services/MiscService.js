import Api from '@/services/Api';

export default {
  uploadImage(imageFile) {

    const fd = new FormData();
    fd.append('image-file', imageFile);

    return Api().post('account-image-upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data;',
      }
    });
  },
  getUserInfo() {
    return Api().get('user-info');
  },
  sendPasswordRecovery(data) {
    return Api().post('send-password-recovery', data);
  },
  verifyToken(token) {
    return Api().get(`reset/${token}`);
  },
  resetPassword(data) {
    return Api().post(`reset`, data);
  }
}