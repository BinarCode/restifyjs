import Config from './Dto/Config';
import RepositoriesCollection from './Support/RepositoriesCollection';

class Restify {
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
        this.config = Config.make(config);

        return this;
    }

    setRepositories(repositories) {
        if (!Array.isArray(repositories)) {
            throw new Error('Repositories should be an array.');
        }

        this.repositories = RepositoriesCollection.make(
            repositories
        ).mapIntoRepositories();

        return this;
    }

    repository(key) {
        const repository = this.repositories.first(item => item.uriKey === key);

        if (!repository) {
            throw new Error(`404 Not found repository "${key}"`)
        }

        return repository;
    }

    mount(scope) {
        scope.Restify = this;
    }
}

export const Singleton = new Restify();

export default Restify;
