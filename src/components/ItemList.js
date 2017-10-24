import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Grid, Button } from "semantic-ui-react";
import history from "../history";
import { loading } from "../actions/creators/loading";
import ItemTooltipComponent from "./ItemTooltipComponent";
import { connect } from "react-redux";

class ItemList extends Component {
  onClick = itemId => {
    this.props.onLoad();
    history.push(`/itemStat/${itemId}`);
  };

  toRender = item => {
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
              <Button onClick={e => this.onClick(item.id)} className="ui button">
                Inspecter
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };

  render() {
    return (
      <Grid columns={5} celled>
        {this.props.items.map((item, key) => (
          <Grid.Column key={key / 5}>
            <ItemTooltipComponent
              position="bottom center"
              item={item}
              hoverable
              effects={item.possibleEffects}
              baseEffects={item.possibleEffects}
              avgPrices={item.avgPrices}
              key={key}
              toRender={this.toRender}
            />
          </Grid.Column>
        ))}
      </Grid>
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
  onLoad: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      dispatch(loading(true));
    },
  };
};
export default connect(null, mapDispatchToProps)(ItemList);
