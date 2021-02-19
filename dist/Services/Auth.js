'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    login: function login(data) {
        return this.request().post(this.config.baseUri('api/login'), data);
    },
    register: function register(data) {
        return this.request().post(this.config.baseUri('api/register'), data);
    },
    forgotPassword: function forgotPassword(data) {
        return this.request().post(this.config.baseUri('api/forgotPassword'), data);
    },
    resetPassword: function resetPassword(data) {
        return this.request().post(this.config.baseUri('api/resetPassword'), data);
    },
    verify: function verify(id, emailHash) {
        return this.request().post(this.config.baseUri('api/restify/verify/' + id + '/' + emailHash));
    }
};