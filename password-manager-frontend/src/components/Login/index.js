import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

const Login = () => (

    <div className="page">
        <div className="loginForm">
            <div className="user">
                <label>Usuario:</label>
                <input type="text" />
            </div>

            <div className="pass">
                <label>Contraseña:</label>
                <input type="text" />
            </div>

            <button>Ingresar</button>
        </div>
    </div>
);

export default Login;