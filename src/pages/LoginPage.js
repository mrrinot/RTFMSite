import React, { Component } from "react";
import LoginForm from "../forms/LoginForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAttempt } from "../actions/creators/login";

class LoginPage extends Component {
  onSubmit = credentials => {
    this.props.onSubmit(credentials);
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: credentials => {
      dispatch(loginAttempt(credentials));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.login.errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
