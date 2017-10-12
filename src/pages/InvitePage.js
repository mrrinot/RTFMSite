import React, { Component } from "react";
import InviteForm from "../forms/InviteForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendInviteAttempt } from "../actions/creators/invite";

class InvitePage extends Component {
  onSubmit = inviteInfos => {
    this.props.onSubmit(inviteInfos);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Create an invite</h1>
        <InviteForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

InvitePage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: credentials => {
      dispatch(sendInviteAttempt(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(InvitePage);
