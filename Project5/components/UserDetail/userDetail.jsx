import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Box, Button, Grid } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import './userDetail.css';
import fetchModel from '../../lib/fetchModelData';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    fetchModel(`/user/${userId}`).then(response => {
      this.setState({ user: response.data });
    });
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.userId;
    const currentId = this.props.match.params.userId;
    if (prevId !== currentId) {
      fetchModel(`/user/${currentId}`).then(response => {
        this.setState({ user: response.data });
      });
    }
  }

  render() {
    const user = this.state.user;

    return (
      <Box className="user-detail-container">
        <Paper className="user-detail-paper">
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Link to={`/photos/${user._id}`} className="user-detail-link">
                <Button
                  variant="contained"
                  className="user-detail-photo-button"
                  startIcon={<PhotoCameraIcon />}
                >
                  Photos
                </Button>
              </Link>
            </Grid>

            <Grid item>
              <Typography className="user-detail-name">
                {user.first_name + ' ' + user.last_name}
              </Typography>
            </Grid>

            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography className="user-detail-info">
                    <strong>Location:</strong> {user.location}
                  </Typography>
                  <Typography className="user-detail-info">
                    <strong>Occupation:</strong> {user.occupation}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className="user-detail-info">
                    <strong>Description:</strong> {user.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }
}

export default UserDetail;