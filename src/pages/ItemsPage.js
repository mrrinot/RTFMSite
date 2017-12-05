import React, { Component } from "react";
import SearchItemsComponent from "../components/SearchItemsComponent";
import ItemList from "../components/ItemList";
import { Message, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItems, fetchItemsTypes } from "../actions/creators/items";
import { Helmet } from "react-helmet";

class ItemsPage extends Component {
  componentDidMount() {
    if (this.props.itemsTypes.length === 0) {
      this.props.getItemsMetaData();
    }
  }
  onResult = input => {
    this.props.onResult(input);
  };
  render() {
    if (this.props.errors.global === undefined)
      return (
        <div>
          {" "}
          <Helmet>
            <title>Search item - RTFM</title>
          </Helmet>
          <h1>Items page</h1>
          <SearchItemsComponent
            onResult={this.onResult}
            loading={this.props.loading}
            location={this.props.location}
          />
          {this.props.items.length > 0 && <ItemList items={this.props.items} />}
        </div>
      );
    return (
      <Message negative icon>
        <Icon name="warning sign" />
        <p>
          <Message.Header>Something went wrong: </Message.Header>
          <Message.Content>{this.props.errors.global}</Message.Content>
        </p>
      </Message>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items || [],
    loading: state.items.loading,
    errors: state.items.errors,
    itemsTypes: state.metaData.itemsTypes,
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
  location: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  onResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getItemsMetaData: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }),
  itemsTypes: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
