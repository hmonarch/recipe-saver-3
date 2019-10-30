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
  getUserId() {
    return Api().get('user-id');
  },
  sendPasswordRecovery(data) {
    console.log('data', data);
    return Api().post('send-password-recovery', data);
  }
}