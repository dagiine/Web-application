import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define TopBar, a React component of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { version: '' };

    fetchModel('http://localhost:3000/test/info')
      .then(res => {
        this.setState({ version: res.data.__v });
      })
      .catch(err => console.log(err));
  }

  render() {
    let right = (
      <Typography className='right' variant="h6" color="inherit">
        {this.props.view.startsWith('photos') ? 'Photos of ' : ''}
        {this.props.user || ''}
      </Typography>
    );

    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Hey, Dagiimaa!
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {right}
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;