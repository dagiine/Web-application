import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from "react-router-dom";

import './styles/main.css';

import Example from "./components/Example/Example";
import States from "./components/states/States";

function P5() {
    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'black',
    };

    return (
        <div>
            <HashRouter>
                <Link to='/states' style={linkStyle}>State</Link>
                <Link to='/example' style={linkStyle}>Example</Link>
                <Route path="/states" component={States} />
                <Route path="/example" component={Example} />
            </HashRouter>
        </div>
    );
}

ReactDOM.render (
    <P5/>,
    document.getElementById('reactapp'),
);