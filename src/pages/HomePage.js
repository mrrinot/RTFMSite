import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import { logoutAttempt } from "../actions/creators";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HomePage extends Component {
  onLogout = () => {
    this.props.onLogout();
  };
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {!this.props.isAuthenticated ? (
          <Link to="/login">Login</Link>
        ) : (
          <div>
            <Link to="/items">ItemsPage</Link>
            <p />
            <Button color="red" onClick={this.onLogout}>
              <Icon name="power" />Logout
            </Button>
          </div>
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: !!state.login.JWT,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: () => {
      dispatch(logoutAttempt());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
