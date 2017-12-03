import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Grid, Popup, List } from "semantic-ui-react";
import _ from "lodash";

class ItemTooltipComponent extends Component {
  isAddedEffect = effect => {
    return _.find(this.props.baseEffects, { effectId: effect.effectId }) === undefined;
  };

  isAWeapon() {
    const { item } = this.props;
    return item.apCost !== -1;
  }

  getWeaponDmgLines() {
    const { effects } = this.props;
    return (
      <div>
        {effects.map((effect, i) => (
          <div key={i}>
            {effect.effect.useInFight && (
              <div>
                <font color="SeaGreen"> {effect.description}</font>
                <br />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  getItemEffects() {
    const { effects } = this.props;
    return (
      <div>
        {effects.map((effect, i) => (
          <div key={i}>
            {!effect.effect.useInFight && (
              <div>
                <font
                  color={
                    effect.effect.bonusType === -1
                      ? "FireBrick"
                      : this.isAddedEffect(effect) ? "SteelBlue" : "SeaGreen"
                  }
                >
                  {effect.description}
                </font>
                <br />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  renderWeaponSecondaryStats() {
    const { item } = this.props;
    return (
      <div>
        <font size={2}>
          Coût <b>{item.apCost} PA</b>
          <br />
          Portée <b>{item.minRange !== 1 ? `${item.minRange} à ${item.range}` : item.range}</b>
          <br />
          {"Critique "}
          <b>
            {item.criticalHitProbability}% (+{item.criticalHitBonus} dommages)
          </b>
          <br />
          <b>{item.maxCastPerTurn}</b> utilisations par tour
        </font>
      </div>
    );
  }

  renderWeaponDmgLines() {
    return (
      <div>
        <font size={3}>
          <b>Dommages</b>
          <br />
          {this.getWeaponDmgLines()}
        </font>
      </div>
    );
  }
  renderItemEffects() {
    return (
      <div>
        <font size={3}>
          <b>Effets</b>
          <br />
          {this.getItemEffects()}
        </font>
      </div>
    );
  }

  renderPrices() {
    const { avgPrices } = this.props;
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

  renderItemSecondaryStats() {
    const { item } = this.props;
    return (
      <div>
        <font size={2}>
          Catégorie <b>{item.type.name}</b>
          <br />
          Poids <b>{item.weight} pods</b>
          <br />
          {this.renderPrices()}
        </font>
      </div>
    );
  }

  renderDescription() {
    const style = {
      wordBreak: "break-word",
      maxWidth: "350px",
      paddingRight: "15px",
      paddingLeft: "15px",
    };
    const { item } = this.props;
    return (
      <div style={style}>
        <font size={2}>{item.description}</font>
      </div>
    );
  }

  renderCriteria() {
    const { item } = this.props;
    return (
      <div>
        <font size={3}>
          <b>Conditions</b>
          <br />
          <font color="DarkOrange">{item.criteria}</font>
        </font>
      </div>
    );
  }

  render() {
    const { item, effects } = this.props;
    return (
      <Popup
        trigger={this.props.toRender(item)}
        basic
        flowing
        hoverable={this.props.hoverable}
        position={this.props.position}
      >
        <Grid divided padded>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <div>
                <font size={4} as="h1" color={item.etheral ? "MediumSeaGreen" : "White"}>
                  <b>{item.name}</b>
                </font>
                <br />
                <font size={3}>
                  Niveau <b>{item.level}</b>
                </font>
                <p />
                {this.isAWeapon() && this.renderWeaponSecondaryStats()}
                <p />
                {this.isAWeapon() && this.renderWeaponDmgLines()}
                <p />
                {effects.length !== 0 && this.renderItemEffects()}
                <p />
                {item.criteria !== "" && this.renderCriteria()}
                <p />
                {this.renderItemSecondaryStats()}
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image fluid centered src={`/img/${item.iconId}.png`} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderDescription()}
      </Popup>
    );
  }
}

ItemTooltipComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    iconId: PropTypes.number.isRequired,
    type: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  effects: PropTypes.array.isRequired,
  baseEffects: PropTypes.array.isRequired,
  toRender: PropTypes.func.isRequired,
  avgPrices: PropTypes.array.isRequired,
  hoverable: PropTypes.bool,
  position: PropTypes.string,
};

export default ItemTooltipComponent;
