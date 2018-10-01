import React, { Component } from "react";
import DisplayPosts from "../../components/DisplayPosts/DisplayPosts";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    posts: state.post.posts
  };
};

class Feed extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    return <DisplayPosts posts={this.props.posts} />;
  }
}

export default connect(
  mapStateToProps,
  actions
)(Feed);
