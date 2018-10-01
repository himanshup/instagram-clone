import React, { Component } from "react";
import DisplayPost from "../../components/DisplayPost/DisplayPost";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/post";

const mapStateToProps = state => {
  return {
    post: state.post.post,
    loading: state.common.loading
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
      <div>
        {this.props.loading ? (
          <Loader />
        ) : (
          <DisplayPost post={this.props.post} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Post);
