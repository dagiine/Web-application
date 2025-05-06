import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import { Paper, Typography, Box, Button, Grid } from '@material-ui/core';

import './userDetail.css';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserDetail, a React component of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const userId = this.props.match.params.userId;
    if (userId.slice(1) !== this.state.user._id) {
      fetchModel(`/user/${userId}`).then(response => {
        this.setState({ user: response.data });
      });
    }
  }

  render() {
    const user = this.state.user;

    return (
      <Router>
        <Box className="user-detail-container">
          <Paper className="user-detail-paper">
            <Grid container spacing={2} wrap="nowrap" alignItems="center">
              <Grid item>
                <Link to={`/photos/${user._id}`} className="user-detail-link">
                  <Button className="user-detail-photo-button">
                    Photos
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography className="user-detail-name">
                      {user.first_name + ' ' + user.last_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="user-detail-info">
                      Location: {user.location}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="user-detail-info">
                      Occupation: {user.occupation}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="user-detail-info">
                      Description: {user.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Router>
    );
  }
}

export default UserDetail;