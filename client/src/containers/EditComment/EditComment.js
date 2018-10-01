import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions/comment";

const mapStateToProps = state => {
  return {
    commentError: state.post.commentError
  };
};

let EditCommentForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Field
        name="comment"
        className="form-control form-control-sm"
        component="textarea"
        rows="3"
        type="text"
        label="Add a comment..."
        autoComplete="off"
      />

      <button
        className="btn btn-primary btn-sm btn-block mt-3"
        disabled={pristine || submitting}
      >
        Edit
      </button>
    </form>
  );
};

EditCommentForm = reduxForm({
  enableReinitialize: true
})(EditCommentForm);

EditCommentForm = connect(state => ({
  initialValues: {
    comment: state.post.comment
  }
}))(EditCommentForm);

class EditComment extends Component {
  componentDidMount() {
    this.props.getComment(
      this.props.match.params.postId,
      this.props.match.params.commentId
    );
  }
  handleSubmit = data => {
    this.props.editComment(
      this.props.match.params.postId,
      this.props.match.params.commentId,
      data.comment
    );
  };

  render() {
    return (
      <div className="container d-flex justify-content-center component">
        {this.props.commentError ? (
          <h4>{this.props.commentError}</h4>
        ) : (
          <div className="card p-2 postCard rounded-0">
            <div className="card-body">
              <h1 className="text-center">Edit Comment</h1>

              <EditCommentForm
                form={`${this.props.match.params.commentId}`}
                onSubmit={this.handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(EditComment);
