import React, { Component } from "react";
import { Image, Grid, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import ItemTooltipComponent from "./ItemTooltipComponent";
import { fetchItemDataEffects } from "../actions/creators/items";

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

  loadEffects = () => {
    const { effects, prices } = this.props;
    const price = prices[this.state.selected];
    if (effects[price.id] === undefined) {
      const descIds = [];
      _.each(price.itemDescriptions, desc => {
        descIds.push(desc.id);
      });
      this.props.onLoadEffect({ id: price.id, timestamp: price.timestamp }, descIds);
    }
  };

  componentWillReceiveProps(newProps) {
    const selected = newProps.selected || this.props.selected;
    if (selected !== -1) {
      this.setState({ selected }, this.loadEffects);
    }
  }

  toRender = desc => {
    const { item } = this.props;
    return (
      <Grid.Column width={4}>
        <Image src={`/img/${item.iconId}.png`} />
      </Grid.Column>
    );
  };

  renderHDV() {
    const priceArchive = this.props.prices[this.state.selected];
    const { item, effects } = this.props;
    return (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={4}>{item.name}</Grid.Column>
          <Grid.Column width={4}>x1</Grid.Column>
          <Grid.Column width={4}>x10</Grid.Column>
          <Grid.Column width={4}>x100</Grid.Column>
        </Grid.Row>
        {effects[priceArchive.id] !== undefined &&
          _.sortBy(priceArchive.itemDescriptions, [
            desc => {
              return parseInt(desc.prices[0], 10);
            },
            desc => {
              return parseInt(desc.prices[1], 10);
            },
            desc => {
              return parseInt(desc.prices[2], 10);
            },
          ]).map((desc, i) => (
            <Grid.Row key={i}>
              <ItemTooltipComponent
                item={item}
                effects={effects[priceArchive.id][desc.id] || []}
                baseEffects={item.possibleEffects}
                avgPrices={[priceArchive]}
                key={i}
                toRender={e => this.toRender(desc)}
                position="right center"
              />
              <Grid.Column width={4}>{desc.prices[0]}</Grid.Column>
              <Grid.Column width={4}>{desc.prices[1]}</Grid.Column>
              <Grid.Column width={4}>{desc.prices[2]}</Grid.Column>
            </Grid.Row>
          ))}
      </Grid>
    );
  }

  displaySelectedTimeStamp() {
    let str = "";
    if (this.state.selected !== -1 && this.props.prices !== undefined) {
      str = `${new Date(this.props.prices[this.state.selected].timestamp)} => ${this.props.prices[
        this.state.selected
      ].itemDescriptions.length} items`;
    }
    return str;
  }

  render() {
    return (
      <div>
        <Dropdown
          placeholder="Select a timestamp"
          fluid
          selection
          options={this.getTimestampOptions()}
          onChange={(e, data) => this.setState({ selected: data.value }, this.loadEffects)}
          text={this.displaySelectedTimeStamp()}
        />
        <br />
        {this.state.selected !== -1 && this.renderHDV()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading.isLoading,
    errors: state.itemStat.errors,
    prices: state.itemStat.prices,
    effects: state.itemDescEffects.effects,
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
  onLoadEffect: PropTypes.func.isRequired,
  effects: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadEffect: (dataId, descId) => {
      dispatch(fetchItemDataEffects(dataId, descId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HDVArchiveComponent);
