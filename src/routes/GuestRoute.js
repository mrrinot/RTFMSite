import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LayoutRoute from "./LayoutRoute";
import { LinkContainer } from "react-router-bootstrap";

class GuestRoute extends Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <LayoutRoute
        {...rest}
        render={props =>
          !isAuthenticated ? (
            <Component {...props} />
          ) : (
            <LinkContainer to="/">
              <Redirect to="/" />
            </LinkContainer>
          )}
      />
    );
  }
}

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: !!state.auth.userInfos.email,
  };
};

export default connect(mapStateToProps)(GuestRoute);
