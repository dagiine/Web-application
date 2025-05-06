import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view,
      version: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.view !== this.props.view) {
      this.setState({ view: this.props.view });
      fetchModel("http://localhost:3000/test/info")
        .then(response => this.setState({ version: response.data.__v }));
    }
  }

  render() {
    return (
      <AppBar className="topbar-appbar" position="fixed" elevation={2}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography className="topbar-title" variant="h6">
                Dagiimaa
              </Typography>
            </Grid>
            <Grid item>
              <Typography className="topbar-view">
                {this.state.view}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;