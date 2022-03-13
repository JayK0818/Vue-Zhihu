import axios from 'axios'
const instance = axios.create({
  timeout: 10000
})

instance.interceptors.response.use(function (response) {
  if (response.data.code === 200) {
    return response.data.data
  }
  return Promise.reject(response.msg)
})

export default instance
