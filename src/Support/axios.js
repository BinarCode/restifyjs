import axios from 'axios'

const instance = axios.create()

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

instance.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response

        // Show the user a 500 error
        if (status >= 500) {
            Restify.$emit('error', error.response.data.message)
        }

        // Handle Token Timeouts
        if (status === 419) {
            Restify.$emit('token-expired')
        }

        return Promise.reject(error)
    }
)

export default instance
