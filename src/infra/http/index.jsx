import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const token = localStorage.getItem('jwt');
if (token) {
  axios.defaults.headers = {
    ...axios.defaults.headers,
    Authorization: `Bearer ${token}`
  };
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)
    if (error.response.status === 401) {
      alert("You are not authorized")
    }
    return Promise.reject(error);
  }
);

export const setAxiosAuthorizeHeader = (jwt) => {
  axios.defaults.headers = {
    ...axios.defaults.headers,
    Authorization: `Bearer ${jwt}`
  };
  localStorage.setItem("jwt", jwt);
};