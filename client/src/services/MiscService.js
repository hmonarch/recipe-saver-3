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
  }
}