import React, { Component } from "react";
import SearchComponent from "../components/SearchComponent";
import ItemList from "../components/ItemList";
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
        {this.props.items.length > 0 && <ItemList items={this.props.items} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items || [],
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
  items: PropTypes.array.isRequired,
  onResult: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
