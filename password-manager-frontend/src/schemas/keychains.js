import { schema } from 'normalizr';

export const key = new schema.Entity(
    'keys',
);

export const keys = new schema.Array(key);


export const keychain = new schema.Entity(
    'keychains',
);

