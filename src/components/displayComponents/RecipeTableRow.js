import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

const RecipeTableRow = ({ recipe, key }) => {
  return (
    <Table.Row>
      <Table.Cell textAlign="center">{recipe.item.name}</Table.Cell>
    </Table.Row>
  );
};

RecipeTableRow.propTypes = {
  recipe: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired,
};

export default RecipeTableRow;
