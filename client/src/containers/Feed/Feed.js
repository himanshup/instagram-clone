import React, { Component } from "react";
import DisplayPosts from "../../components/DisplayPosts/DisplayPosts";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
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
    if (this.props.posts && this.props.posts.length === 0) {
      return (
        <div className="container">
          <div className="text-center component">
            <h4>You don't follow anyone.</h4>
            <p className="lead">
              Check out the{" "}
              <Link to="/explore" className="instaLinks text-primary">
                Explore
              </Link>{" "}
              page for users to follow.
            </p>
          </div>
        </div>
      );
    }
    return <DisplayPosts posts={this.props.posts} />;
  }
}

export default connect(
  mapStateToProps,
  actions
)(Feed);
