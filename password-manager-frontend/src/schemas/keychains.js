import { schema } from 'normalizr';

export const key = new schema.Entity(
    'key',
);

export const keys = new schema.Array(key);


export const keychain = new schema.Entity(
    'keychain',
    {
        keys: keys
    }
);

