import React, { Component } from "react";
import DisplayPost from "../../components/DisplayPost/DisplayPost";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    post: state.post.post
  };
};

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
  }

  render() {
    return <DisplayPost post={this.props.post} />;
  }
}

export default connect(
  mapStateToProps,
  actions
)(Post);
