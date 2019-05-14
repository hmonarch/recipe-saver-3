import axios from 'axios';

export default function() {

  const baseURL = (window.location.host !== 'rs3-staging.herokuapp.com') ? 
  'http://localhost:8081/api' : 'https://rs3-staging.herokuapp.com/api';

  return axios.create({
    baseURL
  });
}