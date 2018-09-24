import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as Icon from "react-feather";

const mapStateToProps = state => {
  return {
    imgPreview: state.post.preview,
    image: state.post.post && state.post.post.image,
    error: state.post.editError
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

const renderDropzoneField = ({ input, name, id, meta: { dirty, error } }) => {
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
            <span className="text-muted avatarText">Upload Image</span>
          </div>
        </div>
      </Dropzone>
      {dirty && (error && <small className="text-danger">{error}</small>)}
    </div>
  );
};

let EditPostForm = props => {
  const { handleSubmit, onValues, pristine, submitting, errorMsg } = props;
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {errorMsg && (
        <div className="text-center mt-1">
          <small className="text-danger">{errorMsg}</small>
        </div>
      )}
      <Field name="image" component={renderDropzoneField} onChange={onValues} />
      <Field
        name="caption"
        className="form-control form-control-sm mt-1 inputBg"
        component="textarea"
      />
      <button
        className="btn btn-primary btn-sm btn-block mt-3"
        disabled={pristine || submitting}
      >
        Post
      </button>
    </form>
  );
};

EditPostForm = reduxForm({
  form: "editPost",
  enableReinitialize: true
})(EditPostForm);

EditPostForm = connect(state => ({
  initialValues: {
    caption: state.post.post && state.post.post.description,
    image: state.post.post && state.post.post.image
  }
}))(EditPostForm);

class Edit extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
  }
  handleSubmit = data => {
    this.props.editPost(data, this.props.match.params.postId);
  };

  onValues = image => {
    this.props.getPreview(image[0].preview);
  };

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center mt-5">
          <div className="card p-2 postCard rounded-0">
            <div className="card-body">
              <h1 className="insta text-center">Instagram</h1>
              {this.props.imgPreview ? (
                <div className="text-center mt-4">
                  <img
                    src={this.props.imgPreview}
                    className="imgPreview"
                    alt=""
                    width="100%"
                  />
                </div>
              ) : (
                <div className="text-center mt-4">
                  <img
                    src={this.props.image}
                    className="imgPreview"
                    alt=""
                    width="100%"
                  />
                </div>
              )}
              <EditPostForm
                onSubmit={this.handleSubmit}
                onValues={this.onValues}
                preview={this.props.imgPreview}
                errorMsg={this.props.editError}
              />
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
)(Edit);
