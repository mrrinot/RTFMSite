import React, { Component } from "react";
import LoginForm from "../forms/LoginForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAttempt, resetPasswordRequestAttempt } from "../actions/creators/auth";
import { Button } from "semantic-ui-react";
import ForgotPasswordComponent from "../components/ForgotPasswordComponent";

class LoginPage extends Component {
  onSubmit = credentials => {
    this.props.onSubmit(credentials);
  };

  onResetPassword = email => {
    this.props.onResetPassword(email);
  };

  toRender = () => {
    return (
      <div>
        <Button color="red">Forgot password ?</Button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.onSubmit} />
        <br />
        <ForgotPasswordComponent toRender={this.toRender} onSubmit={this.onResetPassword} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onResetPassword: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: credentials => {
      dispatch(loginAttempt(credentials));
    },
    onResetPassword: email => {
      dispatch(resetPasswordRequestAttempt(email));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.auth.errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
