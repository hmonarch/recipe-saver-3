import axios from 'axios';

export default function() {

  const baseURL = (window.location.host !== rs3-staging.herokuapp.com) ? 'http://localhost:8081' : 'https://rs3-staging.herokuapp.com';

  return axios.create({
    baseURL
  });
}