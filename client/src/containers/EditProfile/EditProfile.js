import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as Icon from "react-feather";
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
    <React.Fragment>
      <form onSubmit={handleSubmit} className="">
        <div className="form-group row mb-3">
          <div className="col-2">
            {preview ? (
              <img
                src={preview}
                className="imgPreview mr-3 rounded-circle align-self-center "
                alt=""
                width="65"
                height="65"
              />
            ) : (
              <img
                src={info.avatar}
                className="imgPreview mr-3 rounded-circle align-self-center "
                alt=""
                width="65"
                height="65"
              />
            )}
          </div>
          <div className="col-10">
            <h5>{info.username}</h5>
            <Field
              name="avatar"
              component={renderDropzoneField}
              onChange={onValues}
            />
          </div>
        </div>
        {errorMsg && <small className="text-danger">{errorMsg}</small>}

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
          <lable className="col-sm-2 col-form-label">Username</lable>
          <div className="col-sm-10">
            <Field
              name="username"
              className="form-control form-control-sm"
              placeholder="Username"
              component="input"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Bio</label>
          <div className="col-sm-10">
            <Field
              name="bio"
              className="form-control form-control-sm"
              placeholder="Bio"
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
    </React.Fragment>
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
    console.log(data);
  };

  onValues = images => {
    this.props.getPreview(images);
  };

  componentWillUnmount() {
    this.props.resetValue();
  }

  render() {
    return (
      <div className="container d-flex justify-content-center mt-5">
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
