import assert from 'assert';
import Collection from '../src/Support/Collection';

describe('Collection', () => {
    describe('#first()', () => {
        it('should return the first collection item', () => {
            const collection = new Collection(['foo', 'bar']);

            assert.equal('foo', collection.first());
        })

        it('should return null if nothing in the collection', () => {
            const collection = new Collection();

            assert.equal(null, collection.first());
        })

        it('should return first for callback', () => {
            const collection = new Collection(['foo', 'bar']);

            assert.equal('bar', collection.first((item) => item.startsWith('ba')));
        })

        it('should return default when not found', () => {
            const collection = new Collection(['foo', 'bar']);

            assert.equal('wew', collection.first(() => {}, 'wew'));
        })
    })
    describe('#firstWhere()', () => {
        it('should return the first primarly', () => {
            const collection = new Collection(['foo', 'bar']);

            assert.equal('bar', collection.firstWhere('bar'));
        })

        it('should return the first considering operator as value', () => {
            const collection = new Collection([
                {key: 'foo'},
                {key: 'baz'},
            ]);

            assert.equal('baz', collection.firstWhere('key', 'baz').key);
        })

        it('should return the first considering operator and value', () => {
            const collection = new Collection([
                {value: 1},
                {value: 2},
                {value: 3},
                {value: 4},
            ]);

            assert.equal(1, collection.firstWhere('value', '=', 1).value);
            assert.equal(1, collection.firstWhere('value', '==', 1).value);
            assert.equal(1, collection.firstWhere('value', '===', 1).value);
            assert.equal(2, collection.firstWhere('value', '<>', 1).value);
            assert.equal(2, collection.firstWhere('value', '>', 1).value);
            assert.equal(1, collection.firstWhere('value', '<', 4).value);
            assert.equal(null, collection.firstWhere('value', '>', 4));
            assert.equal(4, collection.firstWhere('value', '>=', 4).value);
        })
    })
})

