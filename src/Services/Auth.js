export default class Auth {
    constructor(config) {
        this.config = config;
    }

    login() {
        console.log('login');
    }

    register() {
        console.log('register');

    }

    static make(config) {
        return new this(config);
    }
}
