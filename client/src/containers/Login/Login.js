import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Login.css";

const mapStateToProps = state => {
  return {
    loginError: state.auth.loginError,
    registerSuccess: state.auth.registerSuccess
  };
};

let SignInForm = props => {
  const { handleSubmit, submitting, pristine } = props;
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

      <button
        className="btn btn-primary btn-sm btn-block mt-3"
        disabled={pristine || submitting}
      >
        Log In
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
      ((error && <small className="text-danger">{error}</small>) ||
        (warning && <small className="text-danger">{warning}</small>))}
  </div>
);

SignInForm = reduxForm({
  form: "signIn",
  validate
})(SignInForm);

class Login extends Component {
  componentWillUnmount() {
    this.props.resetInput();
  }

  handleSubmit = data => {
    this.props.loginUser(data);
  };

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center mt-5">
          <div className="card p-5 infoCards rounded-0">
            <h1 className="insta text-center">Instagram</h1>
            <SignInForm onSubmit={this.handleSubmit} />
            {this.props.loginError && (
              <small className="text-danger text-center mt-3">
                {this.props.loginError}
              </small>
            )}
            {this.props.registerSuccess && (
              <small className="text-success text-center mt-3">
                {this.props.registerSuccess}
              </small>
            )}
          </div>
        </div>
        <div className="container d-flex justify-content-center mt-2">
          <div className="card text-center infoCards rounded-0">
            <div className="card-body">
              Don't have an account? <Link to="/register">Sign up</Link>
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
)(Login);
