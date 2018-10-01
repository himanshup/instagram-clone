import React, { Component } from "react";
import DisplayPost from "../../components/DisplayPost/DisplayPost";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/post";

const mapStateToProps = state => {
  return {
    post: state.post.post,
    postError: state.post.postError,
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
          <div>
            {this.props.postError ? (
              <div className="container component">
                <h4 className="text-center">{this.props.postError}</h4>
              </div>
            ) : (
              <DisplayPost post={this.props.post} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Post);
