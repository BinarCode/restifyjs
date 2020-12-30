export default {
    login(data) {
        return this.request().post(
            this.config.baseUri('api/login'), data
        )
    },

    register(data) {
        return this.request().post(
            this.config.baseUri('api/register'), data
        )
    },

    forgotPassword(data) {
        return this.request().post(
            this.config.baseUri('api/forgotPassword'), data
        )
    },

    resetPassword(data) {
        return this.request().post(
            this.config.baseUri('api/resetPassword'), data
        )
    },

    verify(id, emailHash) {
        return this.request().post(
            this.config.baseUri(`api/restify/verify/${id}/${emailHash}`)
        )
    },
}
