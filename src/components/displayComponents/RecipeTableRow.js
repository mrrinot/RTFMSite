import React from "react";
import PropTypes from "prop-types";
import { Table, Image, Icon } from "semantic-ui-react";
import history from "../../history";
import ItemTooltipComponent from "../ItemTooltipComponent";
import { Link } from "react-router-dom";
const tooltipRender = item => {
  return (
    <div>
      <Image as={Link} to={`/itemStat/${item.id}`} centered src={`/img/${item.iconId}.png`} />
    </div>
  );
};

const formatBool = val => {
  return <Icon name={!val ? "checkmark" : "remove"} size="large" color={!val ? "green" : "red"} />;
};

const formatText = text => {
  return text.toLocaleString("fr-FR");
};

const colorText = (val, add = "") => {
  return (
    <span style={{ color: val > 0 ? "SeaGreen" : "FireBrick" }}>
      {formatText(val)}
      {add}
    </span>
  );
};

const bold = text => {
  return <span style={{ fontWeight: "bold" }}>{text}</span>;
};

const RecipeTableRow = ({ recipe, keyId }) => {
  const avgUn = recipe.containsAverageUnknown;
  const actUn = recipe.containsActualUnknown;
  return (
    <Table.Row key={keyId}>
      <Table.Cell textAlign="center">{recipe.item.name}</Table.Cell>
      <Table.Cell>
        <ItemTooltipComponent
          item={recipe.item}
          effects={recipe.item.possibleEffects}
          baseEffects={recipe.item.possibleEffects}
          avgPrices={recipe.avgPrices}
          key={keyId}
          toRender={tooltipRender}
          position="right center"
        />
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        Actual:
        <br />
        Average:
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {actUn ? "Indisponible" : bold(formatText(recipe.lowestActualPrice))}
        <br />
        {avgUn ? "Indisponible" : formatText(recipe.averagePrice)}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {actUn ? "Indisponible" : bold(formatText(recipe.totalIngredientsActualPrice))}
        <br />
        {avgUn ? "Indisponible" : formatText(recipe.totalIngredientsAveragePrice)}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {actUn ? "Indisponible" : bold(colorText(recipe.actualCostDifference))}
        <br />
        {avgUn ? "Indisponible" : colorText(recipe.averageCostDifference)}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {actUn
          ? "Indisponible"
          : bold(colorText(parseInt(recipe.actualCostDifferencePercentage, 10), " %"))}
        <br />
        {avgUn
          ? "Indisponible"
          : colorText(parseInt(recipe.averageCostDifferencePercentage, 10), " %")}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {formatBool(recipe.containsActualUnknown)}
        <br />
        {formatBool(recipe.containsAverageUnknown)}
      </Table.Cell>
    </Table.Row>
  );
};

RecipeTableRow.propTypes = {
  recipe: PropTypes.object.isRequired,
  keyId: PropTypes.number.isRequired,
};

export default RecipeTableRow;
