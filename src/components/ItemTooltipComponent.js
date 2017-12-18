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

  displayBaseEffect(base) {
    let str = " ( " + base.min;
    if (base.max > base.min) {
      str += " à " + base.max;
    }
    str += " )";
    return <span color={"Gainsboro"}>{str}</span>;
  }

  getItemEffects(isBase) {
    const { effects, baseEffects } = this.props;
    const sorted = _.keyBy(baseEffects, effect => effect.effectId);
    return (
      <div>
        {effects.map((effect, i) => {
          const base = sorted[effect.effectId];
          return (
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
                  {base && !isBase && this.displayBaseEffect(base)}
                  <br />
                </div>
              )}
            </div>
          );
        })}
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
  renderItemEffects(isBase) {
    return (
      <div>
        <font size={3}>
          <b>Effets</b>
          <br />
          {this.getItemEffects(isBase)}
        </font>
      </div>
    );
  }

  renderPrices() {
    const { avgPrices } = this.props;
    return (
      <div>
        Prix:
        {avgPrices.length === 0 ? (
          <b> Indisponible</b>
        ) : (
          <List bulleted>
            {avgPrices.map((avgPrice, key) => (
              <List.Item key={key}>
                {avgPrice.server.name} :
                <b>
                  {" "}
                  {avgPrice.averagePrice === -1
                    ? " Indisponible"
                    : avgPrice.averagePrice.toLocaleString("fr-FR") + " K"}
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
      <div style={{ wordBreak: "break-word", maxWidth: "300px" }}>
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
    const isBase = effects === this.props.baseEffects;
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
                {effects.length !== 0 && this.renderItemEffects(isBase)}
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
