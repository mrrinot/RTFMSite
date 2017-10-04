import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

class SearchComponent extends Component {
  lastInputChangeRequest = null;

  onInputChanged = (e, data) => {
    clearTimeout(this.lastInputChangeRequest);
    this.lastInputChangeRequest = setTimeout(() => {
      console.log(data);
      this.props.onResult(data.value);
    }, 500);
  };

  render() {
    return <Input placeholder="Search Here" onChange={this.onInputChanged} />;
  }
}

SearchComponent.propTypes = {
  onResult: PropTypes.func.isRequired,
};

export default SearchComponent;
