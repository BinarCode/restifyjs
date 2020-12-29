import Collection from './Collection';
import {Singleton} from '../Restify';

export function collect(items) {
    return Collection.make(items);
}

export function createRestify(config) {
    return Singleton.init(config);
}
