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
    this.loadUser(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.userId;
    const currentId = this.props.match.params.userId;
    if (prevId !== currentId) {
      this.loadUser(currentId);
    }
  }

  loadUser(userId) {
    fetchModel(`/user/${userId}`)
      .then(response => {
        const user = response.data;
        this.setState({ user }, () => {
          // update TopBar:
          const fullName = `${user.first_name} ${user.last_name}`;
          this.props.changeView('user', fullName);
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { _id, first_name, last_name, location, occupation, description } = this.state.user;

    return (
      <Box className="user-detail-container">
        <Paper className="user-detail-paper">
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Link to={`/photos/${_id}`} className="user-detail-link">
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
                {first_name + ' ' + last_name}
              </Typography>
            </Grid>

            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography className="user-detail-info">
                    <strong>Location:</strong> {location}
                  </Typography>
                  <Typography className="user-detail-info">
                    <strong>Occupation:</strong> {occupation}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className="user-detail-info">
                    <strong>Description:</strong> {description}
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