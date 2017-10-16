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
              <text>
                <font color="SeaGreen"> {effect.description}</font>
                <br />
              </text>
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
              <text>
                <font color="SeaGreen"> {effect.description}</font>
                <br />
              </text>
            )}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { item } = this.props;
    return (
      <Popup
        trigger={this.renderItem()}
        flowing
        position="left center"
        basic
        offset={-500}
        hoverable
      >
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={12}>
              <h1>
                <font size={4} color={item.etheral ? "MediumSeaGreen" : "White"}>
                  {item.name}
                </font>
                <br />
                <font size={3}>Niveau {item.level}</font>
              </h1>
              {this.isAWeapon() && (
                <div>
                  <text>
                    <font size={2}>
                      Coût <b>52 PA</b>
                      <br />
                      Portée <b>OUI</b>
                      <br />
                      Critique <b>YY% (+MAX dommages)</b>
                      <br />
                      <b>X</b> utilisations par tour
                    </font>
                  </text>
                </div>
              )}
            </Grid.Column>
            <Grid.Column width={4}>
              <Image centered fluid src={`/img/${item.iconId}.png`} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {this.isAWeapon() && (
                <div>
                  <text>
                    <font size={3}>
                      <b>Dommages</b>
                      <br />
                      {this.getWeaponDmgLines()}
                    </font>
                  </text>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {item.possibleEffects.length !== 0 && (
                <div>
                  <text>
                    <font size={3}>
                      <b>Effets</b>
                      <br />
                      {this.getItemEffects()}
                    </font>
                  </text>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div>
                <text>
                  <font size={2}>
                    Catégorie <b>{item.type.name}</b>
                    <br />
                    Poids <b>99999 pods</b>
                    <br />
                    Prix moyen: <b>123 456 798 K</b>
                  </font>
                </text>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
