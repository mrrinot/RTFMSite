import React from "react";
import PropTypes from "prop-types";
import { Image, Table } from "semantic-ui-react";

const ItemList = props => {
  return (
    <Table celled>
      <Table.Body>
        {props.items.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Image src={`/img/${item.iconId}.png`} />
            </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
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
