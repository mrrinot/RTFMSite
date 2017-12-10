import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Card, Button, List } from "semantic-ui-react";
import history from "../history";
import ItemTooltipComponent from "./ItemTooltipComponent";
import { Link } from "react-router-dom";
class ItemList extends Component {
  renderPrices(avgPrices) {
    return (
      <div>
        Prix moyen:
        {avgPrices.length === 0 ? (
          <b> Indisponible</b>
        ) : (
          <List bulleted>
            {avgPrices.map((avgPrice, key) => (
              <List.Item key={key}>
                {avgPrice.server.name} :
                <b>
                  {" "}
                  {avgPrice.averagePrice === -1 ? " Indisponible" : avgPrice.averagePrice + " K"}
                </b>
              </List.Item>
            ))}
          </List>
        )}
      </div>
    );
  }

  toRender = item => {
    return (
      <Card as={Link} to={`/itemStat/${item.id}`}>
        <Image centered bordered size="tiny" src={`/img/${item.iconId}.png`} />
        <Card.Content>
          <Card.Header style={{ fontColor: item.etheral ? "MediumSeaGreen" : "White" }}>
            {item.name}
          </Card.Header>
          <Card.Meta>{item.type.name}</Card.Meta>
          <Card.Description>{this.renderPrices(item.avgPrices)}</Card.Description>
        </Card.Content>
      </Card>
    );
  };

  render() {
    return (
      <Card.Group itemsPerRow="4">
        {this.props.items.map((item, key) => (
          <ItemTooltipComponent
            key={item.id}
            position="bottom center"
            item={item}
            hoverable
            effects={item.possibleEffects}
            baseEffects={item.possibleEffects}
            avgPrices={item.avgPrices}
            toRender={this.toRender}
          />
        ))}
      </Card.Group>
    );
  }
}

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
