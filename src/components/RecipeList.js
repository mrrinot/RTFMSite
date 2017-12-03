import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Table, Button, Loader } from "semantic-ui-react";
import history from "../history";
import ItemTooltipComponent from "./ItemTooltipComponent";
import RecipeTableRow from "./displayComponents/RecipeTableRow";
import _ from "lodash";

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.recipes, column: null, direction: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipes) {
      this.setState({ data: nextProps.recipes, column: null, direction: null });
    }
  }

  handleSort = (clickedColumn, cb) => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [cb]),
        direction: "ascending",
      });
      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  render() {
    const { column, data, direction } = this.state;
    if (this.props.loading) return <Loader content="Loading" active />;
    return (
      <Table sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "Name" ? direction : null}
              onClick={this.handleSort("Name", recipe => recipe.item.name)}
              colSpan="3"
            >
              Object
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "Price" ? direction : null}
              onClick={this.handleSort("Price", recipe => parseInt(recipe.lowestActualPrice, 10))}
            >
              Price
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "Total" ? direction : null}
              onClick={this.handleSort("Total", recipe =>
                parseInt(recipe.totalIngredientsActualPrice, 10),
              )}
            >
              Total Ingredients Price
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "CostDiff" ? direction : null}
              onClick={this.handleSort("CostDiff", recipe =>
                parseInt(recipe.actualCostDifference, 10),
              )}
            >
              Cost Difference
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "CostDiffPer" ? direction : null}
              onClick={this.handleSort("CostDiffPer", recipe =>
                parseInt(recipe.actualCostDifferencePercentage, 10),
              )}
            >
              Cost Difference %
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "NoUnknown" ? direction : null}
              onClick={this.handleSort("NoUnknown", recipe => recipe.containsActualUnknown)}
            >
              No Unknown Prices
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((recipe, i) => <RecipeTableRow recipe={recipe} key={i} keyId={i} />)}
        </Table.Body>
      </Table>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      item: PropTypes.object.isRequired,
    }).isRequired,
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
export default RecipeList;
