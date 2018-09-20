import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FaCamera } from "react-icons/fa";
import "./Register.css";

const mapStateToProps = state => {
  return {
    registerMsg: state.auth.registerMsg
  };
};

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
        className="drop mt-1 rounded"
        accept="image/*"
        onDrop={filesToUpload => input.onChange(filesToUpload)}
      >
        <div className="text-center">
          <div>
            <span className="text-muted avatarText">Profile Picture</span>
          </div>
          <FaCamera className="text-muted camera" />
        </div>
      </Dropzone>
      {dirty && (error && <small className="text-danger">{error}</small>)}
    </div>
  );
};

let RegisterForm = props => {
  const { handleSubmit } = props;
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

      <Field
        name="image"
        validate={validateImage}
        component={renderDropzoneField}
      />

      <button className="btn btn-primary btn-sm btn-block mt-3">Sign up</button>
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

RegisterForm = reduxForm({
  form: "signUp",
  validate
})(RegisterForm);

class Register extends Component {
  componentWillUnmount() {
    this.props.resetMsg();
  }

  handleSubmit = data => {
    console.log(data);
    this.props.registerUser(data);
  };

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center mt-5">
          <div className="card p-5 infoCards rounded-0">
            <h1 className="insta text-center">Instagram</h1>
            <RegisterForm onSubmit={this.handleSubmit} />
            <div className="text-center mt-3">
              <small className="text-danger">
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
