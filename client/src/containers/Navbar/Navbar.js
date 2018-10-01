import React, { Component } from "react";
import DisplayNavbar from "../../components/DisplayNavbar/DisplayNavbar";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return <DisplayNavbar logout={() => this.handleLogout()} />;
  }
}

export default connect(
  null,
  actions
)(Navbar);
