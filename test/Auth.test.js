import assert from 'assert';
import Restify from '../src/Restify';
import moxios from 'moxios';
import instance from '../src/Support/axios';

describe('Auth', () => {
    beforeEach(function () {
        moxios.install(instance);
    })

    afterEach(function () {
        moxios.uninstall(instance)
    })

    describe('#login()', () => {
        it('can login via Restify', async () => {
            const restify = Restify.make({
                config: {
                    domain: 'https://domain.test',
                    base: 'api/restify'
                },
                repositories: []
            });

            moxios.stubRequest('https://domain.test/api/login', {
                status: 200,
            })

            const response = await restify.login({
                'email': 'foo@bar.com',
                'password': 'secret'
            });

            assert.equal(200, response.status);
        })
    })

    describe('#register()', () => {
        it('can register via Restify', async () => {
            const restify = Restify.make({
                config: {
                    domain: 'https://domain.test',
                    base: 'api/restify'
                },
                repositories: []
            });

            moxios.stubRequest('https://domain.test/api/register', {
                status: 200,
            })

            const response = await restify.register({
                'email': 'foo@bar.com',
                'password': 'secret',
                'password_confirmation': 'secret'
            });

            assert.equal(200, response.status);
        })
    })

    describe('#forgotPassword()', () => {
        it('can ask forgotten password', async () => {
            const restify = Restify.make({
                config: {
                    domain: 'https://domain.test',
                    base: 'api/restify'
                },
                repositories: []
            });

            moxios.stubRequest('https://domain.test/api/forgotPassword', {
                status: 200,
            })

            const response = await restify.forgotPassword({
                'email': 'foo@bar.com',
            });

            assert.equal(200, response.status);
        })
    })
    describe('#resetPassword()', () => {
        it('can reset password', async () => {
            const restify = Restify.make({
                config: {
                    domain: 'https://domain.test',
                    base: 'api/restify'
                },
                repositories: []
            });

            moxios.stubRequest('https://domain.test/api/resetPassword', {
                status: 200,
            })

            const response = await restify.resetPassword({
                'email': 'foo@bar.com',
            });

            assert.equal(200, response.status);
        })
    })
    describe('#verify()', () => {
        it('can verify Restify users', async () => {
            const restify = Restify.make({
                config: {
                    domain: 'https://domain.test',
                    base: 'api/restify'
                },
                repositories: []
            });

            const emailHash = "$0W9dkyHMTX";
            const userId = 1;

            moxios.stubRequest(`https://domain.test/api/restify/verify/${userId}/${emailHash}`, {
                status: 200,
            })

            const response = await restify.verify(userId, emailHash);

            assert.equal(200, response.status);
        })
    })
})

