import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const link = `/${this.props.link}`;
    return(
        <Row className="rowstyle">
            <Col> <Link to={link} >{this.props.title} </Link></Col>
            <Col> {this.props.username}</Col>
            <Col> <Button onClick={this.props.signOut}  > Logout </Button></Col>
        </Row>
        );  
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchtoProps = dispatch => {
    return {

    }
}
  

export default connect(mapStateToProps,mapDispatchtoProps)(Header);