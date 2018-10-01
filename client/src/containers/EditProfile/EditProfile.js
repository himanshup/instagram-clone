import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./EditProfile.css";

const mapStateToProps = state => {
  return {
    imgPreview: state.common.preview,
    avatar: state.user.user && state.user.user.avatar,
    username: state.user.user.username,
    imagePreviewError: state.common.imagePreviewError
  };
};

// const validateImage = imageList => {
//   if (imageList) {
//     if (imageList.length > 1) {
//       return "You can upload one image at a time";
//     } else if (imageList.length === 1) {
//       let selectedImage = imageList[0];
//       if (!selectedImage.type.match("image.*")) {
//         return "Only image files are allowed";
//       } else if (selectedImage.size > 1048576) {
//         return "Maximum file size exceeded";
//       }
//     }
//   }
// };

const renderDropzoneField = ({ input, name }) => {
  return (
    <Dropzone
      name={name}
      className="upload text-primary"
      accept="image/jpeg, image/jpg, image/png"
      onDrop={filesToUpload => input.onChange(filesToUpload)}
    >
      Change Profile Picture
    </Dropzone>
  );
};

let EditProfileForm = props => {
  const {
    handleSubmit,
    onValues,
    pristine,
    submitting,
    errorMsg,
    info,
    preview
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-4 col-md-2">
          {preview ? (
            <img
              src={preview}
              className="mr-3 rounded-circle align-self-center"
              alt=""
              width="65"
              height="65"
            />
          ) : (
            <img
              src={info.avatar}
              className="mr-3 rounded-circle align-self-center"
              alt=""
              width="65"
              height="65"
            />
          )}
        </div>
        <div className="col-8 col-md-10">
          <h5>{info.username}</h5>
          <Field
            name="avatar"
            component={renderDropzoneField}
            onChange={onValues}
          />
          {errorMsg && <small className="text-danger">{errorMsg}</small>}
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <Field
            name="name"
            className="form-control form-control-sm"
            component="input"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Username</label>
        <div className="col-sm-10">
          <Field
            name="username"
            className="form-control form-control-sm"
            component="input"
            disabled
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Bio</label>
        <div className="col-sm-10">
          <Field
            name="bio"
            className="form-control form-control-sm"
            component="textarea"
          />
        </div>
      </div>
      {errorMsg ? (
        <button className="btn btn-primary btn-sm btn-block mt-3" disabled>
          Post
        </button>
      ) : (
        <button
          className="btn btn-primary btn-sm btn-block mt-3"
          disabled={pristine || submitting}
        >
          Submit
        </button>
      )}
    </form>
  );
};

EditProfileForm = reduxForm({
  form: "editProfile",
  enableReinitialize: true
})(EditProfileForm);

EditProfileForm = connect(state => ({
  initialValues: {
    username: state.user.user.username,
    avatar: state.user.user.avatar,
    name: state.user.user.name,
    bio: state.user.user.bio
  }
}))(EditProfileForm);

class EditProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userId);
  }
  handleSubmit = data => {
    this.props.editProfile(data, this.props.match.params.userId);
  };

  onValues = images => {
    this.props.getPreview(images);
  };

  componentWillUnmount() {
    this.props.resetValue();
  }

  render() {
    return (
      <div className="container d-flex justify-content-center component">
        <div className="card p-2 editProfileCard rounded-0">
          <div className="card-body">
            <EditProfileForm
              onSubmit={this.handleSubmit}
              onValues={this.onValues}
              preview={this.props.imgPreview}
              errorMsg={this.props.imagePreviewError}
              info={{
                username: this.props.username,
                avatar: this.props.avatar
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(EditProfile);
