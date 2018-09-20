import React, { Component } from "react";
import Posts from "../../components/Posts/Posts";
import { connect } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";

const mapStateToProps = state => {
  return {
    posts: state.post.posts
  };
};

class Feed extends Component {
  componentDidMount() {
    this.props.getFeed();
  }
  render() {
    return <Posts posts={_.values(this.props.posts)} />;
  }
}

export default connect(
  mapStateToProps,
  actions
)(Feed);
