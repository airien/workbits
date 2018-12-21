'use strict';

import Realm from 'realm';

class Dairy extends Realm.Object {
}
Dairy.schema = {
    name: 'Dairy',
    primaryKey: 'id',
    properties: {
        id: 'int',
        date: 'string',
        type: 'string'
    }
};
export default new Realm({schema: [Dairy]});

