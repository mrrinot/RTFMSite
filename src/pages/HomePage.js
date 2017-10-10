import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HomePage extends Component {
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
            <Button color="red">
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
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: !!state.login.JWT,
  };
};

export default connect(mapStateToProps)(HomePage);
