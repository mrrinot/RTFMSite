import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Table, Button } from "semantic-ui-react";
import history from "../history";
import ItemTooltipComponent from "./ItemTooltipComponent";
import RecipeTableRow from "./displayComponents/RecipeTableRow";

class RecipeList extends Component {
  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Object</Table.HeaderCell>
            <Table.HeaderCell>Average Price</Table.HeaderCell>
            <Table.HeaderCell>Total Ingredients Average Price</Table.HeaderCell>
            <Table.HeaderCell>Average Price Difference</Table.HeaderCell>
            <Table.HeaderCell>Average Price Difference Percentage</Table.HeaderCell>
            <Table.HeaderCell>Contains Average Unknown Prices</Table.HeaderCell>
            <Table.HeaderCell>Lowest Actual Price</Table.HeaderCell>
            <Table.HeaderCell>Total Ingredients Actual Price</Table.HeaderCell>
            <Table.HeaderCell>Actual Price Difference</Table.HeaderCell>
            <Table.HeaderCell>Actual Price Difference Percentage</Table.HeaderCell>
            <Table.HeaderCell>Contains Actual Unknown Prices</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.recipes.map((recipe, key) => <RecipeTableRow recipe={recipe} key={key} />)}
        </Table.Body>
      </Table>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      iconId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onLoad: PropTypes.func.isRequired,
};
export default RecipeList;
