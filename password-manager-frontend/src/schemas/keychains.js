import { schema } from 'normalizr';

export const keychain = new schema.Entity(
    'keychains',
);

export const keychains = new schema.Array(keychain);