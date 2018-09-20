import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      this.props.getUserProfile(this.props.params.id);
    }
  }

  render() {
    return <Header user={this.props.user} />;
  }
}

export default connect(
  mapStateToProps,
  actions
)(UserProfile);
