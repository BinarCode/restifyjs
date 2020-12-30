import assert from 'assert';
import api from './data/api.json';
import Restify from '../src/Restify';
import Repository from '../src/Repository/Repository';
import { createRestify } from '../index';
import moxios from 'moxios';
import instance from '../src/Support/axios';

describe('Repository', () => {
    beforeEach(() => {
        global.Restify = Restify.make(api);
    })

    describe('#matches()', () => {
        it('can return matches', () => {
            const restify = Restify.make({
                repositories: [{
                    uriKey: 'users',
                    match: [{
                        type: 'string',
                        column: 'name',
                    }],
                }]
            });

            assert.ok(Array.isArray(restify.repository('users').matches()));
            assert.equal('string', restify.repository('users').matches()[0].type)
            assert.equal('name', restify.repository('users').matches()[0].column)
        })
    })
    describe('#sorts()', () => {
        it('can return sorts', () => {
            const restify = Restify.make({
                repositories: [{
                    uriKey: 'users',
                    sort: ['id'],
                }]
            });

            assert.ok(Array.isArray(restify.repository('users').sorts()));
            assert.equal('id', restify.repository('users').sorts()[0]);
        })
    })
    describe('#searchables()', () => {
        it('can return searchables', () => {
            const restify = Restify.make({
                repositories: [{
                    uriKey: 'users',
                    searchables: ['age'],
                }]
            });

            assert.ok(Array.isArray(restify.repository('users').searchables()));
            assert.equal('age', restify.repository('users').searchables()[0]);
        })
    })
    describe('#related()', () => {
        it('can return related', () => {
            const repository = Repository.make({
                'uriKey': 'users',
                'related': [
                    {
                        'relation': 'posts',
                        'field': {
                            'attribute': 'posts'
                        }
                    }
                ],
            });

            assert.ok(Array.isArray(repository.related()))
        })
    })
    describe('Calls', () => {
        beforeEach(function () {
            moxios.install(instance);
        })

        afterEach(function () {
            moxios.uninstall(instance)
        })

        describe('#get()', () => {
            it('can perform get request', async () => {
                const restify = createRestify(api);
                const users = restify.repository('users');

                assert.equal('https://api.binarcode.com/api/restify/users', users.uri());

                moxios.stubRequest('https://api.binarcode.com/api/restify/users', {
                    status: 200,
                    response: {
                        data: [{
                            name: 'John'
                        }]
                    }
                })

                const response = await users.get();

                assert.equal(response.data.data.length, 1)
            })
        })
    })
})

