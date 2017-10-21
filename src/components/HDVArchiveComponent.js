import React, { Component } from "react";
import { Image, Grid, Popup, Button, Segment, Message, Icon, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import ItemTooltipComponent from "./ItemTooltipComponent";

class HDVArchiveComponent extends Component {
  state = { selected: -1 };
  getTimestampOptions = () => {
    const opt = [];
    _.forEach(this.props.prices, (price, key) => {
      const text = `${new Date(price.timestamp)} => ${price.itemDescriptions.length} items`;
      opt.push({ text, value: key });
    });
    return opt;
  };

  toRender = desc => {
    const { item } = this.props;
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src={`/img/${item.iconId}.png`} />
        </Grid.Column>
        <Grid.Column width={4}>{desc.prices[0]}</Grid.Column>
        <Grid.Column width={4}>{desc.prices[1]}</Grid.Column>
        <Grid.Column width={4}>{desc.prices[2]}</Grid.Column>
      </Grid.Row>
    );
  };

  processEffects = (theoricalEffects, descEffects) => {
    let effects = [];
    console.log(descEffects);
    _.each(theoricalEffects, effect => {
      const newEff = effect;
      newEff.description = _.find(descEffects, { actionId: effect.effectId }).description;
      console.log(newEff);
      effects.push(newEff);
    });
    return effects;
  };

  renderHDV() {
    const priceArchive = this.props.prices[this.props.selected];
    const { item } = this.props;
    return (
      <Grid streched celled>
        <Grid.Row>
          <Grid.Column width={4}>{item.name}</Grid.Column>
          <Grid.Column width={4}>x1</Grid.Column>
          <Grid.Column width={4}>x10</Grid.Column>
          <Grid.Column width={4}>x100</Grid.Column>
        </Grid.Row>
        {_.orderBy(priceArchive.itemDescriptions, ["prices"], ["asc"]).map((desc, key) => (
          <ItemTooltipComponent
            item={item}
            effects={this.processEffects(item.possibleEffects, desc.effects)}
            avgPrices={[priceArchive]}
            key={key}
            toRender={e => this.toRender(desc)}
          />
        ))}
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <Dropdown
          placeholder="Select a timestamp"
          fluid
          selection
          options={this.getTimestampOptions()}
          onChange={(e, data) => (this.props.selected = data.value)}
        />
        <br />
        {this.props.selected !== -1 && this.renderHDV()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading.isLoading,
    errors: state.itemStat.errors,
    prices: state.itemStat.prices,
  };
};

HDVArchiveComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    iconId: PropTypes.number.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
  prices: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, [])(HDVArchiveComponent);
