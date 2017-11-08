import React, { Component } from "react";
import SearchComponent from "../components/SearchComponent";
import ItemList from "../components/ItemList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItems, fetchItemsTypes } from "../actions/creators/items";

class ItemsPage extends Component {
  componentDidMount() {
    this.props.getItemsMetaData();
  }
  onResult = input => {
    this.props.onResult(input);
  };
  render() {
    return (
      <div>
        <h1>Items page</h1>
        <SearchComponent onResult={this.onResult} loading={this.props.loading} />
        {this.props.items.length > 0 && <ItemList items={this.props.items} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items || [],
    loading: state.loading.isLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onResult: input => {
      dispatch(fetchItems(input));
    },
    getItemsMetaData: () => {
      dispatch(fetchItemsTypes());
    },
  };
};

ItemsPage.propTypes = {
  items: PropTypes.array.isRequired,
  onResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getItemsMetaData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
