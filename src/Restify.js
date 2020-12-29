import Bus from './Support/Bus';
import Config from './Dto/Config';
import axios from './Support/axios';
import RepositoriesCollection from './Support/RepositoriesCollection';

class Restify {
    constructor(api) {
        if (api) {
            this.init(api)
        }

        this.bus = new Bus;
    }

    static make(apiData) {
        return new this(apiData);
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
        )
            .mapIntoRepositories()
            .setConfig(this.config);

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

    uri(suffix = null) {
        return this.config.uri(suffix);
    }

    $emit(name, data) {
        this.bus.$emit(name, data);

        return this;
    }

    $on(name, listener) {
        this.bus.$on(name, listener);

        return this;
    }

    request(options) {
        if (options !== undefined) {
            return axios(options)
        }

        return axios
    }
}

export const Singleton = new Restify();

export default Restify;
