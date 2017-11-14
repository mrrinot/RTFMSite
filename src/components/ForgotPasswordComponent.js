import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";
import ResetPasswordRequestForm from "../forms/ResetPasswordRequestForm";

class ForgotPasswordComponent extends Component {
  render() {
    return (
      <div>
        <Modal trigger={this.props.toRender()}>
          <Modal.Header>Reset your password</Modal.Header>
          <Modal.Content>
            <ResetPasswordRequestForm onSubmit={this.props.onSubmit} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

ForgotPasswordComponent.propTypes = {
  toRender: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ForgotPasswordComponent;
