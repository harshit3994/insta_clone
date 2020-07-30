import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/post";
import * as Icon from "react-feather";
import "./NewPost.css";

const mapStateToProps = state => {
  return {
    imgPreview: state.common.preview,
    imagePreviewError: state.common.imagePreviewError,
    submitted: state.common.submitted,
    submitLoading: state.common.submitLoading
  };
};

// const validateImage = imageList => {
//   if (imageList) {
//     if (imageList.length > 1) {
//       return "Only 1 image allowed";
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

let PostForm = props => {
  const { handleSubmit, onValues, preview, errorMsg } = props;
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {errorMsg && <small className="error">{errorMsg}</small>}
      <Field name="image" component={renderDropzoneField} onChange={onValues} />
      <Field
        name="caption"
        component={renderField}
        type="text"
        label="Write a caption..."
      />
      {preview ? (
        <button className="btn btn-primary btn-sm btn-block mt-3">Post</button>
      ) : (
        <button className="btn btn-primary btn-sm btn-block mt-3" disabled>
          Post
        </button>
      )}
    </form>
  );
};

const renderField = ({ input, label, type }) => (
  <textarea
    className="form-control form-control-sm mt-1 inputBg"
    {...input}
    placeholder={label}
    type={type}
  />
);

PostForm = reduxForm({
  form: "createPost",
  destroyOnUnmount: true
})(PostForm);

class NewPost extends Component {
  handleSubmit = data => {
    this.props.submitNewPost();
    this.props.createPost(data);
  };

  onValues = images => {
    this.props.getPreview(images);
  };

  componentWillUnmount() {
    this.props.resetValue();
  }

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center component">
          {this.props.submitLoading ? (
            <Loader />
          ) : (
            <div
              className={`card p-2 postCard rounded-0 ${this.props.submitted &&
                `d-none`}`}
            >
              <div className="card-body">
                <h1 className="text-center">New Post</h1>
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
                <PostForm
                  onSubmit={this.handleSubmit}
                  onValues={this.onValues}
                  preview={this.props.imgPreview}
                  errorMsg={this.props.imagePreviewError}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(NewPost);
