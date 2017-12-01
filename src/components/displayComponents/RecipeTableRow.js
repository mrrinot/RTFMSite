import React from "react";
import PropTypes from "prop-types";
import { Table, Image, Icon } from "semantic-ui-react";
import history from "../../history";
import ItemTooltipComponent from "../ItemTooltipComponent";

const tooltipRender = item => {
  return (
    <Table.Cell>
      <Image
        centered
        onClick={e => {
          history.push(`/itemStat/${item.id}`);
        }}
        src={`/img/${item.iconId}.png`}
      />
    </Table.Cell>
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
  const avgUn = recipe.averagePrice === -1;
  return (
    <Table.Row key={keyId}>
      <Table.Cell textAlign="center">{recipe.item.name}</Table.Cell>
      <ItemTooltipComponent
        item={recipe.item}
        effects={recipe.item.possibleEffects}
        baseEffects={recipe.item.possibleEffects}
        avgPrices={recipe.avgPrices}
        key={keyId}
        toRender={e => tooltipRender(recipe.item)}
        position="right center"
      />
      <Table.Cell textAlign="center" singleLine={true}>
        Actual:
        <br />
        Average:
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {bold(formatText(recipe.lowestActualPrice))}
        <br />
        {avgUn ? "Indisponible" : formatText(recipe.averagePrice)}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {bold(formatText(recipe.totalIngredientsActualPrice))}
        <br />
        {avgUn ? "Indisponible" : formatText(recipe.totalIngredientsAveragePrice)}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {bold(colorText(recipe.actualCostDifference))}
        <br />
        {avgUn ? "Indisponible" : colorText(recipe.averageCostDifference)}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine={true}>
        {bold(colorText(parseInt(recipe.actualCostDifferencePercentage, 10), " %"))}
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
