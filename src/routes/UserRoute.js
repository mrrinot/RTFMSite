import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UserRoute extends Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    console.log(isAuthenticated);
    return (
      <Route
        {...rest}
        render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
      />
    );
  }
}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: !!state.login.userInfos.token,
  };
};

export default connect(mapStateToProps)(UserRoute);
