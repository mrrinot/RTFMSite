import React, { Component } from "react";
import HighCharts from "highcharts";
import ReactHighstock from "react-highcharts/ReactHighstock.src";
import { Image, Grid, Message, Icon, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItemStat } from "../actions/creators/items";
import HDVArchiveComponent from "../components/HDVArchiveComponent";
import moment from "moment";
import _ from "lodash";

class ItemStatPage extends Component {
  state = { timestampSelected: -1 };
  config = {
    chart: { type: "line", zoomType: "xy" },
    title: { text: "PLACEHOLDER" },
    subtitle: {
      text: "Click and drag in the plot area to zoom in",
    },
    legend: {
      enabled: true,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      valueSuffix: " K/u",
      valueDecimals: 2,
    },
    navigator: { adaptToUpdatedData: false },
    xAxis: { type: "datetime" },
    yAxis: { title: { text: "Prix en Kamas" } },
    plotOptions: {
      series: {
        showInNavigator: true,
        findNearestPointBy: "xy",
        cropThreshold: 5000,
        connectNulls: true,
        point: {
          events: {
            click: e => {
              this.pointClicked(e);
            },
          },
        },
      },
    },
    series: [
      {
        name: "x1",
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      },
    ],
  };

  pointClicked = e => {
    const pointStamp = moment.parseZone(e.point.key + " +02:00", "dddd, MMM DD, HH:mm:ss.SSS Z");
    const selected = _.findIndex(this.props.prices, price => {
      return new Date(price.timestamp) - pointStamp._d > 0;
    });
    this.setState({ timestampSelected: selected });
  };

  componentDidMount() {
    this.props.onMount(this.props.match.params.itemId, this.onItemReceived);
  }

  calculateAvgForPrice = (data, price, col, pow) => {
    let val = 0;
    _.each(price.itemDescriptions, desc => (val += parseInt(desc.prices[col], 10) / pow));
    val = val / price.itemDescriptions.length;
    data.push([price.timestamp, val > 0 ? val : null]);
  };

  onItemReceived = () => {
    const one = { name: "x1", data: [] };
    const ten = { name: "x10", data: [] };
    const hundred = { name: "x100", data: [] };
    const avg = { name: "Prix moyen", data: [] };
    _.each(this.props.prices, price => {
      this.calculateAvgForPrice(one.data, price, 0, 1);
      this.calculateAvgForPrice(ten.data, price, 1, 10);
      this.calculateAvgForPrice(hundred.data, price, 2, 100);
      avg.data.push([price.timestamp, price.averagePrice > 0 ? price.averagePrice : null]);
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
        <Loader active={this.props.loading}>Loading</Loader>
        <div>
          <Grid divided padded>
            <Grid.Row>
              <Grid.Column floated="left" width={3}>
                <h1>{item.name}</h1>
              </Grid.Column>
              <Grid.Column width={5}>
                <Image centered src={`/img/${item.iconId}.png`} />
                <Link to="/items">Items list</Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.config.title.text !== "PLACEHOLDER" && (
            <div>
              <ReactHighstock config={this.config} />
              <br />
              <HDVArchiveComponent item={item} selected={this.state.timestampSelected} />
            </div>
          )}
        </div>
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
    id: PropTypes.number,
    name: PropTypes.string,
    iconId: PropTypes.number,
  }).isRequired,
  onMount: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
  prices: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatPage);
