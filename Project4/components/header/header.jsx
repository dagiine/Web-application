import React from 'react';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src='./components/header/jellyfish.jpg'/>
            </div>
        );
    }
}

export default Header;