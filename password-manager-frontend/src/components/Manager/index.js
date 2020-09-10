import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/keychains'
import * as actionsKeys from '../../actions/keys'
import * as selectors from '../../reducers'

import './styles.css';

const Manager = ({
    keychain,
    keys,
    isLoading,
    initKeychain,
    setKey,
    getKeyPassword,
    deleteKey,
}) => {
    const [keychainPassword, changeKeychainPassword] = useState('')

    const [keyApp, changeKeyApp] = useState('')
    const [keyPassword, changeKeyPassword] = useState('')
    
    const [appGet, changeAppGet] = useState('')
    
    const [appDelete, changeAppDelete] = useState('')
     
    return (
    <div className="pageManager">
        <div className="forms">
            {
                keychain ? (
                    <>
                        <div className="f2iz">
                            <label>Set key</label>
                            <input
                                type="text"
                                placeholder="Aplicacion"
                                value={ keyApp }
                                onChange={e => changeKeyApp(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Password"
                                value={ keyPassword }
                                onChange={e => changeKeyPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={
                                    () => setKey(keyApp, keyPassword)
                                }
                            >
                                {'Guardar'}
                            </button>
                        </div>
                        <div className="f1der">
                            <label>Get Password</label>
                            <input
                                type="text"
                                placeholder="Aplicacion"
                                value={ appGet }
                                onChange={e => changeAppGet(e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={
                                    () => getKeyPassword(appGet)
                                }
                            >
                                {'Buscar'}
                            </button>
                        </div>
                        <div className="f2der">
                            <label>Remove</label>
                            <input
                                type="text"
                                placeholder="Aplicacion"
                                value={ appDelete }
                                onChange={e => changeAppDelete(e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={
                                    () => deleteKey(appDelete)
                                }
                            >
                                {'Eliminar'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="f1iz">
                            <label>Init Keychain</label>
                            <input
                                type="text"
                                placeholder="Keychain Password"
                                value={ keychainPassword }
                                onChange={e => changeKeychainPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={
                                    () => initKeychain(keychainPassword)
                                }
                            >
                                {'Enviar'}
                            </button>
                        </div>
                    </>
                )
            }
        </div>
        {
            keychain ? (
                <>
                    <div className="tableView">
                        <table>
                            <thead>
                                <tr>
                                    <th>Aplicación</th>
                                    <th>Contraseña</th>
                                </tr>
                            </thead>
                            {
                                keys.length > 0 && !isLoading && (
                                    <tbody>
                                        {
                                            keys.map(key =>
                                                <tr key={ key.id }>
                                                    <th>{ key.application }</th>
                                                    <th>{ key.password_cipher + key.password_nonce + key.password_tag}</th>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                )
                            }
                        </table>
                    </div>
                </>
            ) : (
                <></>
            )
        }
    </div>
)};

export default connect(
    state => ({
        keychain: selectors.getKeychain(state),
        keys: selectors.getKeys(state),
        isLoading: selectors.isFetchingKeys(state),
    }),
    dispatch => ({
        initKeychain(password) {
            dispatch(actions.startInitializingKeychain(password))
        },
        setKey(app, password) {
            dispatch(actionsKeys.startAddingKey({
                "name": app,
                "value": password
            }))
        },
        getKeyPassword(app) {
            dispatch(actionsKeys.startGettingKeyPassword(app))
        },
        deleteKey(app) {
            dispatch(actionsKeys.startRemovingKey(app))
        }
    }),
)(Manager);
