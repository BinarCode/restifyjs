import Collection from './Collection';
import Repository from '../Repository/Repository';

export default class RepositoriesCollection extends Collection {
    mapIntoRepositories() {
        return this.mapInto(Repository);
    }

    setConfig(config) {
        this.map(item => item.setConfig(config));

        return this;
    }
}
