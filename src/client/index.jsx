import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './components/App.jsx';

// Wrap <App/> in a HashRouter which adds a /#/ prefix to all routes in the
// application. This allows us to map the root directory of the website from
// "/" to "/dashboard"

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>, 
    document.getElementById('root'));