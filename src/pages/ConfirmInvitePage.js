import React, { Component } from "react";
import PropTypes from "prop-types";
import ConfirmInviteForm from "../forms/ConfirmInviteForm";
import decode from "jwt-decode";
import { connect } from "react-redux";
import { sendInviteConfirmationAttempt } from "../actions/creators/invite";

class ConfirmInvitePage extends Component {
  onSubmit = data => {
    this.props.onSubmit(data);
  };
  render() {
    const payload = decode(this.props.match.params.token);
    return (
      <div>
        <h1>Create your account</h1>
        <ConfirmInviteForm
          onSubmit={this.onSubmit}
          invitationToken={this.props.match.params.token}
          email={payload.email}
        />
      </div>
    );
  }
}

ConfirmInvitePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: inviteConfirmationInfos => {
      dispatch(sendInviteConfirmationAttempt(inviteConfirmationInfos));
    },
  };
};

export default connect(null, mapDispatchToProps)(ConfirmInvitePage);
