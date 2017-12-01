import React, { Component } from "react";
import SearchItemsComponent from "../components/SearchItemsComponent";
import RecipeList from "../components/RecipeList";
import { Message, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItemsTypes } from "../actions/creators/items";
import { fetchRecipes } from "../actions/creators/recipes";

class LeaderboardRecipePage extends Component {
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
          <h1>Recipe Leaderboard page</h1>
          <SearchItemsComponent onResult={this.onResult} loading={this.props.loading} />
          {this.props.recipes.length > 0 && <RecipeList recipes={this.props.recipes} />}
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
    recipes: state.recipes.recipes || [],
    loading: state.recipes.loading,
    errors: state.recipes.errors,
    itemsTypes: state.metaData.itemsTypes,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onResult: input => {
      dispatch(fetchRecipes(input));
    },
    getItemsMetaData: () => {
      dispatch(fetchItemsTypes());
    },
  };
};

LeaderboardRecipePage.propTypes = {
  recipes: PropTypes.array.isRequired,
  onResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getItemsMetaData: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }),
  itemsTypes: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardRecipePage);
