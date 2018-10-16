import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/user";

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

class PostAuthor extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.userId);
  }

  render() {
    return (
      <div>
        <img
          src={this.props.user.avatar}
          alt=""
          className="rounded-circle mr-2"
          width="30px"
          height="30px"
        />
        <Link to={`/users/${this.props.user._id}`} className="feedLinks">
          {this.props.user.username}{" "}
        </Link>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(PostAuthor);
