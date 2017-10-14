import React, { Component } from "react";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import { connect } from "react-redux";

class InviteForm extends Component {
  state = {
    data: {
      email: "",
      adminLevel: 1,
    },
    errors: {},
  };

  onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.onSubmit({ ...this.state.data, userInfos: this.props.userInfos });
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field>
          <label htmlFor="adminLevel">Admin Level</label>
          <select name="adminLevel" value={data.password} onChange={this.onChange}>
            <option value="1">1 - Basic readonly user</option>
            <option value="2">2 - Bot API Access</option>
            <option value="3">3 - Maximum admin level</option>
          </select>
        </Form.Field>
        <Button primary>Send invite</Button>
      </Form>
    );
  }
}

InviteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
  userInfos: PropTypes.shape({
    email: PropTypes.string.isRequired,
    adminLevel: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.invite.loading,
    errors: state.invite.errors,
    userInfos: state.login.userInfos,
  };
};

export default connect(mapStateToProps, {})(InviteForm);
