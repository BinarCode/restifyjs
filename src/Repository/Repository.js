export default class Repository
{
    constructor(uriKey) {
        this.uriKey = uriKey;

        this.$sort = [];
        this.$search = [];
        this.$match = [];
        this.$related = [];
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
        if (typeof item === 'string') {
            return new this(item);
        }

        if (typeof item === 'object') {
            if (! item.hasOwnProperty('uriKey')) {
                throw new Error('Invalid repository item.')
            }

            return (new this(item.uriKey))
                .setName(item.name)
                .setSorts(item.sort)
                .setSearcheables(item.searchables)
                .setMatches(item.match)
                .setRelated(item.related)
        }

        return new this(item);
    }
}
