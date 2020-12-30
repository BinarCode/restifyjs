import axios from './axios';
import Collection from './Collection';
import { Singleton } from '../Restify';

export function collect(items) {
    return Collection.make(items);
}

export function createRestify(config) {
    if (typeof config === 'string') {
        return axios.get(config)
            .then(response => {
                return Singleton.init(response.data).mount(window)
            })
    }

    return Singleton.init(config).mount(window)
}
