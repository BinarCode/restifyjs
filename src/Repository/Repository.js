import axios from '../Support/axios';

export default class Repository {
    constructor(definition) {
        this.$sort = [];
        this.$search = [];
        this.$match = [];
        this.$related = [];

        if (typeof definition === 'string') {
            return this.uriKey = definition;
        }

        if (typeof definition === 'object') {
            if (!definition.hasOwnProperty('uriKey')) {
                throw new Error('Invalid repository definition.')
            }

            return this
                .setUriKey(definition.uriKey)
                .setName(definition.name)
                .setSorts(definition.sort)
                .setMatches(definition.match)
                .setRelated(definition.related)
                .setSearcheables(definition.searchables)
        }
    }

    setUriKey(uriKey) {
        this.uriKey = uriKey;

        return this;
    }

    setName(name) {
        this.name = name;

        return this;
    }

    setConfig(config) {
        this.config = config;

        return this;
    }

    setAxios(axios) {
        this.axios = axios;

        return this;
    }

    request(options = null) {
        if (options !== null) {
            return this.axios(options)
        }

        return this.axios
    }

    sorts() {
        return this.$sort || [];
    }

    matches() {
        return this.$match || [];
    }

    searchables() {
        return this.$search || [];
    }

    related(key = null) {
        return this.$related || [];
    }

    setSorts(sort) {
        this.$sort = sort;

        return this;
    }

    setMatches(match) {
        this.$match = match;

        return this;
    }

    setSearcheables(search) {
        this.$search = search;

        return this;
    }

    setRelated(related) {
        this.$related = related;

        return this;
    }

    static make(item) {
        return new this(item);
    }

    uri(suffix = null) {
        return this.config.uri(
            suffix ? `${this.uriKey}/${suffix}` : this.uriKey
        );
    }

    get() {
        return this.request().get(this.uri());
    }

    store(data) {
        return this.request().post(this.uri(), data);
    }

    update(key, data) {
        return this.request().post(this.uri(key), data);
    }

    delete(key) {
        return this.request().delete(this.uri(key));
    }
}
