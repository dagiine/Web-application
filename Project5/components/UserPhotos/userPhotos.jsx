import React from 'react';
import './userPhotos.css';
import { HashRouter as Router, Link } from 'react-router-dom';

import {
  Box,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider
} from '@material-ui/core';

import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserPhotos, a React component of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      photo: [],
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const userId = this.props.match.params.userId;
    if (userId !== this.state.userId) {
      this.setState({ userId: userId });
      const url = `/photosOfUser/${userId}`;
      fetchModel(url).then(response => this.setState({ photo: response.data }));
    }
  }

  cardOfComment = (photo) => {
    return (
      photo.comments?.map((comment) => (
        <Card className="user-photo-comment-card" variant="outlined" key={comment._id}>
          <CardContent>
            <Typography className="comment-date">{comment.date_time}</Typography>
            <Router>
              <Link to={`/users/:${comment.user._id}`} className="comment-user-link">
                <Typography className="comment-user-name">
                  {`${comment.user.first_name} ${comment.user.last_name}`}
                </Typography>
              </Link>
            </Router>
            <Divider />
            <Typography variant="body2" className="comment-text">
              {comment.comment}
            </Typography>
          </CardContent>
        </Card>
      ))
    );
  };

  listPhotos = () => {
    return this.state.photo.map((photo) => (
      <Paper className="user-photo-block" elevation={3} key={photo._id}>
        <Card className="user-photo-card" variant="outlined">
          <CardMedia
            component="img"
            image={`images/${photo.file_name}`}
            className="user-photo-image"
          />
          <CardContent>
            <Typography className="photo-date">{photo.date_time}</Typography>
          </CardContent>
        </Card>
        <Box className="user-photo-comments">
          {this.cardOfComment(photo)}
        </Box>
      </Paper>
    ));
  };

  render() {
    return <Box className="user-photo-container">{this.listPhotos()}</Box>;
  }
}

export default UserPhotos;