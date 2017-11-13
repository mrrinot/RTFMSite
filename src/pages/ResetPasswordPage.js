import React, { Component } from "react";
import PropTypes from "prop-types";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import decode from "jwt-decode";
import { connect } from "react-redux";
import { resetPasswordAttempt } from "../actions/creators/auth";

class ResetPasswordPage extends Component {
  onSubmit = data => {
    this.props.onSubmit(data);
  };
  render() {
    const payload = decode(this.props.match.params.token);
    return (
      <div>
        <h1>Reset your password</h1>
        <ResetPasswordForm
          onSubmit={this.onSubmit}
          resetPasswordToken={this.props.match.params.token}
          email={payload.email}
        />
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: passwordInfos => {
      dispatch(resetPasswordAttempt(passwordInfos));
    },
  };
};

export default connect(null, mapDispatchToProps)(ResetPasswordPage);
