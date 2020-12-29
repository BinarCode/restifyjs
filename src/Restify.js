import Repository from './Repository/Repository';
import Collection from './Support/Collection';

export class Restify {
    constructor(config = {}, repositories = []) {
        this.setConfig(config);
        this.setRepositories(repositories);
    }

    static make(apiData) {
        return (new this).init(apiData);
    }

    init(apiData) {
        return this.setConfig(apiData.config)
            .setRepositories(apiData.repositories);
    }

    setConfig(config) {
        this.config = config;

        return this;
    }

    setRepositories(repositories) {
        if (!Array.isArray(repositories)) {
            throw new Error('Repositories should be an array.');
        }

        this.repositories = repositories.map(repository => Repository.make(repository));

        return this;
    }

    repository(key) {
        const repository = Collection.make(this.repositories).first(item => item.uriKey === key);

        if (!repository) {
            throw new Error(`404 Not found repository "${key}"`)
        }

        return repository;
    }

    mount(scope) {
        scope.Restify = this;
    }
}

const Singleton = new Restify();

export default Singleton;
