export default class Repository
{
    constructor(definition) {
        this.$sort = [];
        this.$search = [];
        this.$match = [];
        this.$related = [];

        if (typeof definition === 'string') {
            return this.uriKey = definition;
        }

        if (typeof definition === 'object') {
            if (! definition.hasOwnProperty('uriKey')) {
                throw new Error('Invalid repository definition.')
            }

            return this
                .setUriKey(definition.uriKey)
                .setName(definition.name)
                .setSorts(definition.sort)
                .setSearcheables(definition.searchables)
                .setMatches(definition.match)
                .setRelated(definition.related)
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
}
