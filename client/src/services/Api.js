import axios from 'axios';

export default function() {

  const baseURL = (window.location.host !== 'rs3-staging.herokuapp.com') ? 
  'https://localhost:8081/api' : 'https://rs3-staging.herokuapp.com/api';

  axios.defaults.withCredentials = true;

  const axiosAPI = axios.create({
    baseURL
  });

  axiosAPI.interceptors.response.use(response => {
    return response;
  }, (error, x) => {
    console.error('Axios error:', error);
    if (error.response.status === 401) {
      window.location = '/login?login-reg-msg=login-again';
    }
    return Promise.reject(error);
  });

  return axiosAPI;
}