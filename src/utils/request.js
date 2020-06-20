import axios from 'axios'
import store from '@/store'
import {
    ResponseRequest,
} from './constantVariable'
import {
    getToken,
} from './cookies'

const isSecure = String(process.env.VUE_APP_SECURE) === 'true'
const method = isSecure ? 'https' : 'http'
let url
if (process.env.VUE_APP_BASE_API_PORT !== undefined && process.env.VUE_APP_BASE_API_PORT.length > 0) {
    url = `${method}://${process.env.VUE_APP_BASE_API}:${process.env.VUE_APP_BASE_API_PORT}`
} else {
    url = `${method}://${process.env.VUE_APP_BASE_API}`
}
// create an axios instance
const service = axios.create({
    baseURL: url, // api base_url
    withCredentials: false, // cookies
    timeout: 300000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (store.getters['user/token']) {
            // Set Bearer Token
            config.headers.Authorization = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    },
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get information such as headers or status
     * Please return  response => response
     */
    response => {
        const res = response.data

        return res
    },
    async (error) => {
        if (!error.response.data.errors) {
            const status = await error.response.status
            switch (status) {
                case ResponseRequest.NOTFOUND:
                    await store.dispatch('toast/errorToast', error.response.data.message)
                    break
                case ResponseRequest.SERVERERROR:
                    await store.dispatch('toast/errorToast', error.response.data.message)
                    break
                case ResponseRequest.UNAUTHORIZED:
                    await store.dispatch('toast/errorToast', error.response.data.message)
                    break
                case ResponseRequest.UNPROCESSABLE:
                    await store.dispatch('toast/errorToast', error.response.data.message)
                    break
                default:
                    await store.dispatch('toast/errorToast', error.message)
                    break
            }
        }
        return Promise.reject(error)
    },
)

export default service
