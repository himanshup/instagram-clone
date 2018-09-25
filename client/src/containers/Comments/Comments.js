import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Comments.css";

class Comments extends Component {
  handleDelete = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    return (
      <div>
        {this.props.comments &&
          this.props.comments.map(comment => (
            <div key={comment._id}>
              <Link to={`/users/${comment.author.id}`} className="feedLinks">
                {comment.author.username}
              </Link>{" "}
              {comment.text}{" "}
              {comment.author.id ===
                JSON.parse(localStorage.getItem("Auth")).id && (
                <span>
                  {" "}
                  <Link to="/" className="float-right feedLinks">
                    <Icon.Trash2
                      size={14}
                      className="feedIcons"
                      onClick={() =>
                        this.handleDelete(this.props.postId, comment._id)
                      }
                    />
                  </Link>
                  <Link
                    to={`/edit/posts/${this.props.postId}/comments/${
                      comment._id
                    }`}
                    className="float-right feedLinks"
                  >
                    <Icon.Edit2 size={14} className="feedIcons mr-2" />
                  </Link>
                </span>
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Comments);
