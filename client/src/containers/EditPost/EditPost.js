import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/post";
import * as Icon from "react-feather";

const mapStateToProps = state => {
  return {
    imgPreview: state.common.preview,
    image: state.post.post && state.post.post.image,
    imagePreviewError: state.common.imagePreviewError,
    submitLoading: state.common.submitLoading
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
  );
};

let EditPostForm = props => {
  const { handleSubmit, onValues, pristine, submitting, errorMsg } = props;
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {errorMsg && <small className="error">{errorMsg}</small>}
      <Field name="image" component={renderDropzoneField} onChange={onValues} />
      <Field
        name="caption"
        className="form-control form-control-sm mt-1 inputBg"
        component="textarea"
      />
      {errorMsg ? (
        <button className="btn btn-primary btn-sm btn-block mt-3" disabled>
          Post
        </button>
      ) : (
        <button
          className="btn btn-primary btn-sm btn-block mt-3"
          disabled={pristine || submitting}
        >
          Post
        </button>
      )}
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

class EditPost extends Component {
  componentDidMount() {
    this.props.getPostForEdit(this.props.match.params.postId);
  }
  handleSubmit = data => {
    this.props.submitNewPost();
    this.props.editPost(data, this.props.match.params.postId);
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
        {this.props.submitLoading ? (
          <Loader />
        ) : (
          <div className="card p-2 postCard rounded-0">
            <div className="card-body">
              <h1 className="text-center">Edit Post</h1>
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
                errorMsg={this.props.imagePreviewError}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(EditPost);
