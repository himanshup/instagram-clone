import React, { Component } from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Icons extends Component {
  handleLike = () => {
    this.props.likePost(this.props.postId);
  };

  handleDislike = likeId => {
    this.props.dislikePost(this.props.postId, likeId);
  };

  renderHeart = () => {
    const user = JSON.parse(localStorage.getItem("Auth"));

    if (this.props.likes.length !== 0) {
      for (const like of this.props.likes) {
        if (like.author.id === user.id) {
          return (
            <span>
              <Icon.Heart
                className="mr-2 feedIcons"
                color="red"
                fill="red"
                onClick={() => this.handleDislike(like._id)}
              />
            </span>
          );
        }
      }
      for (const like of this.props.likes) {
        if (like.author.id !== user.id) {
          return (
            <span>
              <Icon.Heart
                className="mr-2 feedIcons"
                onClick={() => this.handleLike()}
              />
            </span>
          );
        }
      }
    } else if (this.props.likes.length === 0) {
      return (
        <span>
          <Icon.Heart
            className="mr-2 feedIcons"
            onClick={() => this.handleLike()}
          />
        </span>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderHeart()}
        <Icon.MessageCircle className="mr-2 feedIcons msgCircle" />
        {this.props.authorId === JSON.parse(localStorage.getItem("Auth")).id ? (
          <span>
            <Icon.Trash2 className="feedIcons float-right" />
            <Link to={`/edit/${this.props.postId}`}>
              <Icon.Edit2 className="feedIcons text-dark float-right mr-2" />
            </Link>
          </span>
        ) : (
          <Icon.Bookmark className="feedIcons float-right" />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Icons);
