import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LayoutRoute from "./LayoutRoute";

class UserRoute extends Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <LayoutRoute
        {...rest}
        render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
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
    isAuthenticated: !!state.auth.userInfos.email,
  };
};

export default connect(mapStateToProps)(UserRoute);
