import React from 'react';
import './userPhotos.css';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, Card, CardMedia, CardContent, Divider } from '@material-ui/core';
import fetchModel from '../../lib/fetchModelData';

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      photos: [],
    };
  }

  componentDidMount() {
    this.loadAll(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.userId;
    const currentId = this.props.match.params.userId;
    if (prevId !== currentId) {
      this.loadAll(currentId);
    }
  }

  loadAll(userId) {
    fetchModel(`/user/${userId}`)
      .then(res => {
        const user = res.data;
        const fullName = `${user.first_name} ${user.last_name}`;
        this.props.changeView('photos', fullName);
      })
      .catch(err => console.error(err));

    fetchModel(`/photosOfUser/${userId}`)
      .then(response => {
        this.setState({ userId, photos: response.data });
      })
      .catch(err => console.error(err));
  }

  cardOfComment = photo =>
    (photo.comments || []).map(comment => (
      <Card
        className="user-photo-comment-card"
        variant="outlined"
        key={comment._id}
      >
        <CardContent>
          <Typography className="comment-date">
            {comment.date_time}
          </Typography>
          <Link to={`/users/${comment.user._id}`} className="comment-user-link">
            <Typography className="comment-user-name">
              {`${comment.user.first_name} ${comment.user.last_name}`}
            </Typography>
          </Link>
          <Divider />
          <Typography variant="body2" className="comment-text">
            {comment.comment}
          </Typography>
        </CardContent>
      </Card>
    ));

  listPhotos = () =>
    this.state.photos.map(photo => (
      <Paper
        className="user-photo-block"
        elevation={3}
        key={photo._id}
      >
        <Card className="user-photo-card" variant="outlined">
          <CardMedia
            component="img"
            image={`images/${photo.file_name}`}
            className="user-photo-image"
          />
          <CardContent>
            <Typography className="photo-date">
              {photo.date_time}
            </Typography>
            <button className="like-button">👍🏻 Like</button>
          </CardContent>
        </Card>

        <Box className="user-photo-comments">
          {this.cardOfComment(photo)}

          <div className="comment-input-box">
            <input
              type="text"
              placeholder="Add a comment..."
              className="comment-input"
              disabled
            />
            <button className="comment-post-button" disabled>
              Post
            </button>
          </div>
        </Box>
      </Paper>
    ));

  render() {
    return <Box className="user-photo-container">{this.listPhotos()}</Box>;
  }
}

export default UserPhotos;