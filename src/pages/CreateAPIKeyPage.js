import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Label, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createAPIKeyAttempt } from "../actions/creators/APIKey";

class CreateAPIKeyPage extends Component {
  onClick = () => {
    console.log("WHYYYYYY");
    this.props.onClick();
  };
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.errors.global && (
          <Message negative icon>
            <Icon name="warning sign" />
            <p>
              <Message.Header>Something went wrong: </Message.Header>
              <Message.Content>{this.props.errors.global}</Message.Content>
            </p>
          </Message>
        )}
        <Grid stretched>
          <Grid.Row>
            <Grid.Column width={3}>
              <Button loading={this.props.loading} onClick={this.onClick} primary>
                Create an API key
              </Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Label>Key : {this.props.APIKey}</Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Link to="/">Home page</Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

CreateAPIKeyPage.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
  APIKey: PropTypes.string,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(createAPIKeyAttempt());
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading.isLoading,
    errors: state.APIKey.errors,
    APIKey: state.APIKey.key,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAPIKeyPage);
