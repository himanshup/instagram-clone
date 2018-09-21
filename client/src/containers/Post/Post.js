import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DisplayPost from "../../components/DisplayPost/DisplayPost";

const mapStateToProps = state => {
  return {
    post: state.post.post
  };
};

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.postId !== prevProps.match.params.postId) {
      this.props.getPost(this.props.match.params.postId);
    }
  }
  render() {
    return <DisplayPost post={this.props.post && this.props.post} />;
  }
}

export default connect(
  mapStateToProps,
  actions
)(Post);
