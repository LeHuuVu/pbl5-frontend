import axios from 'axios'
// import _assign from 'lodash/assign'
import cookies from 'axios/lib/helpers/cookies'

const instance = axios.create({
//   baseURL: process.browser ? process.env.BROWSER_API_URL : require('../../config/next').SERVER_API_URL,
//   headers: {
//     'X-XSRF-TOKEN': cookies.read('XSRF-TOKEN'),
//   },
    baseURL: 'https://pbl5-backend.herokuapp.com/api',
    // baseURL: 'http://127.0.0.1/api',
    port: 80,
    timeout: 5000,
    headers: {
    'X-XSRF-TOKEN': cookies.read('XSRF-TOKEN'),
    },
})

// if (!process.browser) {
//   instance.interceptors.request.use((config) => _assign({}, config, {
//     url: decodeURI(config.url) === config.url ? encodeURI(config.url) : config.url,
//   }))
// }

export default instance
