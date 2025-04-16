import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from "react-router-dom";

import './styles/main.css';

import Example from "./components/Example";
import States from "./components/states";

function P5() {
    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'black',
    };

    return (
        <div>
            <React.Fragment>
                <HashRouter>
                    <Link to='/states' style={linkStyle}>State</Link>
                    <Link to='/example' style={linkStyle}>Example</Link>
                    <Route path="/states" component={States} />
                    <Route path="/example" component={Example} />
                </HashRouter>
            </React.Fragment>
        </div>
    );
}

ReactDOM.render (
    <P5/>,
    document.getElementById('reactapp'),
)