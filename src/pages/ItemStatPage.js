import React, { Component } from "react";
import HighCharts from "highcharts";
import ReactHighstock from "react-highcharts/ReactHighstock.src";
import { Image, Grid, Message, Icon, Loader, Input, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItemStat, fetchAdditionalItemStat } from "../actions/creators/items";
import HDVArchiveComponent from "../components/HDVArchiveComponent";
import _ from "lodash";

class ItemStatPage extends Component {
  state = { timestampSelected: -1, chartSizeValue: 100 };
  extraButtons = [
    {
      type: "week",
      count: 1,
      text: "Week",
    },
    { type: "week", count: 4, text: "Month" },
    { type: "month", count: 12, text: "Year" },
  ];
  config = {
    chart: { type: "line", zoomType: "xy", height: 9 / 16 * this.state.chartSizeValue + "%" },
    title: { text: "PLACEHOLDER" },
    subtitle: {
      text: "Click and drag in the plot area to zoom in",
    },
    rangeSelector: {
      allButtonsEnabled: true,
      buttonTheme: {
        width: 100,
      },
      buttons: [],
      selected: 0,
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
    xAxis: {
      type: "datetime",
      events: {
        setExtremes: e => {
          this.buttonClicked(e);
        },
      },
    },
    yAxis: { title: { text: "Prix en Kamas" }, min: 0 },
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
    const selected = _.findIndex(this.props.prices, price => {
      return price.timestamp - e.point.x >= 0;
    });
    this.setState({ timestampSelected: selected });
  };

  buttonClicked = e => {
    if (e.rangeSelectorButton) {
      // console.log("selected button :", e.rangeSelectorButton);
      const first = _.first(this.props.prices).timestamp;
      const last = _.last(this.props.prices).timestamp;
      const range = e.rangeSelectorButton._range;
      const upTo = last - range;
      if (range && upTo < first) {
        this.props.onAdditionalLoad(
          this.props.match.params.itemId,
          range,
          first,
          last,
          this.onItemReceived,
        );
      }
    }
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
    this.config.rangeSelector.buttons = [
      { type: "all", text: "All" },
      { type: "hour", count: 24, text: "24H" },
    ];
    if (this.props.dates.length > 2) {
      this.config.rangeSelector.buttons.push(this.extraButtons[0]);
    }
    if (this.props.dates.length > 7) {
      this.config.rangeSelector.buttons.push(this.extraButtons[1]);
    }
    if (this.props.dates.length > 30) {
      this.config.rangeSelector.buttons.push(this.extraButtons[2]);
    }
    this.config.series = [one, ten, hundred, avg];
    this.config.title.text = `Prix de l'objet: ${this.props.item.name}`;
    this.setState({ chartSizeValue: 100 });
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
                {!this.props.loading && <Image centered src={`/img/${item.iconId}.png`} />}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Label pointing="right">{"Chart's height"}</Label>
              <Input
                type="range"
                value={this.state.chartSizeValue}
                min={50}
                max={150}
                onChange={(e, data) => {
                  this.setState({ chartSizeValue: data.value });
                  this.config.chart.height = 9 / 16 * data.value + "%";
                }}
              />
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
    loading: state.itemStat.loading,
    errors: state.itemStat.errors,
    prices: state.itemStat.prices,
    dates: state.itemStat.dates,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: (itemId, onItemReceived) => {
      dispatch(fetchItemStat(itemId, onItemReceived));
    },
    onAdditionalLoad: (itemId, range, first, last, onItemReceived) => {
      dispatch(fetchAdditionalItemStat(itemId, range, first, last, onItemReceived));
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
  onAdditionalLoad: PropTypes.func.isRequired,
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
  dates: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatPage);
