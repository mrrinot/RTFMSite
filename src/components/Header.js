import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Icon } from "semantic-ui-react";
import { logoutAttempt } from "../actions/creators/auth";
import { Link } from "react-router-dom";
import { Menu, Label, Sidebar, Segment, Container } from "semantic-ui-react";

class Header extends Component {
  guest = comp => (this.props.isAuthenticated ? null : comp);
  auth = comp => (this.props.isAuthenticated ? comp : null);
  adminLevel = (lvl, comp) =>
    this.props.isAuthenticated && this.props.userInfos.adminLevel >= lvl ? comp : null;

  stuff = pathname => (
    <Sidebar as={Menu} direction="top" visible={true}>
      <Menu.Menu>
        {this.guest(
          <Menu.Item as={Link} active={pathname === "/login"} to="/login">
            Connexion
          </Menu.Item>,
        )}
        {this.auth(
          <Menu.Item as={Link} active={pathname === "/"} to="/">
            Accueil
          </Menu.Item>,
        )}

        {this.adminLevel(
          1,
          <Menu.Item as={Link} active={pathname === "/items"} to="/items">
            Objets
          </Menu.Item>,
        )}

        {this.adminLevel(
          1,
          <Menu.Item
            as={Link}
            active={pathname === "/leaderboard/recipes"}
            to="/leaderboard/recipes"
          >
            Leaderboard: Recettes
          </Menu.Item>,
        )}
        {this.adminLevel(
          2,
          <Menu.Item as={Link} active={pathname === "/createAPIKey"} to="/createAPIKey">
            Token API
          </Menu.Item>,
        )}

        {this.adminLevel(
          3,
          <Menu.Item as={Link} active={pathname === "/invite"} to="/invite">
            Créer une invitation
          </Menu.Item>,
        )}
      </Menu.Menu>
      <Menu.Menu position="right">
        {this.auth(
          <Menu.Item onClick={this.props.onLogout}>
            {this.props.userInfos.pseudo}
            <Label color="red">
              <Icon name="power" />Déconnexion
            </Label>
          </Menu.Item>,
        )}
      </Menu.Menu>
    </Sidebar>
  );

  render() {
    const { pathname } = this.props.location;
    return (
      <Container>
        {this.stuff(pathname)}
        <br />
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
    isAuthenticated: !!state.auth.userInfos.email,
    userInfos: state.auth.userInfos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
