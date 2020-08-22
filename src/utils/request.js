import axios from 'axios'
import store from '@/store'
import {
    ResponseRequest,
} from './constantVariable'
import {
    getToken,
    setToken,
    getRefreshToken,
    setRefreshToken,
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
        if (getToken()) {
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
            const originalRequest = error.config
            if (error.response.status === ResponseRequest.UNAUTHORIZED && !originalRequest._retry) {
                originalRequest._retry = true
                return axios.post(`${url}/auth/refresh/`,
                    {
                        refreshtoken: getRefreshToken(),
                    }).then(response => {
                        if (response.status === 200) {
                            // 1) put token to LocalStorage
                            const {
                                // eslint-disable-next-line camelcase
                                auth_token,
                                // eslint-disable-next-line camelcase
                                refresh_token,
                            } = response.data
                            setToken(auth_token)
                            setRefreshToken(refresh_token)
                            // 2) Change Authorization header
                            service.interceptors.request.use(
                                config => {
                                    // Do something before request is sent
                                    if (getToken()) {
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
                            // 3) return originalRequest object with Axios.
                            return service(originalRequest)
                        }
                })
            }
            switch (status) {
                case ResponseRequest.NOTFOUND:
                    await store.dispatch('toast/errorToast', error.response.data.message)
                    break
                case ResponseRequest.SERVERERROR:
                    await store.dispatch('toast/errorToast', error.response.data.message)
                    break
                case ResponseRequest.UNPROCESSABLE:
                    await store.dispatch('toast/errorToast', error.response.data.message)
                    break
                case ResponseRequest.FORBIDDEN:
                    await store.dispatch('toast/errorToast', 'Pengguna tidak punya hak akses')
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
