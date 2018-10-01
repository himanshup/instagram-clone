import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import "./Register.css";

const mapStateToProps = state => {
  return {
    registerMsg: state.auth.registerError,
    imgPreview: state.common.preview,
    imagePreviewError: state.common.imagePreviewError
  };
};

const renderDropzoneField = ({ input, name, meta: { dirty, error } }) => {
  return (
    <div>
      <Dropzone
        name={name}
        className="drop mt-1 rounded"
        accept="image/jpeg, image/jpg, image/png"
        onDrop={filesToUpload => input.onChange(filesToUpload)}
      >
        <div className="d-flex justify-content-center h-100">
          <div className="text-center align-self-center">
            <div>
              <Icon.Plus className="text-muted camera" />
            </div>
            <span className="text-muted avatarText">Profile Picture</span>
          </div>
        </div>
      </Dropzone>
      {dirty && (error && <small className="error">{error}</small>)}
    </div>
  );
};

let RegisterForm = props => {
  const { handleSubmit, onValues, submitting, pristine, errorMsg } = props;
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Field
        name="username"
        component={renderField}
        type="text"
        label="Username"
      />

      <Field
        name="password"
        component={renderField}
        type="password"
        label="Password"
      />

      <Field name="image" component={renderDropzoneField} onChange={onValues} />
      {errorMsg && <small className="error">{errorMsg}</small>}
      <button
        className="btn btn-primary btn-sm btn-block mt-3"
        disabled={pristine || submitting}
      >
        Sign up
      </button>
    </form>
  );
};

const validate = val => {
  const errors = {};
  if (!val.username) {
    errors.username = "Required";
  }
  if (!val.password) {
    errors.password = "Required";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    {/* <label className="field">{label}</label> */}
    <input
      className="form-control form-control-sm mt-1 inputBg"
      {...input}
      placeholder={label}
      type={type}
    />
    {touched &&
      ((error && <small className="error">{error}</small>) ||
        (warning && <small className="error">{warning}</small>))}
  </div>
);

RegisterForm = reduxForm({
  form: "signUp",
  destroyOnUnmount: true,
  validate
})(RegisterForm);

class Register extends Component {
  handleSubmit = data => {
    this.props.registerUser(data);
  };

  onValues = images => {
    this.props.getPreview(images);
  };

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center component">
          <div className="card p-5 infoCards rounded-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png"
              alt=""
              className="mx-auto"
              width="150"
            />
            {this.props.imgPreview && (
              <div className="text-center mt-4">
                <img
                  src={this.props.imgPreview}
                  className="imgPreview"
                  alt=""
                  width="100%"
                />
              </div>
            )}
            <RegisterForm
              onSubmit={this.handleSubmit}
              onValues={this.onValues}
              preview={this.props.imgPreview}
              errorMsg={this.props.imagePreviewError}
            />
            <div className="text-center mt-3">
              <small className="error">
                {this.props.registerMsg && this.props.registerMsg}
              </small>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center mt-2">
          <div className="card text-center infoCards rounded-0">
            <div className="card-body">
              Have an account? <Link to="/">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(Register);
