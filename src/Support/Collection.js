export default class Collection {
    constructor(items) {
        this.items = this.getArrayableItems(items);
    }

    static make(items) {
        return new this(items);
    }

    firstWhere(property, operator = undefined, value = undefined) {
        return this.first(item => {
            // Assuming that property is value in this case
            if (operator === undefined && value === undefined) {
                if (typeof item === 'object' && item.hasOwnProperty(property)) {
                    return item[property] === property
                }

                return item === property;
            }

            // Assuming that operator is value in this case.
            if (operator !== undefined && value === undefined) {
                if (typeof item === 'object' && item.hasOwnProperty(property)) {
                    return item[property] === operator;
                }
            }

            let retrieved;

            if (typeof item === 'object' && item.hasOwnProperty(property)) {
                retrieved = item[property];
            } else {
                retrieved = value;
            }

            switch (operator) {
                default:
                case '=':
                case '==':
                    return retrieved == value;
                case '!=':
                case '<>':
                    return retrieved != value;
                case '<':
                    return retrieved < value;
                case '>':
                    return retrieved > value;
                case '<=':
                    return retrieved <= value;
                case '>=':
                    return retrieved >= value;
                case '===':
                    return retrieved === value;
                case '!==':
                    return retrieved !== value;
            }
        })
    }

    first(callback, $default = null) {
        if (typeof callback !== 'function') {
            if (Array.isArray(this.items) && this.items.length) {
                return this.items[0];
            }

            return $default;
        }

        const items = this.items.filter((item) => callback(item));

        if (items.length) {
            return items[0];
        }

        return $default;
    }

    getArrayableItems(items) {
        if (!items) {
            return [];
        }

        if (Array.isArray(items)) {
            return items;
        }

        return [items];
    }
}
