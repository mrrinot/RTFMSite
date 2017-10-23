import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

class SearchComponent extends Component {
  state = {
    conditions: [],
  };
  lastInputChangeRequest = null;

  onInputChanged = (e, data) => {
    clearTimeout(this.lastInputChangeRequest);
    this.lastInputChangeRequest = setTimeout(() => {
      this.props.onResult(data.value);
    }, 500);
  };

  render() {
    return (
      <Input
        placeholder="Search Here"
        onChange={this.onInputChanged}
        loading={this.props.loading}
      />
    );
  }
}

SearchComponent.propTypes = {
  onResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchComponent;
