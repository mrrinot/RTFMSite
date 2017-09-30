import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { loginAttempt } from "./actions/creators";
import PropTypes from "prop-types";

class App extends Component {
  onClick = () => {
    this.props.loginAttempt();
  };

  render() {
    const { isLoggedIn, loading } = this.props;
    return (
      <div className="App">
        <h1>Click the button : {"" + isLoggedIn}</h1>
        <Button loading={loading} onClick={this.onClick} disabled={loading} primary>
          Click me
        </Button>
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loginAttempt: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.login.isLoggedIn || false,
    loading: state.login.loading,
  };
};

export default connect(mapStateToProps, { loginAttempt })(App);
