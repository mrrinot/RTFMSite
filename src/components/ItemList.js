import React from "react";
import PropTypes from "prop-types";
import { Image, Grid } from "semantic-ui-react";
import ItemComponent from "./ItemComponent";

const ItemList = props => {
  return (
    <Grid columns={5} celled>
      {props.items.map((item, key) => (
        <Grid.Column key={key / 5}>
          <ItemComponent item={item} key={key} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      iconId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ItemList;
