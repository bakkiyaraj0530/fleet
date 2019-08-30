import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './index.css';

import {
  loginSubmit,
  saveUser
} from '../../modules/users'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount() {

    const userDetails = [
      {
        uid: 1,
        username: 'Bakkiyaraj Manokaran',
        email: 'user@gmail.com',
        appliedLeave: 5,
        requestdetails: [
          {
            requestId: 1,
            date: 'July 12, 2019',
            reason: 'Personal Commitement',
            status: 'Applied',
          },
          {
            requestId: 2,
            date: 'August 20, 2019',
            reason: 'Vacation',
            status: 'Approved',
          },
          {
            requestId: 3,
            date: 'August 20, 2019',
            reason: 'Hangouts ',
            status: 'Applied',
          }
        ],
        role: 'user'
      },
      {
        uid: 2,
        username: 'Administrator',
        requestdetails: [
          {
            requestId: 1,
            date: 'July 12, 2019',
            reason: 'Personal Committment',
            status: 'Applied',
            username: 'Bakkiyaraj Manokaran',
            uid: 1,
          },
          {
            requestId: 2,
            date: 'August 20, 2019',
            reason: 'Hang out',
            status: 'Approved',
            username: 'Bakkiyaraj Manokaran',
            uid: 1,
          },
          {
            requestId: 3,
            date: 'August 20, 2019',
            reason: 'Hang out',
            status: 'Applied',
            username: 'Bakkiyaraj Manokaran',
            uid: 1,
          }
        ],
        role: 'admin'
      }
    ]
    this.props.saveUser(userDetails)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.email) {
      const role = this.props.email === 'user@gmail.com' ? 'user' : 'admin';
      this.props.history.push({
        pathname: '/leave-details',
        state: {
          role: role,
          email: this.props.email,
        }
      });
    }
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const loginInput = {
      email: this.state.email,
      password: this.state.password,
    }
    if (this.state.email == 'user@gmail.com' || this.state.email == 'admin@gmail.com') {
      this.props.loginSubmit(loginInput);
    } else {
      alert('Enter valid Users');
      this.setState({ email: '', password: '' });
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit} >
          <FormGroup controlId="email" bsSize="large">
            <label>Email</label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <label>Password</label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => ({
  email: users.email,
  password: users.password,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginSubmit,
      saveUser,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
