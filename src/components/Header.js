import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Menu, Container, Button, Icon } from "semantic-ui-react";
import { logoutAttempt } from "../actions/creators/login";

class Header extends Component {
  guest = comp => (this.props.isAuthenticated ? null : comp);
  auth = comp => (this.props.isAuthenticated ? comp : null);
  adminLevel = (lvl, comp) =>
    this.props.isAuthenticated && this.props.userInfos.adminLevel >= lvl ? comp : null;

  render() {
    const { pathname } = this.props.location;

    return (
      <Container>
        <Menu pointing size="large">
          {this.guest(
            <Menu.Item active={pathname === "/login"} href="/login">
              Connexion
            </Menu.Item>,
          )}

          {this.auth(
            <Menu.Item active={pathname === "/"} href="/">
              Accueil
            </Menu.Item>,
          )}

          {this.adminLevel(
            1,
            <Menu.Item active={pathname === "/items"} href="/items">
              Objets
            </Menu.Item>,
          )}

          {this.adminLevel(
            2,
            <Menu.Item active={pathname === "/createAPIKey"} href="/createAPIKey">
              Token API
            </Menu.Item>,
          )}

          {this.adminLevel(
            3,
            <Menu.Item active={pathname === "/invite"} href="/invite">
              Créer une invitation
            </Menu.Item>,
          )}

          <Menu.Item position="right">
            {this.auth(
              <Button color="red" onClick={this.props.onLogout}>
                <Icon name="power" />Déconnexion
              </Button>,
            )}
          </Menu.Item>
        </Menu>
      </Container>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userInfos: PropTypes.shape({
    token: PropTypes.string,
    email: PropTypes.string,
    adminLevel: PropTypes.number,
    pseudo: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: () => {
      dispatch(logoutAttempt());
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: !!state.login.userInfos.email,
    userInfos: state.login.userInfos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
