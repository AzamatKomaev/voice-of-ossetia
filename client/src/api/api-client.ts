import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  const apiToken = localStorage.getItem('api-token')

  if (apiToken) {
    headers = {
      ...headers,
      Authorization: `Token ${localStorage.getItem("api-token")}`
    }
  }
  config.headers = headers
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default axios;