import React, { Component } from "react";
import LoginForm from "../components/forms/LoginForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAttempt } from "../actions/creators";

class LoginPage extends Component {
  onSubmit = credentials => {
    this.props.onSubmit(credentials);
    this.props.history.push("/");
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: credentials => {
      dispatch(loginAttempt(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
