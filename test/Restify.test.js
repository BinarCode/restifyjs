import assert from 'assert';
import api from './data/api.json';
import Restify from '../src/Restify';
import Repository from '../src/Repository/Repository';
import Config from '../src/Dto/Config';
import RepositoriesCollection from '../src/Support/RepositoriesCollection';

describe('Restify', () => {
    describe('#make()', () => {
        it('can initiate using api details', () => {
            const restify = Restify.make(api);

            assert.ok(restify instanceof Restify);
        })

        it('can instantiate config', () => {
            const restify = Restify.make({
                config: {
                    domain: 'https://domain.test',
                    base: 'base'
                },
                repositories: []
            });

            assert.ok(restify.config instanceof Config);
        })

        it('can instantiate repositories collection', () => {
            const restify = Restify.make({
                config: {},
                repositories: []
            });

            assert.ok(restify.repositories instanceof RepositoriesCollection);
        })

        it('can return repository from key', () => {
            const restify = Restify.make({
                repositories: [{
                    uriKey: 'users',
                    name: 'Wew'
                }]
            });

            assert.ok(restify.repository('users') instanceof Repository);
            assert.equal(restify.repository('users').name, 'Wew');
        })
    })
    describe('#emit()', () => {
        it('can emit event', () => {
            const restify = Restify.make(api);

            restify.$on('foo', (data) => {
                assert.equal(data, 'bar')
            })

            restify.$emit('foo', 'bar')
        })
    })
})

