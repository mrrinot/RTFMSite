import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Icon } from "semantic-ui-react";
import { Label, Nav, NavItem, Navbar } from "react-bootstrap";
import { logoutAttempt } from "../actions/creators/auth";
import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
  guest = comp => (this.props.isAuthenticated ? null : comp);
  auth = comp => (this.props.isAuthenticated ? comp : null);
  adminLevel = (lvl, comp) =>
    this.props.isAuthenticated && this.props.userInfos.adminLevel >= lvl ? comp : null;

  stuff = pathname => (
    <Navbar.Collapse>
      <Nav>
        {this.guest(
          <LinkContainer to="/login">
            <NavItem active={pathname === "/login"} href="/login">
              Connexion
            </NavItem>
          </LinkContainer>,
        )}
        {this.auth(
          <LinkContainer to="/">
            <NavItem active={pathname === "/"} href="/">
              Accueil
            </NavItem>
          </LinkContainer>,
        )}

        {this.adminLevel(
          1,
          <LinkContainer to="/items">
            <NavItem active={pathname === "/items"} href="/items">
              Objets
            </NavItem>
          </LinkContainer>,
        )}

        {this.adminLevel(
          2,
          <LinkContainer to="/createAPIKey">
            <NavItem active={pathname === "/createAPIKey"} href="/createAPIKey">
              Token API
            </NavItem>
          </LinkContainer>,
        )}

        {this.adminLevel(
          3,
          <LinkContainer to="/invite">
            <NavItem active={pathname === "/invite"} href="/invite">
              Créer une invitation
            </NavItem>
          </LinkContainer>,
        )}
      </Nav>
      <Nav pullRight>
        {this.auth(
          <NavItem onClick={this.props.onLogout}>
            <Label bsStyle="danger">
              <Icon name="power" />Déconnexion
            </Label>
          </NavItem>,
        )}
      </Nav>
    </Navbar.Collapse>
  );

  render() {
    const { pathname } = this.props.location;
    return (
      <Navbar fluid>
        <Navbar.Toggle />
        {this.stuff(pathname)}
      </Navbar>
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
    isAuthenticated: !!state.auth.userInfos.email,
    userInfos: state.auth.userInfos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
