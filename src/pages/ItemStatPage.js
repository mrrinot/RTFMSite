import React, { Component } from "react";
import SearchComponent from "../components/SearchComponent";
import ItemList from "../components/ItemList";
import HighCharts from "highcharts";
import ReactHighcharts from "react-highcharts";
import { Image, Grid, Popup, Button, Segment, Message, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItemStat } from "../actions/creators/items";
import _ from "lodash";

class ItemStatPage extends Component {
  config = {
    chart: { polar: true, zoomType: "x" },
    title: { text: "PLACEHOLDER" },
    subtitle: {
      text: "Click and drag in the plot area to zoom in",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    xAxis: { type: "datetime" },
    yAxis: { title: { text: "Prix en Kamas" } },
    series: [
      {
        name: "x1",
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      },
    ],
  };

  componentDidMount() {
    this.props.onMount(this.props.match.params.itemId, this.onItemReceived);
  }

  onItemReceived = () => {
    const one = { name: "x1", data: [] };
    const ten = { name: "x10", data: [] };
    const hundred = { name: "x100", data: [] };
    const avg = { name: "Prix moyen", data: [] };
    _.each(this.props.prices, price => {
      if (price.itemDescriptions.length > 1) {
        return false;
      }
      one.data.push([price.timestamp, price.itemDescriptions[0].prices[0]]);
      ten.data.push([price.timestamp, price.itemDescriptions[0].prices[1]]);
      hundred.data.push([price.timestamp, price.itemDescriptions[0].prices[2]]);
      avg.data.push([price.timestamp, price.averagePrice !== -1 ? price.averagePrice : null]);
    });
    this.config.series = [one, ten, hundred, avg];
    this.config.title.text = `Prix de l'objet: ${this.props.item.name}`;
  };

  render() {
    const { item } = this.props;
    return (
      <div>
        {this.props.errors.global && (
          <Message negative icon>
            <Icon name="warning sign" />
            <p>
              <Message.Header>Something went wrong: </Message.Header>
              <Message.Content>{this.props.errors.global}</Message.Content>
            </p>
          </Message>
        )}
        {!this.props.loading && (
          <div>
            <Grid stretched>
              <Grid.Row>
                <Grid.Column>
                  <h1>{item.name}</h1>
                </Grid.Column>
                <Grid.Column>
                  <Image src={`/img/${item.iconId}.png`} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <ReactHighcharts config={this.config} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.itemStat.item || {},
    loading: state.loading.isLoading,
    errors: state.itemStat.errors,
    prices: state.itemStat.prices,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: (itemId, onItemReceived) => {
      dispatch(fetchItemStat(itemId, onItemReceived));
    },
  };
};

ItemStatPage.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    iconId: PropTypes.number.isRequired,
  }).isRequired,
  onMount: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
  prices: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatPage);
