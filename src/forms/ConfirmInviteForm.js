import React, { Component } from "react";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import { connect } from "react-redux";

class ConfirmInviteForm extends Component {
  state = {
    data: {
      email: this.props.email,
      password: "",
      passwordConfirmation: "",
      pseudo: "",
    },
    errors: {},
  };

  onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.onSubmit({ ...this.state.data, invitationToken: this.props.invitationToken });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Cannot have empty password";
    if (data.password !== data.passwordConfirmation)
      errors.passwordConfirmation = "Must match password";
    if (!data.pseudo) errors.pseudo = "Pseudo cannot be blank";
    return errors;
  };

  render() {
    const { loading, errors, data } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={this.props.loading}>
        {this.props.errors.global && (
          <Message negative icon>
            <Icon name="warning sign" />
            <p>
              <Message.Header>Something went wrong: </Message.Header>
              <Message.Content>{this.props.errors.global}</Message.Content>
            </p>
          </Message>
        )}
        <Form.Field>
          <label htmlFor="email">Email: {this.props.email}</label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password Confirmation</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
        </Form.Field>
        <Form.Field>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={data.pseudo}
            onChange={this.onChange}
          />
          {errors.pseudo && <InlineError text={errors.pseudo} />}
        </Form.Field>
        <Button primary>Sign up</Button>
      </Form>
    );
  }
}

ConfirmInviteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
  invitationToken: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.invite.loading,
    errors: state.invite.errors,
  };
};

export default connect(mapStateToProps, {})(ConfirmInviteForm);
