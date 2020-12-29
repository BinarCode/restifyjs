import assert from 'assert';
import {createRestify} from '../index';

describe('Index', () => {
    describe('#createRestify()', () => {
        it('Returns Restify singleton', () => {
            const restify = createRestify({
                repositories: [{
                    uriKey: 'foo'
                }]
            });

            assert.equal(restify.repositories.count(), 1)

            const Restify = require('../index').default;

            assert.equal(Restify.repositories.count(), 1)
        })
    })
})

