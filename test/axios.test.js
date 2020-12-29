import api from './data/api.json';
import Restify from '../src/Restify';
import axios from 'axios'
import moxios from 'moxios'
import instance from '../src/Support/axios';
import assert, { equal } from 'assert';
import Repository from '../src/Repository/Repository';
import Config from '../src/Dto/Config';
import RepositoriesCollection from '../src/Support/RepositoriesCollection';

describe('axios', () => {
    describe('via Restify', () => {
        beforeEach(function () {
            moxios.install(instance);
        })

        afterEach(function () {
            moxios.uninstall(instance)
        })

        it('can call request method from Restify', (done) => {
            const restify = Restify.make(api);

            moxios.stubRequest('https://api.binarcode.com/api/restify/users', {
                status: 200,
            })

            restify.request()
                .get('https://api.binarcode.com/api/restify/users')
                .then(res => assert.equal(res.status, 200))
                .catch(err => console.log(err))
                .finally(done)
        })
    })
})

