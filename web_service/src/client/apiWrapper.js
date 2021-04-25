const axios = require('axios');

axios.defaults.withCredentials = true; // send cookies

const apiWrapper = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 20000
  });


apiWrapper.interceptors.response.use(null, function (error) {
    error.handleGlobally = error => {
        console.error(error);
        alert('Помилка')
    };

    return Promise.reject(error);
})

module.exports = apiWrapper;