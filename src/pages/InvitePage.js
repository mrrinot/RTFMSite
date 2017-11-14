import React, { Component } from "react";
import InviteForm from "../forms/InviteForm";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { sendInviteAttempt } from "../actions/creators/invite";

class InvitePage extends Component {
  state = { timeout: false };
  onSubmit = inviteInfos => {
    this.props.onSubmit(inviteInfos);
  };

  componentWillReceiveProps(newProps) {
    if (newProps.infos.email) {
      this.setState({ timeout: true });
      setTimeout(() => {
        this.setState({ timeout: false });
      }, 2500);
    }
  }

  render() {
    return (
      <div>
        {this.props.infos.email &&
          this.state.timeout && (
            <Message color="green" icon="info">
              Your invite has been sent to {this.props.infos.email}
            </Message>
          )}
        <h1>Create an invite</h1>
        <InviteForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

InvitePage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  infos: PropTypes.shape({
    email: PropTypes.string,
  }),
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: credentials => {
      dispatch(sendInviteAttempt(credentials));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    infos: state.invite.inviteInfos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitePage);
