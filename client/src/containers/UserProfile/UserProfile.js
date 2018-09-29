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
    this.props.getUserProfile(this.props.match.params.userId);
  }

  render() {
    return (
      <Header
        user={this.props.user}
        follow={this.props.followUser}
        unfollow={this.props.unfollowUser}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(UserProfile);
