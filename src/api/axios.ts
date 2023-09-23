import axios from 'axios'
import authConfig from "src/configs/auth";
// TODO: create env
export const baseURL = 'https://backend.logsheet-api.flexcode.co.id'

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// axios instance request
instance.interceptors.request.use(
  async config => {
    // TODO: FIX ME
    // const authToken = 'a2hhaXJ1bDphYmNkMTIzNDU2'
    const authToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    )!;
    if (config.headers === undefined) {
      config.headers = {}
    } else {
      config.headers.Authorization = `Basic ${authToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// axios instance response
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // TODO: handle response error by status
    // if (error.response.status === 401) {
    // }
    return Promise.reject(error)
  },
)

export { instance as Axios }
