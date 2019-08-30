import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Badge, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';
import Header from './../Header';
import updateStatus from './../../modules/users';
import { bindActionCreators } from 'redux'


class LeaveDetails extends Component {

  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.logout = this.logout.bind(this);
  }
  // componentDidMount() {
  //   console.log('DID MOUNT ', this.props.users);
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdatessssssssssss => ', this.props.location);
  //   if (this.props.location.state && this.props.location.state.applied) {
  //     alert('sdfdsfd')
  //     this.forceUpdate();
  //   }
  // }
  componentDidMount() {
    this.forceUpdate();
  }
  logout = (e) => {
    // e.preventDefault();
    window.location.href = '/';
  }
  changeStatus(status) {
    this.props.updateStatus(status);
    alert('Status Updated');
  }
  componentWillUnmount() {
    if (!this.props.users) {
      this.props.history.push('/');
    }
  }
  renderData = () => {
    const { users } = this.props;
    let tempDate = [];
    const data = users && users.map(item => {
      if (this.props.location.state && (item.role === this.props.location.state.role)) {
        item.requestdetails.forEach(element => {
          let labelColor;
          if (element.status == "Applied") {
            labelColor = "primary";
          } else if (element.status == "Approved") {
            labelColor = "success";
          } else {
            labelColor = "warning";
          }
          tempDate.push(
            <Row >
              <Col xs="1"></Col>
              <Col xs="3" className="rowstyle">{element.date}</Col>
              <Col xs="3" className="rowstyle">{element.reason}</Col>
              <Col xs="2" className="rowstyle"><Badge color={labelColor}>{element.status}</Badge></Col>
              <Col xs="2" className="rowstyle">
                {element.status == 'Applied' && this.props.location.state.role == 'admin' && <Button color="success" className="search-button" > APPROVE</Button>}
                {element.status == 'Applied' && this.props.location.state.role == 'admin' && <Button color="danger" className="search-button" onClick={() => this.changeStatus('reject')}> REJECT</Button>}
                {(element.status == 'Applied' || element.status == 'Approved') && this.props.location.state.role == 'user' && <Button color="danger" className="search-button" onClick={() => this.changeStatus('cancel')} > CANCEL</Button>}
              </Col>
              <Col xs="1"></Col>
            </Row>
          );
          tempDate.push(<br></br>);
        });
        return tempDate;
      }
    })
    return data;
  }

  render() {
    return (
      <Container>
        <Header title={'Company Name'} link={''} username={this.props.users && this.props.users[0].username} signOut={this.logout} />
        <br></br>
        {this.props && this.props.location.state && this.props.location.state.role == 'user' && <Row className="">
          <Col xs="1"></Col>

          <Col xs="10" className="rowstyle">Available  number of leave {this.props.users && this.props.users[0].appliedLeave}</Col>
          <Col xs="1"></Col>
        </Row>}
        <br></br>
        {this.props && this.props.location.state && this.props.location.state.role == 'user' && <Row>
          <Col xs="1"></Col>
          <Col xs="8"><h5><strong>Leave Application list</strong></h5> </Col>
          <Col xs="2">
            <Link to={{
              pathname: "/leave-request",
              state: { role: this.props.location.state.role }
            }}><Button color="success" className="search-button"> APPLY FOR LEAVE</Button></Link>
          </Col>
          <Col xs="1"></Col>
        </Row>}
        <br></br>
        <Row>
          <Col xs="1"></Col>
          <Col xs="3">Date</Col>
          <Col xs="3">Reason</Col>
          <Col xs="2">Status</Col>
          <Col xs="2">Action</Col>
          <Col xs="1"></Col>
        </Row>
        {this.renderData()}
      </Container>
    )
  }
}

LeaveDetails.propTypes = {
  location: PropTypes.object,
  updateStatus: PropTypes.func,
};

const mapStateToProps = ({ users }) => {
  return {
    users: users.payload
  }
}
const mapDispatchtoProps = (dispatch) => {
  bindActionCreators(
    {
      updateStatus,
    },
    dispatch
  )  
}

export default connect(mapStateToProps, mapDispatchtoProps)(LeaveDetails);
