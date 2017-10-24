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

  componentWillReceiveProps(newProps) {
    this.setState({ selected: newProps.selected || this.props.selected });
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
    const { item } = this.props;
    return (
      <Grid streched celled>
        <Grid.Row>
          <Grid.Column width={4}>{item.name}</Grid.Column>
          <Grid.Column width={4}>x1</Grid.Column>
          <Grid.Column width={4}>x10</Grid.Column>
          <Grid.Column width={4}>x100</Grid.Column>
        </Grid.Row>
        {_.sortBy(priceArchive.itemDescriptions, [
          desc => {
            return parseInt(desc.prices[0], 10);
          },
          desc => {
            return parseInt(desc.prices[1], 10);
          },
          desc => {
            return parseInt(desc.prices[2], 10);
          },
        ]).map((desc, key) => (
          <Grid.Row key={key}>
            <ItemTooltipComponent
              item={item}
              effects={desc.effects}
              baseEffects={item.possibleEffects}
              avgPrices={[priceArchive]}
              key={key}
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
    console.log(this.state.selected);
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
          onChange={(e, data) => this.setState({ selected: data.value })}
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
