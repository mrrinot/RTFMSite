import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Grid, Popup, Button, Segment } from "semantic-ui-react";

class ItemComponent extends Component {
  renderItem() {
    const { item } = this.props;
    return (
      <div>
        <h3>
          <font color={item.etheral ? "MediumSeaGreen" : "Black"}>{item.name}</font>
        </h3>
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={7}>
              <Image src={`/img/${item.iconId}.png`} />
            </Grid.Column>
            <Grid.Column width={1}>
              <Button className="ui button">Inspecter</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
  render() {
    const { item } = this.props;
    return (
      <Popup trigger={this.renderItem()} wide position="right center">
        <Popup.Header>
          <h1>
            <font color={item.etheral ? "MediumSeaGreen" : "Black"}>{item.name}</font>
          </h1>
        </Popup.Header>
        <Popup.Content>
          <Segment.Group vertical compact>
            <Segment compact attached="top">
              <Segment.Group horizontal compact>
                <Segment>
                  <Image src={`/img/${item.iconId}.png`} />
                </Segment>
                <Segment>
                  <b>Type:</b> {item.type.name}
                </Segment>
                <Segment>
                  <b>Niveau:</b> {item.level}
                </Segment>
              </Segment.Group>
            </Segment>
            <Segment compact>
              <b>Description:</b> {item.description}
            </Segment>
          </Segment.Group>
        </Popup.Content>
      </Popup>
    );
  }
}

ItemComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    iconId: PropTypes.number.isRequired,
    type: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  key: PropTypes.number.isRequired,
};

export default ItemComponent;
