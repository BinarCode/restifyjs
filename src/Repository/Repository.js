import {collect} from '../Support/helpers';

export default class Repository {
    constructor(definition) {
        this.$sort = [];
        this.$search = [];
        this.$match = [];
        this.$related = [];
        this.$actions = [];

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
                .setActions(definition.actions)
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

    setRequest(request) {
        this.request = request;

        return this;
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

    setActions(actions) {
        this.$actions = actions;

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

    get(query = {}) {
        return Restify.request().get(this.uri(), {
            params: query
        });
    }

    show(key, query = {}) {
        return Restify.request().get(this.uri(key), {
            params: query
        });
    }

    store(data) {
        return Restify.request().post(this.uri(), data);
    }

    update(key, data) {
        return Restify.request().post(this.uri(key), data);
    }

    delete(key) {
        return Restify.request().delete(this.uri(key));
    }

    itemAction(id, key, data) {
        return Restify.request().post(
            this.uri(`${id}/actions?action=${key}`), data
        )
    }

    action(key, data) {
        const action = this.getAction(key);

        if (!action) {
            throw new Error(`Action ${key} is not defined.`);
        }

        return Restify.request().post(
            this.uri(`actions?action=${key}`), data
        )
    }

    getAction(key) {
        if (key) {
            return collect(this.$actions).firstWhere('uriKey', key);
        }

        return this.$actions;
    }
}
