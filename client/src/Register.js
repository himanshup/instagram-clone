import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "./actions";

const validateImage = imageList => {
  if (imageList) {
    if (imageList.length > 1) {
      return "You can upload one image at a time";
    } else if (imageList.length === 1) {
      let selectedImage = imageList[0];
      if (!selectedImage.type.match("image.*")) {
        return "Only image files are allowed";
      } else if (selectedImage.size > 1048576) {
        return "Maximum file size exceeded";
      }
    }
  }
};

const renderDropzoneField = ({ input, name, id, meta: { dirty, error } }) => {
  return (
    <div>
      <Dropzone
        name={name}
        onDrop={filesToUpload => input.onChange(filesToUpload)}
      >
        upload profile picture
      </Dropzone>
      {dirty && (error && <span>{error}</span>)}
    </div>
  );
};

let RegisterForm = props => {
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
          <Field
            name="image"
            validate={validateImage}
            component={renderDropzoneField}
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

RegisterForm = reduxForm({
  form: "signIn",
  validate
})(RegisterForm);

class Register extends Component {
  handleSubmit = data => {
    console.log(data);
    this.props.registerUser(data);
  };

  render() {
    return (
      <div>
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default connect(
  null,
  actions
)(Register);
