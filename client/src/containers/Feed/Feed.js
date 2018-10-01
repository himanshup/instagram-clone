import React, { Component } from "react";
import { Link } from "react-router-dom";
import DisplayPosts from "../../components/DisplayPosts/DisplayPosts";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/post";

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.common.loading
  };
};

class Feed extends Component {
  componentDidMount() {
    this.props.getFeed();
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Loader />
        ) : (
          <div>
            {this.props.posts && this.props.posts.length === 0 ? (
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
            ) : (
              <DisplayPosts posts={this.props.posts} />
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
)(Feed);
