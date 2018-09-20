import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "./actions";

let SignInForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <div className="control">
          <Field
            name="username"
            component={renderField}
            type="text"
            label="username"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <Field
            name="password"
            component={renderField}
            type="password"
            label="password"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
      </div>
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
    <div className="control">
      <label className="field">{label}</label>
      <input className="input" {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

SignInForm = reduxForm({
  form: "signIn",
  validate
})(SignInForm);

class Login extends Component {
  handleSubmit = data => {
    console.log(data);
    this.props.loginUser(data);
  };

  render() {
    return (
      <div>
        <h4>Login</h4>
        <SignInForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Login);
