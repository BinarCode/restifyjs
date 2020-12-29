export default class Config {
    constructor(config) {
        this.setConfig(config);
    }

    setConfig(config) {
        this.config = config;

        return this;
    }

    uri(suffix = null) {

        const base = `${this.config.domain}/${this.config.base}`;

        if (suffix)  {
            return `${base}/${suffix}`;
        }

        return base;
    }

    static make(config) {
        return new this(config);
    }
}
