import React, { Component } from "react";
import SearchComponent from "../components/SearchComponent";
import ItemList from "../components/ItemList";
import { Message, Icon } from "semantic-ui-react";
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
        {this.props.errors.global === undefined ? (
          <div>
            {" "}
            <h1>Items page</h1>
            <SearchComponent onResult={this.onResult} loading={this.props.loading} />
            {this.props.items.length > 0 && <ItemList items={this.props.items} />}
          </div>
        ) : (
          <Message negative icon>
            <Icon name="warning sign" />
            <p>
              <Message.Header>Something went wrong: </Message.Header>
              <Message.Content>{this.props.errors.global}</Message.Content>
            </p>
          </Message>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items || [],
    loading: state.loading.isLoading,
    errors: state.items.errors,
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
  errors: PropTypes.shape({
    global: PropTypes.string,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
