import React, { Component } from "react";
import UserHeader from "../../components/UserHeader/UserHeader";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    user: state.user.user,
    posts: state.user.posts,
    visible: state.common.visible
  };
};

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.props.getUserProfile(this.props.match.params.userId);
    }
  }

  render() {
    return (
      <UserHeader
        user={this.props.user}
        posts={this.props.posts}
        visible={this.props.visible}
        hoverPost={this.props.hoverPost}
        unhoverPost={this.props.unhoverPost}
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
