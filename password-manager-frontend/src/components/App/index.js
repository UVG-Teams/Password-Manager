import React from 'react';

import './styles.css';

import Login from '../Login';
import Manager from '../Manager';

const App = () => (
    <div className = "App">
        <div>
            {/* <Login/> */}
            <Manager/>
        </div>
    </div>
);

export default App;
