import React, { Component } from "react";
import Posts from "../../components/Posts/Posts";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    posts: state.post.posts
  };
};

class Feed extends Component {
  componentDidMount() {
    this.props.getFeed();
  }

  handleDeletePost = () => {};
  render() {
    return <Posts posts={this.props.posts} />;
  }
}

export default connect(
  mapStateToProps,
  actions
)(Feed);
