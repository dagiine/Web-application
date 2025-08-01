import React from 'react';
import {List, ListItem, ListItemText, Button,} from '@material-ui/core';

import './userList.css';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserList, a React component of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetchModel('/user/list').then(response => {
      this.setState({ users: response.data });
    });
  }

  getFullName = (user) => `${user.first_name} ${user.last_name}`;

  listUsers = () => {
    return this.state.users.map((user) => (
      <ListItem divider key={user._id} className="user-list-item">
        <Link to={`/users/:${user._id}`} className="user-list-link">
          <Button className="user-list-button">
            <ListItemText className="user-list-text">
              {this.getFullName(user)}
            </ListItemText>
          </Button>
        </Link>
      </ListItem>
    ));
  };

  render() {
    return (
      <div className="user-list-container">
        <h2 className="user-list-title">Users</h2>
        <List component="nav">
          {this.listUsers()}
        </List>
      </div>
    );
  }
}

export default UserList;