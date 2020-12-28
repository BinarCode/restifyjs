import assert from 'assert';
import api from './data/api.json';
import Restify from '../src/Restify';
import Repository from '../src/Repository/Repository';

describe('Restify', () => {
    describe('#init()', () => {
        it ('can initiate using api details', () => {
            const restify = Restify.init(api);

            assert.ok(restify instanceof Restify);
        })
        it ('can return repository from key', () => {
            const restify = Restify.init({
                repositories: [{
                    uriKey: 'users',
                    name: 'Wew'
                }]
            });

            assert.ok(restify.repository('users') instanceof Repository);
            assert.equal(restify.repository('users').name, 'Wew');
        })
    })
})

