import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./NewComment.css";

let CommentForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="comment"
        className="form-control form-control-sm border-0 commentInput"
        component="input"
        type="text"
        placeholder="Add a comment..."
        autoComplete="off"
      />

      <button
        className="btn btn-primary btn-sm btn-block mt-2 d-block d-sm-none"
        disabled={pristine || submitting}
      >
        Post
      </button>
    </form>
  );
};

CommentForm = reduxForm({ destroyOnUnmount: true })(CommentForm);

class NewComment extends Component {
  handleSubmit = data => {
    if (Object.keys(data).length !== 0 && this.props.singlePost) {
      this.props.addComment(data, this.props.postId, true);
    } else if (Object.keys(data).length !== 0) {
      this.props.addComment(data, this.props.postId, false);
    }
  };

  render() {
    return (
      <CommentForm form={`${this.props.postId}`} onSubmit={this.handleSubmit} />
    );
  }
}

export default connect(
  null,
  actions
)(NewComment);
