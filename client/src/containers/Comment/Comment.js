import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

const mapStateToProps = state => {
  return {
    registerMsg: state.auth.registerMsg
  };
};

let CommentForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="comment"
        component={renderField}
        type="text"
        label="Add a comment..."
      />

      {/* <button className="btn btn-primary btn-sm btn-block mt-3">Sign up</button> */}
    </form>
  );
};

const validate = val => {
  const errors = {};

  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <input
      className="form-control form-control-sm border-0"
      {...input}
      placeholder={label}
      type={type}
      autoComplete="off"
    />
    {touched &&
      ((error && <small className="text-danger">{error}</small>) ||
        (warning && <small className="text-danger">{warning}</small>))}
  </div>
);

CommentForm = reduxForm({
  validate
})(CommentForm);

class Comment extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.postId !== prevProps.postId) {
  //     this.props.comment(data, this.props.postId);
  //   }
  // }

  handleSubmit = data => {
    if (Object.keys(data).length !== 0) {
      this.props.comment(data, this.props.postId);
    }
  };

  render() {
    return (
      <CommentForm form={`${this.props.postId}`} onSubmit={this.handleSubmit} />
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(Comment);
