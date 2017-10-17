import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Grid, Popup, Button, Segment } from "semantic-ui-react";
import _ from "lodash";

class ItemComponent extends Component {
  renderItem() {
    const { item } = this.props;
    return (
      <div>
        <h3>
          <font color={item.etheral ? "MediumSeaGreen" : "White"}>{item.name}</font>
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

  isEffectWeaponUse(effect) {
    if (
      effect.description.indexOf("dommages") !== -1 ||
      effect.description.indexOf("PV rendus") !== -1 ||
      effect.description.indexOf("vol") !== -1
    )
      return true;
    return false;
  }

  isAWeapon() {
    const { item } = this.props;
    if (item.possibleEffects.lenght === 0) return false;
    let isWeapon = false;
    item.possibleEffects.map(effect => {
      if (this.isEffectWeaponUse(effect)) isWeapon = true;
    });
    return isWeapon;
  }

  getWeaponDmgLines() {
    const { item } = this.props;
    return (
      <div>
        {item.possibleEffects.map((effect, key) => (
          <div key={key}>
            {this.isEffectWeaponUse(effect) && (
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
    const { item } = this.props;
    return (
      <div>
        {item.possibleEffects.map((effect, key) => (
          <div key={key}>
            {!this.isEffectWeaponUse(effect) && (
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

  renderWeaponSecondaryStats() {
    const { item } = this.props;
    return (
      <div>
        <font size={2}>
          Coût <b>52 PA</b>
          <br />
          Portée <b>OUI</b>
          <br />
          Critique <b>YY% (+MAX dommages)</b>
          <br />
          <b>X</b> utilisations par tour
        </font>
      </div>
    );
  }

  renderWeaponDmgLines() {
    const { item } = this.props;
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
    const { item } = this.props;
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

  renderItemSecondaryStats() {
    const { item } = this.props;
    return (
      <div>
        <font size={2}>
          Catégorie <b>{item.type.name}</b>
          <br />
          Poids <b>{item.weight} pods</b>
          <br />
          Prix moyen: <b>123 456 798 K</b>
        </font>
      </div>
    );
  }

  renderDescription() {
    const style = {
      wordBreak: "break-word",
      maxWidth: "500px",
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
    const { item } = this.props;
    return (
      <Popup trigger={this.renderItem()} position="bottom center" basic hoverable flowing>
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={13}>
              <div>
                <font size={4} as="h1" color={item.etheral ? "MediumSeaGreen" : "White"}>
                  {item.name}
                </font>
                <br />
                <font size={3}>Niveau {item.level}</font>
                <p />
                {this.isAWeapon() && this.renderWeaponSecondaryStats()}
                <p />
                {this.isAWeapon() && this.renderWeaponDmgLines()}
                <p />
                {item.possibleEffects.length !== 0 && this.renderItemEffects()}
                <p />
                {item.criteria !== "" && this.renderCriteria()}
                <p />
                {this.renderItemSecondaryStats()}
              </div>
            </Grid.Column>
            <Grid.Column width={3}>
              <Image centered height="75" width="75" src={`/img/${item.iconId}.png`} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderDescription()}
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
