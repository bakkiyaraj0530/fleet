import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Button, Badge, Container, Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';
import Header from './../Header';
import moment from 'moment';

import { cancelleave, applyLeave } from '../../modules/users'


class ApplyLeave extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      reason: ''
    }
    // this.dateValue = '';
  }
  cancelRequest = (id) => {
    this.props.cancelleave(id)
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  // inputValue = (e) => {
  //   this.dateValue = e.target.value;
  //   this.setState({ date: e.target.value })
  // }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleRequetLeave = (evt) => {
    evt.preventDefault();
    // console.log(this.dateValue, this.state.date, this.state.reason);
    const dateVal = moment(document.getElementById('date').value).format("MMM Do YY"); 

    const leaveRequest = {
      date: dateVal,
      reason: this.state.reason,
      status: 'Applied',
    };

    if (dateVal === '' || this.state.reason === '') {
      alert('Please Enter Date and Reason to apply leave!!');
      this.setState({ date: '', reason: '' });
    } else {
      this.props.applyLeave(leaveRequest);
      this.props.history.push(
        { 
          pathname: '/leave-details', 
          state: { role : this.props.location.state.role, applied: true },
      });
    }
  }
  render() {
    // console.log('apply leave', this.props);
    return (
      <div className="Login">
        <Header title={'Company Name'} link={'leave-details'} username={this.props.users && this.props.users[0].username} />
        <br></br>
        <Row className="">

          <form onSubmit={this.handleRequetLeave}>
            <FormGroup>
              <Label for="Date">Date</Label>
              <Input
                type="date"
                name="date"
                // value={this.state.date}
                id="date"
                ref={(input) => this.inputValue = input}
                placeholder="date placeholder"
              // onBlur={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="reason">Reason</Label>
              <Input type="textarea" name="reason" id="reason" onChange={this.handleChange} />
            </FormGroup>
            <Button type="submit" color="success">Apply leave</Button>
          </form>
        </Row>
      </div>
    )
  }
}

ApplyLeave.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = ({ users }) => {
  return {
    users: users.payload
  }
}
const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      cancelleave,
      applyLeave,
    },
    dispatch
  )


export default connect(mapStateToProps, mapDispatchtoProps)(ApplyLeave);
