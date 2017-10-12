import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import { logoutAttempt } from "../actions/creators/login";
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
        {!this.props.userInfos.token ? (
          <Link to="/login">Login</Link>
        ) : (
          <div>
            <Link to="/items">ItemsPage</Link>
            <p />
            {this.props.userInfos.adminLevel === 3 && (
              <div>
                <Link to="/invite">Create an invite</Link>
                <p />
              </div>
            )}
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
  userInfos: PropTypes.shape({
    token: PropTypes.string,
    email: PropTypes.string,
    adminLevel: PropTypes.number,
    pseudo: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    userInfos: state.login.userInfos,
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
