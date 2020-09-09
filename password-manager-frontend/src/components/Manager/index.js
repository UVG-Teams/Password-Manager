import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

const Manager = () => (

    <div className="pageManager">
        <div className="forms">
            <div className="f1iz">
                <label>Init Keychain</label>
                <input type="text" placeholder="Password keychain"/>
                <button>Enviar</button>
            </div>
            <div className="f2iz">
                <label>Set key</label>
                <input type="text" placeholder="Aplicacion"/>
                <input type="text" placeholder="Password"/>
                <button>Guardar</button>
            </div>
            <div className="f1der">
                <label>Get</label>
                <input type="text" placeholder="Aplicacion"/>
                <button>Buscar</button>
            </div>
            <div className="f2der">
                <label>Remove</label>
                <input type="text" placeholder="Aplicacion"/>
                <button>Eliminar</button>
            </div>
        </div>
        <div className="tableView">
            <table>
                <tr>
                    <th>Aplicación</th>
                    <th>Contraseña</th>
                </tr>
                <tr>
                    <td>www.hi5.com</td>
                    <td>12345</td>
                </tr>
                <tr>
                    <td>www.myspace.com</td>
                    <td>abc123</td>
                </tr>
            </table>
        </div>
    </div>
);

export default Manager;