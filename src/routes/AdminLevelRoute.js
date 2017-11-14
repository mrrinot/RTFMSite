import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LayoutRoute from "./LayoutRoute";
import { LinkContainer } from "react-router-bootstrap";

class AdminLevelRoute extends Component {
  render() {
    const {
      component: Component,
      requiredLevel,
      userInfos: { adminLevel },
      isAuthenticated,
      ...rest
    } = this.props;
    return (
      <LayoutRoute
        {...rest}
        render={props =>
          isAuthenticated && adminLevel >= requiredLevel ? (
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

AdminLevelRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userInfos: PropTypes.shape({
    adminLevel: PropTypes.number.isRequired,
  }).isRequired,
  requiredLevel: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: !!state.auth.userInfos.email,
    userInfos: state.auth.userInfos,
  };
};

export default connect(mapStateToProps)(AdminLevelRoute);
