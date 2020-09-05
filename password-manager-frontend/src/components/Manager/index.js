import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

const Manager = () => (

    <div className="pageManager">
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