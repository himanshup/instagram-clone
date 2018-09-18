import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import ReactDropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "./actions";
import axios from "axios";

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

class Register extends Component {
  onDrop = files => {
    console.log(files[0]);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("filename", files[0].name);

    axios
      .post("/api/post", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleSignIn = values => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <ReactDropzone onDrop={this.onDrop} multiple accept="image/*">
          Drop your best gator GIFs here!!
        </ReactDropzone>
        <SignInForm onSubmit={this.handleSignIn} />
      </div>
    );
  }
}
export default connect(
  null,
  actions
)(Register);
