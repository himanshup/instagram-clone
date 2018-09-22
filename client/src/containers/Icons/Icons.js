import React, { Component } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiEdit2,
  FiTrash2
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Icons extends Component {
  constructor(props) {
    super(props);
  }
  handleLikes = () => {
    this.props.likePost(this.props.postId);
  };
  render() {
    return (
      <div>
        <FiHeart
          className="mr-2 feedIcons"
          onClick={() => this.handleLikes()}
        />
        <FiMessageCircle className="mr-2 feedIcons msgCircle" />
        {this.props.authorId === JSON.parse(localStorage.getItem("Auth")).id ? (
          <span>
            <FiTrash2 className="feedIcons float-right" />
            <Link to={`/edit/${this.props.postId}`}>
              <FiEdit2 className="feedIcons text-dark float-right mr-2" />
            </Link>
          </span>
        ) : (
          <FiBookmark className="feedIcons float-right" />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Icons);
