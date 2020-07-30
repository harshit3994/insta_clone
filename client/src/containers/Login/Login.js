import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
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
      ((error && <small className="error">{error}</small>) ||
        (warning && <small className="error">{warning}</small>))}
  </div>
);

SignInForm = reduxForm({
  form: "signIn",
  validate
})(SignInForm);

class Login extends Component {
  componentWillUnmount() {
    this.props.resetValue();
  }

  handleSubmit = data => {
    this.props.loginUser(data);
  };

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center component">
          <div className="card p-5 infoCards rounded-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png"
              alt=""
              className="mx-auto"
              width="150"
            />
            <SignInForm onSubmit={this.handleSubmit} />
            {/* <button className="btn btn-primary btn-sm btn-block mt-1">
              Demo Login
            </button> */}
            {this.props.loginError && (
              <small className="error text-center mt-3">
                {this.props.loginError}
              </small>
            )}
            {this.props.registerSuccess && (
              <small className="success text-center mt-3">
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
