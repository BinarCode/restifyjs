import assert from 'assert';
import Restify from '../src/Restify';
import Config from '../src/Dto/Config';

describe('Config', () => {
    describe('#uri()', () => {
        it('can concatenate suffix', () => {
            const config = Config.make({
                domain: 'https://domain.test',
                base: 'api/restify'
            });

            assert.equal('https://domain.test/api/restify/users', config.uri('users'))
            assert.equal('https://domain.test/api/restify', config.uri())
        })

        it('can proxy uri method to Restify', () => {
            const restify = Restify.make({
                config: {
                    domain: 'https://domain.test',
                    base: 'api/restify'
                },
                repositories: []
            });

            assert.equal('https://domain.test/api/restify/users', restify.uri('users'))
        })
    })
})

