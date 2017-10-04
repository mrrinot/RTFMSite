import React, { Component } from "react";
import SearchComponent from "./SearchComponent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItems } from "../actions/creators";

class ItemPage extends Component {
  onResult = input => {
    this.props.onResult(input);
  };
  render() {
    return (
      <div>
        <h1>Items page</h1>
        <SearchComponent onResult={this.onResult} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onResult: input => {
      dispatch(fetchItems(input));
    },
  };
};

ItemPage.propTypes = {
  onResult: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
