import React, { Component } from "react";
import DisplayPost from "../../components/DisplayPost/DisplayPost";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    post: state.post.post
    // following: state.common.following
  };
};

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
    // this.props.getFollowing();
  }

  render() {
    return (
      <DisplayPost
        post={this.props.post}
        following={this.props.following}
        follow={this.props.followUser}
        unfollow={this.props.unfollowUser}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Post);
